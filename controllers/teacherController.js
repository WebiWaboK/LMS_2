const db = require('../config/db').pool;
const bcrypt = require('bcrypt');

// Mostrar la página de inicio de sesión del maestro
exports.showTeacherLogin = (req, res) => {
  res.render('teacherLogin');
};

exports.teacherLogin = async (req, res) => {
  let { email, password } = req.body;

  // Validar si el correo electrónico no es undefined
  if (typeof email !== 'undefined') {
    email = email.trim();
  }

  // Console.log de los datos recibidos
  console.log('Datos recibidos:', { email, password });

  try {
    // Consultar el maestro en la base de datos
    console.log('Consultando el maestro en la base de datos...');
    const [rows] = await db.execute('SELECT * FROM teachers WHERE TRIM(email) = ?', [email]);

    // Verificar si se encontraron resultados
    if (!rows || rows.length === 0) {
      console.log('No se encontró ningún maestro con el correo proporcionado.');
      return res.status(401).render('teacherLogin', { error: 'Usuario o contraseña incorrectos' });
    }

    const teacher = rows[0];

    // Console.log de la contraseña almacenada en la base de datos
    console.log('Contraseña almacenada en la base de datos:', teacher.password);

    // Verificar si la contraseña coincide
    if (!(await bcrypt.compare(password, teacher.password))) {
      console.log('Contraseña incorrecta.');
      return res.status(401).render('teacherLogin', { error: 'Usuario o contraseña incorrectos' });
    }

    // El maestro ha iniciado sesión correctamente
    console.log('El maestro ha iniciado sesión correctamente.');

    // Almacenar la sesión del usuario
    req.session.user = { id: teacher.id, role: teacher.role };

    res.redirect('/menu');
  } catch (err) {
    console.error('Error al iniciar sesión del maestro:', err);
    res.status(500).send('Error del servidor');
  }
};

// Mostrar el menú del maestro
exports.showMenu = (req, res) => {
  if (!req.session.user || req.session.user.role !== 'teacher') {
    return res.redirect('/teacherLogin');
  }
  res.render('menu', { role: req.session.user.role, username: req.session.user.username });
};
