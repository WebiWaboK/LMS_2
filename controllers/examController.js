const db = require('../config/db').pool;

async function showCreateExamForm(req, res) {
    try {
        const [modules] = await db.execute('SELECT id, name FROM modules');
        console.log('Renderizando el formulario de creación de examen.');
        res.render('createExam', { modules });
    } catch (error) {
        console.error('Error al mostrar el formulario de creación de examen', error);
        res.status(500).send('Error al mostrar el formulario de creación de examen');
    }
}

async function createExam(req, res) {
    const { title, module_id } = req.body;

    console.log('Datos recibidos en la solicitud:', req.body);

    const questions = Object.keys(req.body)
        .filter(key => key.startsWith('questions'))
        .reduce((result, key) => {
            const [index, prop, subIndex, subProp] = key.match(/\[(\w+)\]/g).map(s => s.slice(1, -1));
            result[index] = result[index] || { question_text: '', answers: [] };
            if (prop === 'question_text') {
                result[index].question_text = req.body[key];
            } else if (prop === 'answers') {
                result[index].answers[subIndex] = result[index].answers[subIndex] || {};
                result[index].answers[subIndex][subProp] = req.body[key];
                if (subProp === 'is_correct') {
                    result[index].answers[subIndex].is_correct = true;
                }
            }
            return result;
        }, []);

    if (!questions.length) {
        console.error('Formato de preguntas inválido:', questions);
        return res.status(400).send('Invalid questions format');
    }

    try {
        console.log('Insertando el examen con título:', title, 'en el módulo:', module_id);

        const [examResult] = await db.execute('INSERT INTO exams (title, module_id) VALUES (?, ?)', [title, module_id]);

        console.log('Resultado de la inserción del examen:', examResult);

        if (!examResult || !examResult.insertId) {
            throw new Error('Error al insertar el examen en la base de datos');
        }

        const examId = examResult.insertId;
        console.log('ID del examen insertado:', examId);

        for (const question of questions) {
            const { question_text, answers } = question;
            console.log('Insertando la pregunta:', question_text);

            const [questionResult] = await db.execute('INSERT INTO questions (exam_id, question_text) VALUES (?, ?)', [examId, question_text]);

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
