require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const jwt = require('jsonwebtoken');

app.use(cors());
app.use(bodyParser.json());

app.post('/generate-token', (req, res) => {
  const captchaResponse = req.body.captchaResponse;
  validateCaptcha(captchaResponse, isValid => {
    if (isValid) {
      const payload = {
        name: "Vincent",
        scopes: ["download"]
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } else {
      res.status(400).send("CAPTCHA invalide.");
    }
  });
});

function validateCaptcha(captchaResponse, callback) {
  callback(true);
}

function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    jwt.verify(bearerToken, process.env.JWT_SECRET, (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        req.authData = authData;
        next();
      }
    });
  } else {
    res.sendStatus(403);
  }
}

app.get('/download', verifyToken, (req, res) => {
  const filePath = path.join(__dirname, 'Sairen.jpeg');
  res.download(filePath, (err) => {
    if (err) {
      res.status(404).send("Désolé, le fichier n'a pas été trouvé.");
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Le serveur tourne sur le port ${PORT}`);
});
