const express = require('express');
const cors = require('cors')
const router = express.Router();
const {body} = require('express-validator');

const userController = require('../controllers/UserController')
// Auth middleware
const {isAuthenticated} = require('../middleware/Authentification')

const corsOptions = {
    origin: [process.env.SITE_LINK, process.env.API_LINK],
    optionsSuccessStatus: 200
}


// GET
router.get('/', [cors(corsOptions), isAuthenticated], function (req, res) {
    userController.get(req, res)
});

router.get('/:id', [cors(corsOptions), isAuthenticated], function (req, res) {
    userController.getOne(req, res)
});


// PUT
router.put('/:id', [cors(corsOptions), isAuthenticated], function (req, res) {
    userController.edit(req, res)
});

// POST
router.post('/', cors(corsOptions), function (req, res) {
    userController.create(req, res)
})

// DELETE
router.delete('/:id',[cors(corsOptions), isAuthenticated], function (req, res) {
    userController.delete(req, res)
})


module.exports = router;
