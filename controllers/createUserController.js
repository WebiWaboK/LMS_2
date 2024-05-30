const db = require('../config/db').pool;
const bcrypt = require('bcrypt');

// Función para renderizar la página de registro de maestros
exports.renderRegisterTeacherPage = (req, res) => {
  res.render('registerTeacher');
};

// Función para registrar un maestro
exports.registerTeacher = async (req, res) => {
  const { first_name, last_name1, last_name2, email, password, confirm_password } = req.body;

  if (password !== confirm_password) {
    return res.render('registerTeacher', { error: 'Las contraseñas no coinciden' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.execute('INSERT INTO teachers (first_name, last_name1, last_name2, email, password) VALUES (?, ?, ?, ?, ?)', 
      [first_name, last_name1, last_name2, email, hashedPassword]);
    res.send('Usuario maestro creado exitosamente');
  } catch (err) {
    console.error('Error al registrar el maestro:', err);
    res.status(500).send('Error del servidor');
  }
};

// Función para renderizar la página de registro de estudiantes
exports.renderRegisterStudentPage = (req, res) => {
  res.render('registerStudent');
};

// Función para registrar un estudiante
exports.registerStudent = async (req, res) => {
  const { first_name, last_name1, last_name2, email, password, confirm_password } = req.body;

  if (password !== confirm_password) {
    return res.render('registerStudent', { error: 'Las contraseñas no coinciden' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.execute('INSERT INTO students (first_name, last_name1, last_name2, email, password) VALUES (?, ?, ?, ?, ?)', 
      [first_name, last_name1, last_name2, email, hashedPassword]);
    res.send('Usuario estudiante creado exitosamente');
  } catch (err) {
    console.error('Error al registrar el estudiante:', err);
    res.status(500).send('Error del servidor');
  }
};
