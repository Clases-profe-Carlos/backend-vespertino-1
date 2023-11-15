// controllers/taskController.js

const Task = require('../models/task');

// Controlador para operaciones CRUD
const taskController = {
  getAllTasks: async (req, res) => {
    try {
      const tasks = await Task.find();
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getTaskById: async (req, res) => {
    try {
      const task = await Task.findById(req.params.id);
      res.json(task);
    } catch (error) {
      res.status(404).json({ error: 'Tarea no encontrada' });
    }
  },

  createTask: async (req, res) => {
    const { title, description } = req.body;
    const newTask = new Task({ title, description });

    try {
      const savedTask = await newTask.save();
      res.status(201).json(savedTask);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  updateTaskById: async (req, res) => {
    try {
      const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updatedTask);
    } catch (error) {
      res.status(404).json({ error: 'Tarea no encontrada' });
    }
  },

  deleteTaskById: async (req, res) => {
    try {
      const deletedTask = await Task.findByIdAndDelete(req.params.id);
      res.json(deletedTask);
    } catch (error) {
      res.status(404).json({ error: 'Tarea no encontrada' });
    }
  }
};

// Exportar el controlador
module.exports = taskController;
