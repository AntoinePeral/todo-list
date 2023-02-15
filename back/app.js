
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const multer = require('multer');
const router = require('./app/router');
const errors = require ('./app/modules/errors')

const app = express();
const port = process.env.PORT;

// on précise à notre app qu'on va recevoir du JSON
app.use(express.json());

// On autorise tout le monde sur notre API
app.use(cors());
// On demande à Express d'extraire les données des requêtes POST
app.use(express.urlencoded({ extended: true }));

// On demande à Express d'extraire les données des requêtes POST formatées en multipart
const mutipartParser = multer();
// On utlise .none() pour dire qu'on attend pas de fichier, uniquement des inputs "classiques" !
app.use(mutipartParser.none());

app.use(router);

app.use(errors.error404)

app.listen(port, () => {
  console.log(`API demarrée sur http://localhost:${port}`);
});
