const fs = require('fs')
const {validationResult} = require("express-validator");


const fabricationProcess = require('../models/FabricationProcess')
const {sendData, sendError} = require("../utils/send.utils");
const { rsaEncrypt, rsaDecrypt } = require("../utils/crypto.help");
const {encryptObject} = require("../utils/help.utils");

let fabricationProcessController = {

    get(req, res) {
        fabricationProcess
            .find()
            .exec(function (err, doc) {
                if (!err) {
                    doc.map((fabricationProcess) => {
                        // On déchiffre les champs chiffré dans la base de données
                        Object.keys(fabricationProcess._doc).map((item) => {
                            // Si le champ est chiffré on le déchiffre sinon on passe a l'élément suivant
                            fabricationProcess[item] = rsaDecrypt(fabricationProcess[item])
                        })
                    })
                    sendData(res, doc)
                } else {
                    sendError(res, 500, err)
                }
            })
    },

    add(req, res) {
        const errors = validationResult(req)
        if (!errors.isEmpty()) return sendError(res, 500, errors)

        Object.keys(req.body).map((item) => {
            if (item !== 'validationTest') {
                req.body[item] = rsaEncrypt(req.body[item])
            } else if (item === 'validationTest') {
                req.body[item].forEach((vldProcess, i) => {
                    req.body[item][i] = encryptObject(vldProcess)
                })
            }
        })

        const NEW_FABRICATION_PROCESS = new fabricationProcess({
            nom: req.body.nom,
            description: req.body.description,
            validationTest: req.body.validationTest
        })

        NEW_FABRICATION_PROCESS
            .save(function (err, doc) {
                if (!err) {
                    sendData(res, doc)
                } else {
                    sendError(res, 500, err)
                }
            })
    },

    /**
     * Edit un abonnement
     * @param req
     * @param res
     */
    edit(req, res) {
        console.log(typeof req.body)
        // On commence par chiffré le body
        Object.keys(req.body).map((item) => {
            // Si le champ est chiffré on le déchiffre sinon on passe a l'élément suivant
            item !== 'ingredients' ? req.body[item] = rsaEncrypt(req.body[item]) : req.body[item] = req.body[item]
        })

        fabricationProcess
            .findByIdAndUpdate({_id: req.params.id},
                {$set: req.body},
                {useFindAndModify: false, new: true})
            .exec(function (err, doc) {
                if (!err) {
                    return sendData(res, doc)
                } else {
                    return sendError(res, 500, err)
                }
            })
    },

    /**
     * Delete une fabricationProcess
     * @param req
     * @param res
     */
    delete(req, res) {
        const id = req.params.id

        fabricationProcess
            .findByIdAndDelete({_id: req.params.id})
            .exec(function (err, doc) {
                if (!err) {
                    return sendData(res, doc)
                } else {
                    return sendError(res, 500, err)
                }
            })
    }
}

module.exports = fabricationProcessController
