const fs = require('fs')
const log = require('../models/Log')
const send = require("../utils/send.utils");

let logController = {
    /**
     * @param req
     * @param res
     */
    async get(req, res) {
        log
            .find()
            .exec(function (err, doc) {
                if (!err) {
                    send.sendData(res, doc)
                } else {
                    send.sendError(res, 500, err)
                }
            })
    }
}

module.exports = logController
