// app.js

const express = require('express');
const mongoose = require('mongoose');
const taskRoutes = require('./routes/taskRoutes');
const errorMiddleware = require('./middleware/errorMiddleware');
const { PORT, MONGODB_URI } = require('./config/env');

const app = express();

// Conexión a MongoDB Atlas
mongoose.connect(MONGODB_URI);

const db = mongoose.connection;

db.on('error', (err) => {
  console.error('Error de conexión a MongoDB:', err);
});

db.once('open', () => {
  console.log('Conexión exitosa a MongoDB Atlas');
});

// Middleware para manejar datos JSON en las solicitudes
app.use(express.json());

// Rutas RESTful
app.use('/api', taskRoutes);

// Middleware para manejar errores
app.use(errorMiddleware);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
