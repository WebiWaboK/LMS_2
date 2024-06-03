const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentLoginController'); 
const checkRole = require('../middleware/checkRole');

// Mostrar la página de inicio de sesión del estudiante
router.get('/studentLogin', studentController.showStudentLogin);

// Manejar el formulario de inicio de sesión del estudiante y mostrar el menú después del inicio de sesión
router.post('/studentLogin', studentController.studentLoginAndShowMenu);

// Ruta para mostrar el menú
router.get('/menu', checkRole('student'), studentController.studentLoginAndShowMenu);
router.post('/menu', studentController.studentLoginAndShowMenu);

module.exports = router;
