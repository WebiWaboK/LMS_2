const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentLoginController'); // Asegúrate de que la ruta del controlador es correcta

// Mostrar la página de inicio de sesión del estudiante
router.get('/studentLogin', studentController.showStudentLogin);

// Manejar el formulario de inicio de sesión del estudiante
router.post('/studentLogin', studentController.studentLogin);

// Ruta para mostrar el menú
router.get('/menu', studentController.studentLogin);

// Si tienes un formulario en el menú que necesita ser manejado, asegúrate de definir la función correspondiente en el controlador
router.post('/menu', studentController.studentLogin);

module.exports = router;
