const express = require('express');
const router = express.Router();
const authController = require('../../controllers/authController');

// Ruta principal
router.get('/', (req, res) => {res.render('index');});
router.get('/login', (req, res) => {res.render('login', { title: 'Inicio de Sesión' });});


// Ruta para manejar el formulario de búsqueda
router.get('/search', (req, res) => {const { location, guests, date } = req.query;
    // Aquí puedes añadir la lógica para manejar la búsqueda
    res.send(`Search results for location: ${location}, guests: ${guests}, date: ${date}`);
});

router.get('/register', authController.getRegister);
router.post('/register', authController.postRegister);

// Ruta para la página de inicio de sesión
router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin)


module.exports = router;
