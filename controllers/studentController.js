const db = require('../config/db').pool;
const bcrypt = require('bcrypt');

exports.registerStudent = async (req, res) => {
  const { first_name, last_name1, last_name2, email, password, confirm_password } = req.body;

  try {
    if (typeof password === 'undefined' || typeof password !== 'string') {
      const error = 'La contraseña no es válida';
      return res.render('createStudent', { error });
    }

    console.log('Número de caracteres del correo electrónico:', email ? email.length : 'Correo no definido');
    console.log('Número de caracteres de la contraseña:', password.length);

    if (password !== confirm_password) {
      const error = 'Las contraseñas no coinciden';
      return res.render('createStudent', { error });
    }

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    console.log('Contraseña encriptada:', hashedPassword);

    await db.execute('INSERT INTO students (first_name, last_name1, last_name2, email, password, role) VALUES (?, ?, ?, ?, ?, "student")', 
      [first_name, last_name1, last_name2, email, hashedPassword]);

    res.redirect('createStudent');
  } catch (err) {
    console.error('Error al registrar el estudiante:', err);
    res.status(500).send('Error del servidor');
  }
};

exports.showStudentLogin = (req, res) => {
  res.render('studentLogin');
};

exports.studentLogin = async (req, res) => {
  let { email, password, role } = req.body;

  // Validar si el correo electrónico no es undefined
  if (typeof email !== 'undefined') {
    email = email.trim();
  }

  // Console.log de los datos recibidos
  console.log('Datos recibidos:', { email, password, role });

  try {
    // Consultar al estudiante en la base de datos
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
    req.session.user = { id: student.id, role: student.role };

    res.render('menu', { role: student.role, username: student.first_name });
  } catch (err) {
    console.error('Error al iniciar sesión del estudiante:', err);
    res.status(500).send('Error del servidor');
  }
};

exports.showMenu = async (req, res) => {
  console.log('Sesión de usuario:', req.session.user);
  try {
    // Obtén los módulos de la base de datos
    const [modules] = await db.execute('SELECT * FROM modules');

    // Obtén las asignaciones para cada módulo
    for (let module of modules) {
      const [tasks] = await db.execute('SELECT * FROM tasks WHERE modules_id = ?', [module.id]);
      module.tasks = tasks;
      console.log('Datos obtenidos de la base de datos:', modules);
    }

    // Verifica los datos obtenidos en la consola
    console.log('Datos obtenidos de la base de datos:', modules);

    // Pasa los módulos a la vista
    console.log(modules);
    res.render('menu', { username: req.session.user.username, role: req.session.user.role, modules: modules });
  } catch (err) {
    console.error('Error al obtener los módulos:', err);
    res.status(500).send('Error del servidor');
  }
};
