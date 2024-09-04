var express = require('express');
var router = express.Router();
const { auth, firestore } = require("../config/firebase");
const { isAuthenticated } = require("../auth/jwt-auth");
const { createDocument, getDocumentWithId, createDocumentWithId, updateDocument, deleteDocument } = require('../controllers/documentController');
const { generateFuzzyArray } = require('../controllers/fuzzyController');
const { getMediaURL, deleteMediaObject } = require('../controllers/storageController');
const { or, query, where, collection, getDocs, and } = require('firebase/firestore');

// Tasks CRUD
router.post("/", isAuthenticated, async (req, res) => {
    try {
        const { title, description, dueDate, priority, attachments } = req.body

        const titleFuzzy = generateFuzzyArray(title);
        const descriptionFuzzy = generateFuzzyArray(description);

        await createDocument("tasks", {
            title,
            description,
            titleFuzzy,
            descriptionFuzzy,
            dueDate: new Date(dueDate),
            priority,
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
        const { searchTerm, status, id } = req.query
        const data = [];
        let queries = [where("user", "==", req.userRef)];

        if (id) {
            const task = await getDocumentWithId("tasks", id);
            const taskAttachments = await Promise.all(task.attachments.map(async (attachment) => {
                return await getMediaURL(attachment);
            }))
            return dispatch({ type: FETCH_RECORDS_SUCCESS, payload: { task: projectTask({ task, taskAttachments }) } });
        }

        if (searchTerm) {
            queries.push(or(where("titleFuzzy", "array-contains", searchTerm.toLowerCase()), where("descriptionFuzzy", "array-contains", searchTerm.toLowerCase())));
        }

        if (status) {
            queries.push(where("status", "==", status));
        }

        const querySnapshot = await getDocs(query(collection(firestore, "tasks"), and(...queries)));

        querySnapshot.forEach(async (doc) => {
            const docData = doc.data()
            data.push(projectTask({ task: {id: doc.id, ...docData} }))
        })

        return res.status(200).json({ tasks: data });
    } catch (err) {
        return res.status(400).json({ message: err.message })
    }
})

router.put("/", isAuthenticated, async (req, res) => {
    try {
        const { id, title, description, status, priority, attachments } = req.body

        const task = await getDocumentWithId("tasks", id);
        const deletedAttachments = task.attachments.filter((attachment) => !attachments.includes(attachment))
        await Promise.all(deletedAttachments.map(async (attachment) => { return await deleteMediaObject(attachment) }))

        await updateDocument("tasks", {
            ...(title ? { title, titleFuzzy: generateFuzzyArray(title) } : {}),
            ...(description ? { description, descriptionFuzzy: generateFuzzyArray(description) } : {}),
            ...(status ? { status } : {}),
            ...(priority ? { priority } : {}),
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
        const { id } = req.query

        const task = await getDocumentWithId("tasks", id);
        await Promise.all(task.attachments.map(async (attachment) => { return await deleteMediaObject(attachment) }))

        await deleteDocument("tasks", id);

        return res.status(200).json({ message: `Task Deleted` });
    } catch (err) {
        return res.status(400).json({ message: err.message })
    }
})

//Functions
function projectTask({ task, taskAttachments }) {
    return {
        id: task.id,
        title: task.title,
        description: task.description,
        dueDate: new Date(task.dueDate.seconds * 1000),
        priority: task.priority,
        status: task.status,
        ...(taskAttachments ? { attachments: taskAttachments } : {}),
        createdAt: new Date(task.createdAt.seconds * 1000),
        updatedAt: new Date(task.updatedAt.seconds * 1000),
    }
}

module.exports = router;