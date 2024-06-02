const express = require('express');
const router = express.Router();
const checkRole = require('../middlewares/checkRole');

// Rutas accesibles solo para maestros
router.get('/create-task', checkRole('teacher'), (req, res) => {
  res.render('createTask');
});

// Rutas accesibles para todos
router.get('/menu', (req, res) => {
  res.render('menu', { role: req.session.user.role });
});

module.exports = router;