// controllers/logoutController.js

exports.logout = (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).send('Error al cerrar sesión');
      }
      res.redirect('/');
    });
  };
  