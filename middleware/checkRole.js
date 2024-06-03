const checkRole = (role) => (req, res, next) => {
  if (req.session && req.session.user && req.session.user.role === role) {
    next();
  } else {
    // Redirigir al inicio de sesión correspondiente según el rol
    if (role === 'teacher') {
      res.redirect('/teacherLogin');
    } else if (role === 'student') {
      res.redirect('/studentLogin');
    } else {
      // Si el rol no está definido o es incorrecto, redirigir a una página de error
      res.status(403).send('Forbidden');
    }
  }
};

module.exports = checkRole;
