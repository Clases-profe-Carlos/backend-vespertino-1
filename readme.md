
Desarrollo de Aplicaciones con Node.js y Express

Este repositorio contiene el código fuente y la estructura de un proyecto Node.js y Express para el desarrollo de aplicaciones web.

## Estructura del Proyecto

### 1. Modelo (`models/task.js`)

- **¿Qué es un modelo?**
- **¿Por qué se define así?**
- **¿Para qué sirve?**

```javascript
// models/task.js
const mongoose = require('mongoose');
const TaskSchema = new mongoose.Schema({
  title: String,
  description: String
});
module.exports = mongoose.model('Task', TaskSchema);
```

### 2. Controlador (`controllers/taskController.js`)

- **¿Qué es un controlador?**
- **¿Por qué se estructura así?**

```javascript
// controllers/taskController.js
const Task = require('../models/task');
const taskController = {
  // ... (resto de las funciones del controlador)
};
module.exports = taskController;
```

### 3. Rutas (`routes/taskRoutes.js`)

- **¿Qué son las rutas en Express?**
- **¿Por qué se estructura así?**

```javascript
// routes/taskRoutes.js
const express = require('express');
const taskController = require('../controllers/taskController');
const router = express.Router();
router.get('/tasks', taskController.getAllTasks);
// ... (resto de las rutas)
module.exports = router;
```

### 4. Middleware de Errores (`middleware/errorMiddleware.js`)

- **¿Qué es un middleware?**
- **¿Por qué se usa?**

```javascript
// middleware/errorMiddleware.js
const errorMiddleware = (err, req, res, next) => {
  // ... (manejo de errores)
};
module.exports = errorMiddleware;
```

### 5. Middleware para Datos JSON (`app.js`)

- **¿Qué es este middleware?**
- **¿Por qué se usa?**

```javascript
// app.js
const express = require('express');
const mongoose = require('mongoose');
const taskRoutes = require('./routes/taskRoutes');
const errorMiddleware = require('./middleware/errorMiddleware');
const { PORT, MONGODB_URI } = require('./config/env');
const app = express();
// ... (resto del código)
```

### 6. Configuración de Variables de Entorno (`config/env.js`)

- **¿Qué es un archivo `.env`?**
- **¿Por qué se usa?**

```javascript
// config/env.js
require('dotenv').config();
module.exports = {
  PORT: process.env.PORT || 3003,
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/yourdatabase'
};
