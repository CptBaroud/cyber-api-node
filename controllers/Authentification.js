const user = require('../models/User')
const bcrypt = require("bcrypt");
const send = require('../utils/send.utils')
const jwt = require('../utils/jwt.utils')
const logger = require('../utils/log.utlis');
const log = require('../models/Log');

let authentificationController = {

    async connection(req, res) {
        const data = req.body
        const origin = req.query.origin
        const userTemp = await user.findOne({where: {email: data.email}})

        if (userTemp) {
            bcrypt.compare(req.body.password, userTemp.password, function (error, result) {
                if (error) {
                    send.sendError(res, 500, error)
                } else {
                    if (result) {
                        logger.info('User ' + userTemp.email + ' (role:' + userTemp.role + ') connected from ' + origin)
                        send.sendData(res, {token : jwt.generatedToken()})
                    } else {
                        logger.error('User ' + userTemp.email + ' (role:' + userTemp.role + ') tried to connect from ' + origin + ' with incorrect password')
                        res.status(401).json({
                            message: 'Le mot de passe est incorrect',
                            error: error
                        })
                    }
                }
            })
        } else {
            res.status(401).json({
                message: 'Le mail est incorrect'
            })
            logger.error('User ' + data.email + ') tried to connect from ' + origin + ' with incorrect mail')
        }
    }
}

module.exports = authentificationController
