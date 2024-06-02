const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv');
const { urlencodedParser } = require('./middleware/middleware');

dotenv.config();

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(urlencodedParser);
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

const bcrypt = require('bcrypt');

bcrypt.hash('admin', 10, (err, hash) => {
  if (err) throw err;
  // Usa este hash en tu inserción SQL
  console.log(hash);
});


app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port} http://localhost:${port}/`);
});

