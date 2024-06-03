const checkRole = (req, res, next) => {
  // Verificar si el usuario no está autenticado
  if (!req.session.user) {
    // Redirigir al inicio de sesión
    if (req.originalUrl.includes('/studentLogin')) {
      return res.redirect('/studentLogin');
    } else {
      return res.redirect('/teacherLogin');
    }
  }
  
  // Si el usuario está autenticado, continuar con la siguiente función de middleware
  next();
};

module.exports = checkRole;
