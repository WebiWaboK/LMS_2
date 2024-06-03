const db = require('../config/db').pool;

exports.showCreateTaskForm = async (req, res) => {
  try {
    if (!req.session.user || req.session.user.role !== 'teacher') {
      console.log('El usuario no está autenticado como profesor');
      return res.redirect('/teacherLogin');
    }
    const [modules] = await db.execute('SELECT id, name FROM modules');
    console.log('Módulos obtenidos con éxito:', modules);
    res.render('createTask', { modules });
  } catch (err) {
    console.error('Error al obtener módulos:', err);
    res.status(500).send('Error del servidor');
  }
};

exports.createTask = async (req, res) => {
  try {
    const { modulesId, taskName, description, dueDate } = req.body;

    const [result] = await db.execute(
      'INSERT INTO tasks (modules_id, task_name, description, due_date) VALUES (?, ?, ?, ?)',
      [modulesId, taskName, description, dueDate]
    );

    if (!result || result.affectedRows !== 1) {
      console.log('Error al crear la tarea');
      return res.status(500).send('Error al crear la tarea');
    }

    console.log('Tarea creada con éxito');
    return res.redirect('/menu');
  } catch (err) {
    console.error('Error al crear la tarea:', err);
    return res.status(500).send('Error del servidor');
  }
};
