const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const checkRole = require('../middleware/checkRole');
const { urlencodedParser } = require('../middleware/middleware');

// Rutas para tareas
router.get('/create-task', checkRole('teacher'), taskController.showCreateTaskForm);
router.post('/create-task', checkRole('teacher'), taskController.createTask);

// Nueva ruta para ver una tarea específica
router.get('/task/:id', taskController.showTask);

// Nueva ruta para subir archivos para una tarea específica
router.post('/task/upload/:id', urlencodedParser, checkRole('student'), taskController.uploadTaskFile);

// Nueva ruta para editar una tarea
router.get('/task/edit/:id', checkRole('teacher'), taskController.showEditTaskForm);
router.post('/task/edit/:id', urlencodedParser, checkRole('teacher'), taskController.editTask);

// Nueva ruta para eliminar una tarea
router.post('/task/delete/:id', checkRole('teacher'), taskController.deleteTask);

module.exports = router;
