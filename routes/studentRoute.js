const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentLoginController'); 
const checkRole = require('../middleware/checkRole');
const { urlencodedParser } = require('../middleware/middleware');
const moduleController = require('../controllers/moduleController');


// Mostrar la página de inicio de sesión del estudiante
router.get('/studentLogin', studentController.showStudentLogin);

// Manejar el formulario de inicio de sesión del estudiante
router.post('/studentLogin', studentController.studentLogin);

// Ruta para mostrar el menú
router.get('/menu', studentController.studentLogin);
router.post('/menu', studentController.studentLogin);

router.get('/menu', checkRole('student'), studentController.showMenu);

module.exports = router;
