// routes/adminRoutes.js

const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Mostrar la página de inicio de sesión del administrador
router.get('/login', (req, res) => {
  res.render('adminLogin');
}); 

// Manejar el formulario de inicio de sesión del administrador
router.post('/login', adminController.adminLogin);

// Mostrar la página de creación de usuarios
router.get('/createUser', adminController.renderCreateUserPage);

module.exports = router;