// routes/taskRoutes.js

const express = require('express');
const taskController = require('../controllers/taskController');

// Crear un enrutador de express
const router = express.Router();

// Definir rutas RESTful
router.get('/tasks', taskController.getAllTasks);
router.get('/tasks/:id', taskController.getTaskById);
router.post('/tasks', taskController.createTask);
router.put('/tasks/:id', taskController.updateTaskById);
router.delete('/tasks/:id', taskController.deleteTaskById);

// Exportar el enrutador
module.exports = router;
