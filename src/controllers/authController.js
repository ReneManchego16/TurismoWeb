const path = require('path');
const fs = require('fs');
const multer = require('multer');
const bcrypt = require('bcrypt');
const usersFilePath = path.join(__dirname, '..', 'data', 'users.json');

// Configuración de multer para el manejo de archivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, '..', 'public', 'uploads');
    fs.mkdirSync(uploadDir, { recursive: true }); // Crear el directorio si no existe
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

exports.getRegister = (req, res) => {
  res.render('register');
};

exports.postRegister = [
  upload.single('avatar'),
  async (req, res) => {
    try {
      const { name, email, password, travelerType } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = {
        name,
        email,
        password: hashedPassword,
        travelerType,
        avatar: req.file ? `/uploads/${req.file.filename}` : null
      };

      let users = [];
      if (fs.existsSync(usersFilePath)) {
        users = JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));
      }

      users.push(newUser);
      fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));

      res.redirect('/login');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al registrar el usuario');
    }
  }
];

exports.getLogin = (req, res) => {
  res.render('login', { title: 'Inicio de Sesión' });
};

exports.postLogin = (req, res) => {
  const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));

  const email = req.body.email;
  const password = req.body.password;

  const user = users.find(user => user.email === email && user.password === password);

  if (user) {
      res.send('Inicio de sesión exitoso');
  } else {
      res.send('Credenciales incorrectas');
  }
};