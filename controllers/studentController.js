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
  res.render('menu');
};

