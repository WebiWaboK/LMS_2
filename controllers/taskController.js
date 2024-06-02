const db = require('../config/db').pool;

exports.showCreateTaskForm = (req, res) => {
  if (!req.session.user || req.session.user.role !== 'teacher') {
    return res.redirect('/teacherLogin');
  }
  res.render('createTask');
};

exports.createTask = async (req, res) => {
  try {
    const { taskName, description, dueDate } = req.body;

    const [result] = await db.execute(
      'INSERT INTO tasks (task_name, description, due_date) VALUES (?, ?, ?)',
      [taskName, description, dueDate]
    );

    if (!result || result.affectedRows !== 1) {
      console.log('Error al crear la tarea');
      return res.status(500).send('Error al crear la tarea');
    }

    return res.redirect('/menu');
  } catch (err) {
    console.error('Error al crear la tarea:', err);
    return res.status(500).send('Error del servidor');
  }
};
