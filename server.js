const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv');
const taskController = require('./controllers/taskController');
const logoutController = require('./controllers/logoutController');
const checkRole = require('./middleware/checkRole');

dotenv.config();

const app = express();
const port = 3000;

// Configuración de express-session
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true
}));

// Asigna el middleware checkRole después de configurar express-session
app.use(checkRole);
// Ruta principal
app.get('/', (req, res) => {
  res.render('index');
});

// Ruta para mostrar el formulario de creación de tareas
app.get('/create-task', taskController.showCreateTaskForm);

// Ruta para procesar el formulario de creación de tareas
app.post('/create-task', taskController.createTask);

// Ruta para manejar el logout
app.get('/logout', logoutController.logout);

// Usar las rutas del administrador
const adminRoutes = require('./routes/adminRoutes');
app.use('/admin', adminRoutes);

const teacherRoutes = require('./routes/teacherRoutes');
app.use(teacherRoutes);

const studentRoutes = require('./routes/studentRoute');
app.use(studentRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});
