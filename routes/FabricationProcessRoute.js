const express = require('express');
const cors = require('cors')
const { body } = require('express-validator');

const router = express.Router();

const fabricationProcessController = require('../controllers/FabricationProcessController')
// Auth middleware
const {isAuthenticated} = require('../middleware/Authentification')

const corsOptions = {
    origin: [process.env.SITE_LINK, process.env.API_LINK],
    optionsSuccessStatus: 200
}

router.get('/', [cors(corsOptions), isAuthenticated], function (req, res) {
    fabricationProcessController.get(req, res)
});

router.post('/',
    body('nom').notEmpty().isString().trim(),
    body('description').notEmpty().isString().trim(),
    body('validationTest').notEmpty().isArray(),
    [cors(corsOptions), isAuthenticated], function (req, res) {
        fabricationProcessController.add(req, res)
    })

router.put('/:id', [cors(corsOptions.options), isAuthenticated], function (req, res) {
    fabricationProcessController.edit(req, res)
})

router.delete('/:id', [cors(corsOptions.options), isAuthenticated], function (req, res) {
    fabricationProcessController.delete(req, res)
})

module.exports = router;
