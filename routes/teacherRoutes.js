const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');

// Mostrar la página de inicio de sesión del maestro
router.get('/teacherLogin', teacherController.showTeacherLogin);

// Manejar el formulario de inicio de sesión del maestro
router.post('/teacherLogin', teacherController.teacherLogin);

// Ruta para mostrar el menú
router.get('/menu', teacherController.teacherLogin);

router.post('/menu',teacherController.teacherLogin);

module.exports = router;
