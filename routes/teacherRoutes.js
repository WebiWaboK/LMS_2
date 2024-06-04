const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');
const taskController = require('../controllers/taskController');
const moduleController = require('../controllers/moduleController');
const examController = require('../controllers/examController');
const checkRole = require('../middleware/checkRole');
const { urlencodedParser } = require('../middleware/middleware');

// Mostrar la página de inicio de sesión del maestro
router.get('/teacherLogin', teacherController.showTeacherLogin);

// Manejar el formulario de inicio de sesión del maestro
router.post('/teacherLogin', teacherController.teacherLogin);

// Ruta para mostrar el menú
router.get('/menu', checkRole('teacher'), teacherController.showMenu);

// Ruta para crear tareas (solo accesible para maestros)
router.get('/create-task', checkRole('teacher'), taskController.showCreateTaskForm);
router.post('/create-task', checkRole('teacher'), taskController.createTask);

// Ruta para crear módulos (solo accesible para maestros)
router.get('/create-module', checkRole('teacher'), moduleController.showCreateModuleForm);
router.post('/create-module', urlencodedParser, checkRole('teacher'), moduleController.createModule);

router.get('/create-exam', examController.showCreateExamForm);
router.get('/create-exam', checkRole('teacher'),examController.createExam);
router.get('/create-exam', examController.renderCreateExamPage);
router.post('/exams', examController.createExam);

module.exports = router;
