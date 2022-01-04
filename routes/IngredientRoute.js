const express = require('express');
const cors = require('cors')
const { body } = require('express-validator');

const router = express.Router();

const ingredientController = require('../controllers/IngredientController')
// Auth middleware
const {isAuthenticated} = require('../middleware/Authentification')

const corsOptions = {
    origin: [process.env.SITE_LINK, process.env.API_LINK],
    optionsSuccessStatus: 200
}

router.get('/', [cors(corsOptions), isAuthenticated], function (req, res) {
    ingredientController.get(req, res)
});

router.post('/',
    body('nom').notEmpty().isString().trim(),
    body('description').notEmpty().isString().trim(),
    body('gramme').notEmpty().isNumeric(),
    [cors(corsOptions), isAuthenticated], function (req, res) {
        ingredientController.add(req, res)
    })

router.put('/:id',
    body('nom').notEmpty().isString().trim(),
    body('description').notEmpty().isString().trim(),
    body('gramme').notEmpty().isNumeric(),
    [cors(corsOptions.options), isAuthenticated], function (req, res) {
    ingredientController.edit(req, res)
})

router.delete('/:id', [cors(corsOptions.options), isAuthenticated], function (req, res) {
    ingredientController.delete(req, res)
})

module.exports = router;
