const fs = require('fs')
const frisbee = require('../models/Frisbee')
const send = require("../utils/send.utils");
const {validationResult} = require("express-validator");
const {aes256gcm} = require("../utils/crypto.help");

let frisbeeController = {

    get(req, res) {
        frisbee
            .find()
            .exec(function (err, doc) {
                if (!err) {
                    send.sendData(res, doc)
                } else {
                    send.sendError(res, 500, err)
                }
            })
    },

    add(req, res) {
        const errors = validationResult(req)
        if (!errors.isEmpty()) return send.sendError(res, 500, errors)

        const NEW_FRISBEE = new frisbee({
            nom: req.body.nom,
            description: req.body.description,
            puHT: req.body.puht,
            gramme: req.body.gramme,
            ingredients: req.body.ingredients
        })

        NEW_FRISBEE
            .save(function (err, doc) {
                if (!err) {
                    send.sendData(res, doc)
                } else {
                    send.sendError(res, 500, err)
                }
            })
    },

    /**
     * Edit un abonnement
     * @param req
     * @param res
     */
    edit(req, res) {
        frisbee
            .findByIdAndUpdate({_id: req.params.id},
                {$set: req.body},
                {useFindAndModify: false, new: true})
            .exec(function (err, doc) {
                if (!err) {
                    return sendData(req, res, doc)
                } else {
                    return sendError(req, res, 500, err)
                }
            })
    },

    /**
     * Delete une frisbee
     * @param req
     * @param res
     */
    delete(req, res) {
        const id = req.params.id

        frisbee
            .findByIdAndDelete({_id: req.params.id})
            .exec(function (err, doc) {
                if (!err) {
                    return send.sendData(res, doc)
                } else {
                    return send.sendError(res, 500, err)
                }
            })
    }
}

module.exports = frisbeeController
