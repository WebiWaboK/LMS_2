const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv');

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

// Ruta principal
app.get('/', (req, res) => {
  res.render('index');
});

// Usar las rutas del administrador
const adminRoutes = require('./routes/adminRoutes');
app.use('/admin', adminRoutes);

const teacherRoutes = require('./routes/teacherRoutes');
app.use(teacherRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});
