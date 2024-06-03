const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv');
const taskController = require('./controllers/taskController');
const logoutController = require('./controllers/logoutController');
const adminRoutes = require('./routes/adminRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const studentRoutes = require('./routes/studentRoute');

dotenv.config();

const app = express();
const port = 3000;

// Configuración de middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

// Configuración de express-session
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Asegúrate de ajustar esto según tus necesidades
}));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

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
app.use('/admin', adminRoutes);
app.use(teacherRoutes);
app.use(studentRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});
