const checkRole = (role) => (req, res, next) => {
    if (req.session.user && req.session.user.role === role) {
      next();
    } else {
      res.redirect('/teacherLogin');
    }
  };
  
  module.exports = checkRole;
