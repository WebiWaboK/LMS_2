const db = require('../config/db').pool;

// Mostrar el examen
exports.showExam = async (req, res) => {
    console.log('Ingresando al controlador para mostrar el examen...');
    const examId = req.params.id;
    const role = req.session.role;

    try {
        console.log('Consultando el examen en la base de datos...');
        const [examRows] = await db.execute('SELECT * FROM exams WHERE id = ?', [examId]);
        const exam = examRows[0];

        if (!exam) {
            console.log('Examen no encontrado');
            return res.status(404).send('Examen no encontrado');
        }

        console.log('Obteniendo las preguntas del examen...');
        const [questions] = await db.execute('SELECT * FROM questions WHERE exam_id = ?', [examId]);

        for (let question of questions) {
            const [answers] = await db.execute('SELECT * FROM answers WHERE question_id = ?', [question.id]);
            question.answers = answers;
        }

        exam.questions = questions;

        res.render('exam', { role: role, exam: exam });
    } catch (err) {
        console.error('Error al obtener el examen:', err);
        res.status(500).send('Error del servidor');
    }
};

// Manejar la respuesta del examen por el estudiante
exports.submitExam = async (req, res) => {
    console.log('Ingresando al controlador para enviar respuestas del examen...');
    const examId = req.params.id;
    const studentId = req.session.user.id;
    const answers = req.body.answers;

    try {
        console.log('Enviando respuestas del examen...');
        for (const questionId in answers) {
            const answerId = answers[questionId];
            await db.execute('INSERT INTO student_answers (student_id, exam_id, question_id, answer_id) VALUES (?, ?, ?, ?)',
                [studentId, examId, questionId, answerId]);
        }

        console.log('Respuestas del examen enviadas con éxito.');
        res.redirect('/menu');
    } catch (err) {
        console.error('Error al enviar las respuestas del examen:', err);
        res.status(500).send('Error del servidor');
    }
};

// Mostrar el formulario de edición del examen
exports.showEditExamForm = async (req, res) => {
    console.log('Ingresando al controlador para mostrar formulario de edición del examen...');
    const examId = req.params.id;

    try {
        console.log('Consultando el examen en la base de datos...');
        const [examRows] = await db.execute('SELECT * FROM exams WHERE id = ?', [examId]);
        const exam = examRows[0];

        if (!exam) {
            console.log('Examen no encontrado');
            return res.status(404).send('Examen no encontrado');
        }

        console.log('Obteniendo las preguntas del examen...');
        const [questions] = await db.execute('SELECT * FROM questions WHERE exam_id = ?', [examId]);

        for (let question of questions) {
            const [answers] = await db.execute('SELECT * FROM answers WHERE question_id = ?', [question.id]);
            question.answers = answers;
        }

        exam.questions = questions;

        res.render('editExam', { exam: exam });
    } catch (err) {
        console.error('Error al obtener el examen para edición:', err);
        res.status(500).send('Error del servidor');
    }
};
