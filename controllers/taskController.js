const db = require('../config/db').pool;

// Mostrar el formulario para crear una tarea
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

// Crear una tarea
exports.createTask = async (req, res) => {
  try {
    const { modules_id, taskName, description, dueDate } = req.body;

    console.log('Datos de la tarea recibidos:', { modules_id, taskName, description, dueDate });

    const [result] = await db.execute(
      'INSERT INTO tasks (modules_id, task_name, description, due_date) VALUES (?, ?, ?, ?)',
      [modules_id, taskName, description, dueDate]
    );

    console.log('Resultado de la inserción:', result);

    if (!result || result.affectedRows !== 1) {
      console.log('Error al crear la tarea');
      console.log(req.body);
      return res.status(500).send('Error al crear la tarea');
    }

    console.log('Tarea creada con éxito');
    return res.redirect('/menu');
  } catch (err) {
    console.error('Error al crear la tarea:', err);
    return res.status(500).send('Error del servidor');
  }
};

exports.showTask = async (req, res) => {
  const taskId = req.params.id;
  const user = req.session.user;
  const role = user ? user.role : undefined;

  console.log('Rol del usuario:', role);

  try {
    const [taskRows] = await db.execute('SELECT * FROM tasks WHERE id = ?', [taskId]);
    if (taskRows.length === 0) {
      return res.status(404).send('Tarea no encontrada');
    }

    const task = taskRows[0];

    if (role === 'teacher') {
      const [uploads] = await db.execute(`
        SELECT u.file_link, u.uploaded_at, s.first_name as student_first_name, s.last_name1 as student_last_name1
        FROM uploads u
        JOIN students s ON u.student_id = s.id
        WHERE u.task_id = ?
      `, [taskId]);

      res.render('task', { task, role, uploads });
    } else {
      res.render('task', { task, role });
    }
  } catch (err) {
    console.error('Error al obtener la tarea:', err);
    res.status(500).send('Error del servidor');
  }
};

// Subir archivo para una tarea específica
exports.uploadTaskFile = async (req, res) => {
  try {
    const { file_link } = req.body;
    const taskId = req.params.id;
    const studentId = req.session.user.id;

    await db.execute(
      'INSERT INTO uploads (task_id, student_id, file_link) VALUES (?, ?, ?)',
      [taskId, studentId, file_link]
    );

    res.redirect(`/task/${taskId}`);
  } catch (err) {
    console.error('Error al subir el archivo de la tarea:', err);
    res.status(500).send('Error del servidor');
  }
};

// Editar una tarea específica
exports.showEditTaskForm = async (req, res) => {
  try {
    const taskId = req.params.id;
    const [taskRows] = await db.execute('SELECT * FROM tasks WHERE id = ?', [taskId]);

    if (!taskRows || taskRows.length === 0) {
      console.log('No se encontró la tarea con el ID proporcionado.');
      return res.status(404).send('Tarea no encontrada');
    }

    const task = taskRows[0];
    res.render('editTask', { task });
  } catch (err) {
    console.error('Error al obtener la tarea:', err);
    res.status(500).send('Error del servidor');
  }
};

exports.editTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const { taskName, description, dueDate } = req.body;

    await db.execute(
      'UPDATE tasks SET task_name = ?, description = ?, due_date = ? WHERE id = ?',
      [taskName, description, dueDate, taskId]
    );

    res.redirect(`/task/${taskId}`);
  } catch (err) {
    console.error('Error al editar la tarea:', err);
    res.status(500).send('Error del servidor');
  }
};

// Eliminar una tarea específica
exports.deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;

    await db.execute('DELETE FROM tasks WHERE id = ?', [taskId]);

    res.redirect('/menu');
  } catch (err) {
    console.error('Error al eliminar la tarea:', err);
    res.status(500).send('Error del servidor');
  }
};
