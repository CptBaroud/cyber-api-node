const mongo = require("mongoose");
const express = require('express');

//TODO ajouter un loggin solide file + DB

// Ne sert pas encore
// TODO à voir si on l'implemente
const expressJwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const log = require('log-beautify');

// Package de sécurisation
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet')
const cors = require("cors");
const rateLimit = require('express-rate-limit')

// Helpers non utiles (Uniquement en DEV)
const jwt = require('./utils/jwt.utils')

// Génération de la doc
const swaggerUi = require('swagger-ui-express');

// Load the constant from .env file
require('dotenv').config()

// Require logger.js
const WINSTON_LOGGER = require('./utils/log.utlis');

if (process.env.DEV) {
    log.info(jwt.generatedToken())
}

// Mongodb connection
const MONGO_OPTION = process.env.DEV ?
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    } : {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        auth: {
            authSource: 'admin'
        },
        user: process.env.MONGODB_LOGIN,
        password: process.env.MONGODB_PSWD
    }

mongo
    .connect(process.env.MONGODB_LINK, MONGO_OPTION, (err) => {
        if (!err) {
            log.ok('Connexion a mongodb')
        } else {
            console.log(process.env.MONGODB_LINK)
            console.error('App.js')
            log.error(err)
        }
    })

// On doit attendre que le .env soit load
const SQLDB = require("./db/db.sql");

SQLDB.authenticate()
    .then(() => {
        log.ok('Connexion a SQL Server')
    })
    .catch((error) => {
        console.error(error)
        log.error(error)
        WINSTON_LOGGER.error('Erreur de connexion a SQL Server')
        WINSTON_LOGGER.error(error)
    })

const app = express();

// Swagger doc generation
const swaggerDefinition = require('./OpenApiDocumentation')

// Extrait de la doc
// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB or API Gateway, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
// app.set('trust proxy', 1);

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});

//  apply to all requests
app.use(limiter);

// Avoid cross scripting
app.use(cors())
// Setting various HTTP headers
app.use(helmet())
// Prevent from NoSQL injection
app.use(mongoSanitize());
app.use(logger('dev'));
// Limite de taille des fichiers
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: false}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'upload')));

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDefinition));

// On load toutes les routes
const route = require('./routes/index')
const {aes256gcm} = require("./utils/crypto.help");

app.use('/api', route)

module.exports = app;
