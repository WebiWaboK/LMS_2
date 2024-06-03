const db = require('../config/db').pool;
const bcrypt = require('bcrypt');

// Mostrar la página de inicio de sesión del estudiante
exports.showStudentLogin = (req, res) => {
  res.render('studentLogin');
};

// Manejar el inicio de sesión del estudiante y mostrar el menú
exports.studentLoginAndShowMenu = async (req, res) => {
  let { email, password } = req.body;

  // Validar si el correo electrónico no es undefined
  if (typeof email !== 'undefined') {
    email = email.trim();
  }

  console.log('Datos recibidos:', { email, password });

  try {
    // Consultar el estudiante en la base de datos
    console.log('Consultando al estudiante en la base de datos...');
    const [rows] = await db.execute('SELECT * FROM students WHERE TRIM(email) = ?', [email]);

    // Verificar si se encontraron resultados
    if (!rows || rows.length === 0) {
      console.log('No se encontró ningún estudiante con el correo proporcionado.');
      return res.status(401).render('studentLogin', { error: 'Usuario o contraseña incorrectos' });
    }

    const student = rows[0];

    // Console.log de la contraseña almacenada en la base de datos
    console.log('Contraseña almacenada en la base de datos:', student.password);

    // Verificar si la contraseña coincide
    if (!(await bcrypt.compare(password, student.password))) {
      console.log('Contraseña incorrecta.');
      return res.status(401).render('studentLogin', { error: 'Usuario o contraseña incorrectos' });
    }

    // El estudiante ha iniciado sesión correctamente
    console.log('El estudiante ha iniciado sesión correctamente.');

    // Almacenar la sesión del usuario
    req.session.user = { id: student.id, role: 'student', username: student.username };

    // Obtener los módulos y tareas
    console.log('Obteniendo los módulos y tareas...');
    const [modules] = await db.execute('SELECT * FROM modules');

    // Obtener las tareas para cada módulo
    for (let module of modules) {
      const [tasks] = await db.execute('SELECT * FROM tasks WHERE modules_id = ?', [module.id]);
      module.tasks = tasks;
    }

    // Pasa los módulos a la vista
    console.log(modules); // Para verificar los datos en la consola
    res.render('menu', { role: 'student', username: student.username, modules: modules });
  } catch (err) {
    console.error('Error al iniciar sesión del estudiante o al obtener los módulos:', err);
    res.status(500).send('Error del servidor');
  }
};
