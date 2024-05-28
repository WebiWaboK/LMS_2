const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'pug');

// Rutas
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');

app.get('/', (req, res) => {
  res.render('index');
});

app.use('/admin', adminRoutes);
app.use('/admin', userRoutes);

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port} http://localhost:${port}/`);
});
