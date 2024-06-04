const db = require('../config/db').pool;

async function showCreateExamForm(req, res) {
    try {
        console.log('Renderizando el formulario de creación de examen.');
        res.render('createExam'); // Renderiza la vista createExam.pug
    } catch (error) {
        console.error('Error al mostrar el formulario de creación de examen', error);
        res.status(500).send('Error al mostrar el formulario de creación de examen');
    }
}

async function createExam(req, res) {
    const { title, questions } = req.body;

    console.log('Datos recibidos en la solicitud:', req.body);

    if (!questions || !Array.isArray(questions)) {
        console.error('Formato de preguntas inválido:', questions);
        return res.status(400).send('Invalid questions format');
    }

    try {
        console.log('Insertando el examen con título:', title);

        // Insertar el examen en la base de datos
        const [examResult] = await db.execute('INSERT INTO exams (title) VALUES (?)', [title]);

        console.log('Resultado de la inserción del examen:', examResult);

        // Verificar si se insertó correctamente el examen
        if (!examResult || !examResult.insertId) {
            throw new Error('Error al insertar el examen en la base de datos');
        }

        const examId = examResult.insertId;

        console.log('ID del examen insertado:', examId);

        // Insertar las preguntas y respuestas en la base de datos
        for (const question of questions) {
            const { question_text, answers } = question;

            console.log('Insertando la pregunta:', question_text);

            const [questionResult] = await db.execute('INSERT INTO questions (exam_id, question_text) VALUES (?, ?)', [examId, question_text]);

            console.log('Resultado de la inserción de la pregunta:', questionResult);

            // Verificar si se insertó correctamente la pregunta
            if (!questionResult || !questionResult.insertId) {
                throw new Error('Error al insertar la pregunta en la base de datos');
            }

            const questionId = questionResult.insertId;

            console.log('ID de la pregunta insertada:', questionId);

            for (const answer of answers) {
                const { answer_text, is_correct } = answer;

                console.log('Insertando la respuesta:', answer_text, 'Correcta:', is_correct);

                await db.execute('INSERT INTO answers (question_id, answer_text, is_correct) VALUES (?, ?, ?)', [questionId, answer_text, is_correct ? 1 : 0]);
            }
        }

        res.status(201).send('Examen creado correctamente');
    } catch (error) {
        console.error('Error al crear el examen', error);
        res.status(500).send('Error al crear el examen');
    }
}

const renderCreateExamPage = (req, res) => {
    console.log('Renderizando la página de creación de examen.');
    const questions = []; // Inicialmente vacío o cargar desde la base de datos si es necesario

    res.render('createExam', { questions });
};

async function viewExamAnswers(req, res) {
    console.log('Viendo las respuestas del examen.');
    // Implementar la lógica para ver las respuestas de los alumnos
}

module.exports = {
    showCreateExamForm,
    createExam,
    viewExamAnswers,
    renderCreateExamPage
};
