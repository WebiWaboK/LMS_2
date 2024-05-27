// Importar Express y crear una instancia de la aplicación
const express = require('express');
const app = express();

// Configurar las rutas para manejar los errores "Cannot POST"
app.post('/adminLogin', (req, res) => {
  res.status(404).send('Error 404: La ruta /adminLogin no está disponible.');
});

app.post('/studentLogin', (req, res) => {
  res.status(404).send('Error 404: La ruta /studentLogin no está disponible.');
});

app.post('/teacherLogin', (req, res) => {
  res.status(404).send('Error 404: La ruta /teacherLogin no está disponible.');
});