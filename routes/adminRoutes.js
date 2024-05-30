const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const createUserController = require('../controllers/createUserController');


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
router.get('/createTeacher', createUserController.renderRegisterTeacherPage);

// Manejar el registro de maestros
router.post('/createTeacher', createUserController.registerTeacher);

// Mostrar la página de registro de estudiantes
router.get('/registerStudent', createUserController.renderRegisterStudentPage);

// Manejar el registro de estudiantes
router.post('/registerStudent', createUserController.registerStudent);
module.exports = router;
