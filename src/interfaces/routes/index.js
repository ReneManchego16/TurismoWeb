const express = require('express');
const router = express.Router();

// Ruta principal
router.get('/', (req, res) => {
    res.render('index');
});

// Ruta para manejar el formulario de búsqueda
router.get('/search', (req, res) => {
    const { location, guests, date } = req.query;
    // Aquí puedes añadir la lógica para manejar la búsqueda
    res.send(`Search results for location: ${location}, guests: ${guests}, date: ${date}`);
});

module.exports = router;
