// models/task.js

const mongoose = require('mongoose');

// Definición del modelo
const TaskSchema = new mongoose.Schema({
  title: String,
  description: String
});

// Exportar el modelo
module.exports = mongoose.model('Task', TaskSchema);
