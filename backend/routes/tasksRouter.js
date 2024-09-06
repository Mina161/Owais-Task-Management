var express = require('express');
var router = express.Router();
const { auth, firestore } = require("../config/firebase-admin");
const { isAuthenticated } = require("../auth/jwt-auth");
const { createDocument, getDocumentWithId, createDocumentWithId, updateDocument, deleteDocument } = require('../controllers/documentController');
const { generateFuzzyArray } = require('../controllers/fuzzyController');
const { getMediaURL, deleteMediaObject } = require('../controllers/storageController');
const { Filter } = require('firebase-admin/firestore');
const { createTaskSchema, getTasksSchema, updateTaskSchema, deleteTaskSchema } = require('../schemas/taskSchemas');

// Tasks CRUD
router.post("/", isAuthenticated, async (req, res) => {
    try {
        const { error, value } = createTaskSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const { title, description, dueDate, priority, attachments } = req.body

        const titleFuzzy = generateFuzzyArray(title);
        const descriptionFuzzy = generateFuzzyArray(description);

        await createDocument("tasks", {
            title,
            description,
            titleFuzzy,
            descriptionFuzzy,
            dueDate: new Date(dueDate),
            priority: priorityMap({priorityString: priority}),
            attachments,
            status: "New",
            user: req.userRef
        });
        return res.status(201).json({ message: `Task "${title}" Created` });
    } catch (err) {
        return res.status(400).json({ message: err.message })
    }
})

router.get("/", isAuthenticated, async (req, res) => {
    try {
        const { error, value } = getTasksSchema.validate(req.query);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const { searchTerm, status, priority, id } = req.query
        const data = [];
        let query = firestore.collection("tasks").where("user", "==", req.userRef);

        if (id) {
            const task = await getDocumentWithId("tasks", id);
            if(!task.exists){
                throw Error("Task not found")
            }
            const taskAttachments = await Promise.all(task.attachments.map(async (attachment) => {
                return await getMediaURL(attachment);
            }))
            return res.status(200).json({ task: projectTask({ task, taskAttachments }) });
        }

        if (searchTerm) {
            query = query.where(Filter.or(
                Filter.where("titleFuzzy", "array-contains", searchTerm.toLowerCase()),
                Filter.where("descriptionFuzzy", "array-contains", searchTerm.toLowerCase()),
            ))
        }

        if (status) {
            query = query.where("status", "==", status);
        }

        if (priority) {
            query = query.where("priority", "==", priorityMap({priorityString: priority}));
        }

        const querySnapshot = await query.orderBy("priority", "desc").get();

        querySnapshot.forEach(async (doc) => {
            const docData = doc.data()
            data.push(projectTask({ task: { id: doc.id, ...docData } }))
        })

        return res.status(200).json({ tasks: data });
    } catch (err) {
        return res.status(400).json({ message: err.message })
    }
})

router.put("/", isAuthenticated, async (req, res) => {
    try {
        const { error, value } = updateTaskSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const { id, title, description, status, priority, attachments } = req.body
        const task = await getDocumentWithId("tasks", id);
        
        if(!task.exists){
            throw Error("Task not found")
        }
        if(task.user.isEqual(req.userRef)){
            throw Error("Task unaccessible")
        }
        const deletedAttachments = task.attachments.filter((attachment) => !attachments.includes(attachment))
        await Promise.all(deletedAttachments.map(async (attachment) => { return await deleteMediaObject(attachment) }))

        await updateDocument("tasks", {
            user: task.user,
            createdAt: task.user.createdAt,
            ...(title ? { title, titleFuzzy: generateFuzzyArray(title) } : {}),
            ...(description ? { description, descriptionFuzzy: generateFuzzyArray(description) } : {}),
            ...(status ? { status } : {}),
            ...(priority ? { priority: priorityMap({priorityString: priority}) } : {}),
            ...(attachments ? { attachments } : {}),
        }, id);

        const updatedTask = await getDocumentWithId("tasks", id);
        const taskAttachments = await Promise.all(task.attachments.map(async (attachment) => {
            return await getMediaURL(attachment);
        }))
        return res.status(200).json({ message: `Task updated`, task: projectTask({ task: updatedTask, taskAttachments }) });
    } catch (err) {
        return res.status(400).json({ message: err.message })
    }
})

router.delete("/", isAuthenticated, async (req, res) => {
    try {
        const { error, value } = deleteTaskSchema.validate(req.query);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const { id } = req.query
        const task = await getDocumentWithId("tasks", id);
        if(!task.exists){
            throw Error("Task not found")
        }
        if(task.user.isEqual(req.userRef)){
            throw Error("Task unaccessible")
        }
        await Promise.all(task.attachments.map(async (attachment) => { return await deleteMediaObject(attachment) }))

        await deleteDocument("tasks", id);

        return res.status(200).json({ message: `Task Deleted` });
    } catch (err) {
        return res.status(400).json({ message: err.message })
    }
})

//Functions
function priorityMap({ priorityNum, priorityString }) {
    if(priorityNum) {
        switch(priorityNum){
            case 1: return "Low";
            case 2: return "Medium";
            case 3: return "High";
        }
    } else {
        switch(priorityString){
            case "Low": return 1;
            case "Medium": return 2;
            case "High": return 3;
        }
    }
}

function projectTask({ task, taskAttachments }) {
    return {
        id: task.id,
        title: task.title,
        description: task.description,
        dueDate: new Date(task.dueDate.seconds * 1000),
        priority: priorityMap({priorityNum: task.priority}),
        status: task.status,
        ...(taskAttachments ? { attachments: taskAttachments } : {}),
        createdAt: new Date(task.createdAt.seconds * 1000),
        updatedAt: new Date(task.updatedAt.seconds * 1000),
    }
}

module.exports = router;