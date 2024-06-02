const db = require('../config/db').pool;
const bcrypt = require('bcrypt');

// Mostrar la página de inicio de sesión del estudiante
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
     // Redirigir al panel de control del estudiante
  } catch (err) {
    console.error('Error al iniciar sesión del estudiante:', err);
    res.status(500).send('Error del servidor');
  }
};
