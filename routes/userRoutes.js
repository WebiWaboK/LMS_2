const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Manejar el formulario de creación de usuarios
router.post('/createUser', userController.createUser);

module.exports = router;
