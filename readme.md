---

# Material del Curso - Desarrollo de Aplicaciones con Node.js y Express

## Clase 3: Estructura del Proyecto y Buenas Prácticas

### 1. Modelo (`models/task.js`)

#### ¿Qué es un modelo?
En el contexto de Mongoose, el modelo representa la estructura de los datos que se almacenarán en MongoDB. Para nuestro proyecto, el modelo `Task` define cómo se estructurarán las tareas.

#### ¿Por qué se define así?
El modelo utiliza un esquema (`TaskSchema`) que especifica la forma de los documentos en la colección. Esto ayuda en la validación de datos y mantiene una estructura consistente.

#### ¿Para qué sirve?
- **Validación de datos:** Garantiza que los datos cumplan con ciertos criterios antes de almacenarse.
- **Consistencia de datos:** Facilita mantener una estructura uniforme en la colección.

```javascript
// models/task.js

const mongoose = require('mongoose');

// Definición del modelo
const TaskSchema = new mongoose.Schema({
  title: String,
  description: String
});

// Exportar el modelo
module.exports = mongoose.model('Task', TaskSchema);
```

### 2. Controlador (`controllers/taskController.js`)

#### ¿Qué es un controlador?
El controlador gestiona la lógica de la aplicación y proporciona funciones para interactuar con los modelos. En nuestro caso, `taskController` contiene funciones para realizar operaciones CRUD en la colección de tareas.

#### ¿Por qué se estructura así?
- **Separación de preocupaciones:** Cada función del controlador aborda una operación específica, facilitando la modularidad y mantenibilidad.
- **Reutilización de código:** Las funciones del controlador pueden ser usadas en diferentes rutas o incluso en otros controladores.

```javascript
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

  // ... (resto de las funciones del controlador)
};

// Exportar el controlador
module.exports = taskController;
```

### 3. Rutas (`routes/taskRoutes.js`)

#### ¿Qué son las rutas en Express?
Las rutas en Express definen cómo la aplicación responderá a solicitudes HTTP específicas. En `taskRoutes.js`, usamos el enrutador de Express para definir rutas RESTful y conectarlas con las funciones del controlador correspondientes.

#### ¿Por qué se estructura así?
- **Separación de rutas y lógica de control:** El enrutador dirige las solicitudes a las funciones del controlador, manteniendo un código organizado.

```javascript
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
```

### 4. Middleware de Errores (`middleware/errorMiddleware.js`)

#### ¿Qué es un middleware?
Un middleware en Express es una función que tiene acceso a la solicitud, la respuesta y la siguiente función en la pila de middleware. `errorMiddleware` maneja errores y proporciona una respuesta de error centralizada.

```javascript
// middleware/errorMiddleware.js

// Middleware para manejar errores
const errorMiddleware = (err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
};

// Exportar el middleware
module.exports = errorMiddleware;
```

### 5. Middleware para Datos JSON (`app.js`)

#### ¿Qué es este middleware?
`express.json()` es un middleware que analiza cuerpos de solicitudes que contienen datos JSON. Facilita el manejo de solicitudes con datos JSON.

#### ¿Por qué se usa?
- **Manejo de solicitudes JSON:** Simplifica el trabajo con solicitudes que contienen datos en formato JSON.

```javascript
// app.js

const express = require('express');
const mongoose = require('mongoose');
const taskRoutes = require('./routes/taskRoutes');
const errorMiddleware = require('./middleware/errorMiddleware');
const { PORT, MONGODB_URI } = require('./config/env');

const app = express();

// Conexión a MongoDB Atlas
mongoose.connect(MONGODB_URI);

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
```

### 6. Configuración de Variables de Entorno (`config/env.js`)

#### ¿Qué es un archivo `.env`?
El archivo `.env` es un archivo de configuración que contiene variables de entorno. Guardamos información sensible y configuraciones flexibles en estas variables

.

#### ¿Por qué se usa?
- **Seguridad y configuración flexible:** Almacena información sensible y permite ajustar la configuración sin cambiar el código fuente.

```javascript
// config/env.js

// Configuración de variables de entorno
require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 3003,
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/yourdatabase'
};
```
