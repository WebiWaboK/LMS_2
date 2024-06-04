const express = require('express');
const router = express.Router();
const examController = require('../controllers/examControllerView');
//const checkRole = require('../middleware/checkRole');
const { urlencodedParser } = require('../middleware/middleware');

// Mostrar el examen
router.get('/exam/:id', (req, res) => {
    console.log('Mostrando el examen...');
    examController.showExam(req, res);
});

// Enviar respuestas del examen
router.post('/submit-exam/:id', urlencodedParser, (req, res) => {
    console.log('Enviando respuestas del examen...');
    examController.submitExam(req, res);
});

// Mostrar el formulario de edición del examen
router.get('/edit-exam/:id', (req, res) => {
    console.log('Mostrando formulario de edición del examen...');
    examController.showEditExamForm(req, res);
});

// Editar el examen
router.post('/edit-exam/:id', urlencodedParser, (req, res) => {
    console.log('Editando el examen...');
    examController.editExam(req, res);
});

module.exports = router;
