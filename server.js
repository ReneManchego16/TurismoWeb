const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./src/interfaces/routes'); // Rutas importadas

const app = express();
const port = process.env.PORT || 3002;

// Configura el motor de vistas
app.set('views', path.join(__dirname, 'src/interfaces/views'));
app.set('view engine', 'pug');

app.use(bodyParser.json());

// Ruta para servir archivos estáticos como el video de fondo
app.use(express.static(path.join(__dirname, 'public')));

// Rutas principales
app.use('/', routes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
