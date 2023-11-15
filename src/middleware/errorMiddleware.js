// middleware/errorMiddleware.js

// Middleware para manejar errores
const errorMiddleware = (err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).json({ error: 'Error interno del servidor' });
  };
  
  // Exportar el middleware
  module.exports = errorMiddleware;
  