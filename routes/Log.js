const express = require('express');
const cors = require('cors')
const router = express.Router();

const logController = require('../controllers/Log')
// Auth middleware
const {isAuthenticated} = require('../middleware/Authentification')

const corsOptions = {
    origin: [process.env.SITE_LINK, process.env.API_LINK],
    optionsSuccessStatus: 200
}

router.get('/', [cors(corsOptions), isAuthenticated], function (req, res) {
    logController.get(req, res)
});

module.exports = router;
