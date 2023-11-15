// config/env.js

// Cargar variables de entorno desde el archivo .env
require('dotenv').config();

// Configuración de variables de entorno
module.exports = {
  PORT: process.env.PORT || 3003,
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/yourdatabase'
};
