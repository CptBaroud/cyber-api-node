const fs = require('fs')
const {validationResult} = require("express-validator");

const EXCLUSION_ARRAY = ['_id', 'ingredients', '__v']

const frisbee = require('../models/Frisbee')
const {sendData,  sendError}  = require("../utils/send.utils");
const { rsaEncrypt, rsaDecrypt } = require("../utils/crypto.help");
const {decryptObject} = require("../utils/help.utils");

let frisbeeController = {

    get(req, res) {
        frisbee
            .find()
            .populate('ingredients')
            .exec(function (err, doc) {
                if (!err) {
                    doc.map((frisbee) => {
                        // On déchiffre les champs chiffré dans la base de données
                        Object.keys(frisbee._doc).map((key, i) => {
                            if (!EXCLUSION_ARRAY.includes(key)) {
                                // Si le champ est chiffré on le déchiffre sinon on passe a l'élément suivant
                                frisbee[key] = rsaDecrypt(frisbee[key])
                            } else if (key === 'ingredients') {
                                frisbee[key].forEach((ingredient, i) => {
                                    frisbee[key][i] = decryptObject(ingredient._doc, ['_id'])
                                })
                            }
                        })
                    })
                    sendData(req, res, doc)
                } else {
                    sendError(req, res, 500, err)
                }
            })
    },

    add(req, res) {
        const errors = validationResult(req)
        if (!errors.isEmpty()) return sendError(req, res, 500, errors)

        const NEW_FRISBEE = new frisbee({
            nom: rsaEncrypt(req.body.nom),
            description: rsaEncrypt(req.body.description),
            puHT: rsaEncrypt(req.body.puht),
            gramme: rsaEncrypt(req.body.gramme),
            gamme: rsaEncrypt(req.body.gamme),
            ingredients: req.body.ingredients
        })

        NEW_FRISBEE
            .save(function (err, doc) {
                if (!err) {
                    sendData(req, res, doc)
                } else {
                    sendError(req, res, 500, err)
                }
            })
    },

    /**
     * Edit un abonnement
     * @param req
     * @param res
     */
    edit(req, res) {
        const errors = validationResult(req)
        if (!errors.isEmpty()) return sendError(req, res, 500, errors)
         
        // On commence par chiffré le body
        Object.keys(req.body).map((item) => {
            // Si le champ est chiffré on le déchiffre sinon on passe a l'élément suivant
            item !== 'ingredients' ? req.body[item] = rsaEncrypt(req.body[item]) : req.body[item] = req.body[item]
        })

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
                    return sendData(req, res, doc)
                } else {
                    return sendError(req, res, 500, err)
                }
            })
    }
}

module.exports = frisbeeController
