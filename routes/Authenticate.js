const express = require('express');
const cors = require('cors')
const router = express.Router();

const authController = require('../controllers/Authentification')


const corsOptions = {
    origin: [process.env.SITE_LINK, process.env.API_LINK],
    optionsSuccessStatus: 200
}

// POST
router.post('/', [cors(corsOptions)], function (req, res) {
        authController.connection(req, res)
})


module.exports = router;
