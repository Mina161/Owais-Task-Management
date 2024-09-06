const Joi = require('joi');

const createTaskSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    dueDate: Joi.date().required(),
    priority: Joi.string().valid('Low', 'Medium', 'High').required(),
    attachments: Joi.array().items(Joi.string().uri()).optional()
});

const getTasksSchema = Joi.object({
    searchTerm: Joi.string().optional(),
    status: Joi.string().valid('New', 'In Progress', 'Completed').optional(),
    priority: Joi.string().valid('Low', 'Medium', 'High').optional(),
    id: Joi.string().optional()
});

const updateTaskSchema = Joi.object({
    id: Joi.string().required(),
    title: Joi.string().optional(),
    description: Joi.string().optional(),
    status: Joi.string().valid('New', 'In Progress', 'Completed').optional(),
    priority: Joi.string().valid('Low', 'Medium', 'High').optional(),
    attachments: Joi.array().items(Joi.string().uri()).optional()
});

const deleteTaskSchema = Joi.object({
    id: Joi.string().required()
});

module.exports = { createTaskSchema, getTasksSchema, updateTaskSchema, deleteTaskSchema }