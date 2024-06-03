const db = require('../config/db').pool;
const bcrypt = require('bcrypt');

exports.showStudentLogin = async (req, res) => {
  try {
    res.render('menu');
  } catch (err) {
    console.error('Error al mostrar el inicio de sesión del estudiante:', err);
    res.status(500).send('Error del servidor');
  }
};

exports.studentLoginAndShowMenu = async (req, res) => {
  let { email, password, role } = req.body;

  if (typeof email !== 'undefined') {
    email = email.trim();
  }

  console.log('Datos recibidos:', { email, password, role });

  try {
    console.log('Consultando al estudiante en la base de datos...');
    const [rows] = await db.execute('SELECT * FROM students WHERE TRIM(email) = ?', [email]);

    if (!rows || rows.length === 0) {
      console.log('No se encontró ningún estudiante con el correo proporcionado.');
      return res.status(401).render('studentLogin', { error: 'Usuario o contraseña incorrectos' });
    }

    const student = rows[0];

    console.log('Contraseña almacenada en la base de datos:', student.password);

    if (!(await bcrypt.compare(password, student.password))) {
      console.log('Contraseña incorrecta.');
      return res.status(401).render('studentLogin', { error: 'Usuario o contraseña incorrectos' });
    }

    console.log('El estudiante ha iniciado sesión correctamente.');

    req.session.user = { id: student.id, role: student.role };

    // Obtener los módulos y tareas
    console.log('Obteniendo los módulos y tareas...');
    const [modules] = await db.execute('SELECT * FROM modules');

    if (!modules || modules.length === 0) {
      console.log('No se encontraron módulos.');
      return res.status(404).send('No se encontraron módulos.');
    }

    const tasksPromises = modules.map(async (module) => {
      const [tasks] = await db.execute('SELECT * FROM tasks WHERE modules_id = ?', [modules.id]);
      module.tasks = tasks;
      return module;
    });

    const modulesWithTasks = await Promise.all(tasksPromises);

    req.session.user.username = modulesWithTasks.length > 0 ? modulesWithTasks[0].username : '';

    res.render('menu', { role: student.role, username: req.session.user.username, modules: modulesWithTasks });
  } catch (err) {
    console.error('Error al iniciar sesión del estudiante o al obtener los módulos:', err);
    res.status(500).send('Error del servidor');
  }
};
