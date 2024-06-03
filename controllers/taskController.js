const db = require('../config/db').pool;

exports.showCreateTaskForm = async (req, res) => {
  if (!req.session.user || req.session.user.role !== 'teacher') {
    return res.redirect('/teacherLogin');
  }
  try {
    const [modules] = await db.execute('SELECT id, name FROM modules');
    res.render('createTask', { modules });
  } catch (err) {
    console.error('Error al obtener módulos:', err);
    res.status(500).send('Error del servidor');
  }
};

exports.createTask = async (req, res) => {
  try {
    const { moduleId, taskName, description, dueDate } = req.body;

    const [result] = await db.execute(
      'INSERT INTO tasks (module_id, task_name, description, due_date) VALUES (?, ?, ?, ?)',
      [moduleId, taskName, description, dueDate]
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

exports.showMenu = async (req, res) => {
  if (!req.session.user || req.session.user.role !== 'teacher') {
    return res.redirect('/teacherLogin');
  }

  try {
    // Obtén los módulos de la base de datos
    const [modules] = await db.execute('SELECT * FROM modules');

    // Aquí podrías obtener también las asignaciones para cada módulo si es necesario

    res.render('menu', { username: req.session.user.username, role: req.session.user.role, modules: modules });
  } catch (err) {
    console.error('Error al obtener los módulos:', err);
    res.status(500).send('Error del servidor');
  }
};