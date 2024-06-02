const db = require('../config/db').pool;

exports.showCreateModuleForm = (req, res) => {
  if (!req.session.user || req.session.user.role !== 'teacher') {
    return res.redirect('/teacherLogin');
  }
  res.render('createModule');
};

exports.createModule = async (req, res) => {
  try {
    const { moduleName, description } = req.body;

    const [result] = await db.execute(
      'INSERT INTO modules (name, description) VALUES (?, ?)',
      [moduleName, description]
    );

    if (!result || result.affectedRows !== 1) {
      console.log('Error al crear el módulo');
      return res.status(500).send('Error al crear el módulo');
    }

    return res.redirect('/menu');
  } catch (err) {
    console.error('Error al crear el módulo:', err);
    return res.status(500).send('Error del servidor');
  }
};
