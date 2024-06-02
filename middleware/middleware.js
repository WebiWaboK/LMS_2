const bodyParser = require('body-parser');

// Middleware para analizar solicitudes de contenido de tipo application/x-www-form-urlencoded
const urlencodedParser = bodyParser.urlencoded({ extended: true });

module.exports = {
  urlencodedParser,
};
