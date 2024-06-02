const bodyParser = require('body-parser');

// Middleware para analizar solicitudes de contenido de tipo application/x-www-form-urlencoded
const urlencodedParser = bodyParser.urlencoded({ extended: true });

const checkRole = (role) => (req, res, next) => {
    if (req.session.user && req.session.user.role === role) {
      next();
    } else {
      res.status(403).send('Acceso denegado');
    }
  };
  
  module.exports = checkRole;
  

module.exports = {
  urlencodedParser
};

