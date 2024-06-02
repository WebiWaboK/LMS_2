const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv');
const taskController = require('./controllers/taskController');
const logoutController = require('./controllers/logoutController'); // Importa el controlador de logout

dotenv.config();

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true
}));
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views')); // Asegúrate de configurar la carpeta de vistas

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
