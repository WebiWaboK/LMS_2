const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const createUserController = require('../controllers/createUserController');
const studentController = require('../controllers/studentController'); // Importa el controlador de estudiantes

// Mostrar la página de inicio de sesión del administrador
router.get('/adminLogin', (req, res) => {
  res.render('adminLogin');
});

// Manejar el formulario de inicio de sesión del administrador
router.post('/adminLogin', adminController.adminLogin);

// Mostrar la página de creación de usuarios
router.get('/createUser', (req, res) => {
  res.render('createUser');
});

// Mostrar la página de registro de maestros
router.get('/createTeacher', (req, res) => {
  res.render('createTeacher');
});

// Manejar el registro de maestros
router.post('/createTeacher', createUserController.registerTeacher);

// Mostrar la página de registro de estudiantes
router.get('/createStudent', (req, res) => {
  res.render('createStudent');
});

// Manejar el registro de estudiantes
router.post('/createStudent', studentController.registerStudent); // Utiliza la función registerStudent del controlador de estudiantes

module.exports = router;
