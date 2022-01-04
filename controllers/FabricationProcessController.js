const fs = require('fs')
const {validationResult} = require("express-validator");

const EXCLUSION_ARRAY = ['_id', 'frisbee', 'validationTest']

const fabricationProcess = require('../models/FabricationProcess')
const { sendData,  sendError } = require("../utils/send.utils");
const { rsaEncrypt, rsaDecrypt } = require("../utils/crypto.help");
const { encryptObject, decryptObject } = require("../utils/help.utils");

let fabricationProcessController = {

    /**
     * Remarque générale, ici à chaque chiffrement / déchiffrement je copie colle
     * et modifie en fonction de ce qu'on va faire et de ce dont j'ai besoin sur le moment
     *
     * Mais il serait plus judicieux de faire une fonction qui prend en compte tout les paramètres et cas possibles
     * Par example une fonction recursive qui parcourt le tableau et haut en bas (ex : [0 [1 [2] 1] 0])
     * Puis qui a chaque appel traite tout les éléments (Objet, string ...)
     * A toi de voir gurvan.
     *
     * Btw meme remarque pour le chiffrement meme si la fonction n'intervient que deux fois (add et edit)
     */

    /**
     * C'est là qu'on récupère les datas
     * Spoiler c'est un bordel
     * @param req
     * @param res
     */
    get(req, res) {
        fabricationProcess
            // On récupère tout les documents présent dans la collecion
            .find()
            // On remplis le champ frisbee en récupérant le document correspondant
            .populate('frisbee')
            .exec(function (err, doc) {
                if (!err) {
                    // On va décrypter chaque documents renvoyés
                    doc.map((fabricationProcess) => {
                        // Pour chaque entrées dans le document
                        Object.keys(fabricationProcess._doc).map((key) => {
                            // Si c'est un champ classique qu'on veut déchiffrer
                            // on le déchiffre normalement
                            if (!EXCLUSION_ARRAY.includes(key)) {
                                fabricationProcess[key] = rsaDecrypt(fabricationProcess[key])
                                // Dans le cas de vadlidationTest on fait face à un tableau
                                // D'objets chiffrés on déchiffre donc la chaque objets présent dans
                                // le tableau
                                // Attention à bien récuperer le document et nn l'objet de mongoose
                            } else if (key === 'validationTest') {
                                fabricationProcess[key].forEach((vldProcess, i) => {
                                    fabricationProcess[key][i] = decryptObject(vldProcess._doc, ['_id'])
                                })
                                // Encore un fois on fait face à un cas particulier, chaque FP est lié
                                // à un frisbee qui lui aussi est chiffré on dechiffre donc le document
                                // Attention à bien récuperer le document et nn l'objet de mongoose
                            } else if (key === 'frisbee') {
                                fabricationProcess[key] = decryptObject(fabricationProcess[key]._doc, ['_id'])
                            }
                        })
                    })
                    return sendData(req, res, doc)
                } else {
                    return sendError(req, res, 500, err)
                }
            })
    },

    add(req, res) {
        const errors = validationResult(req)
        if (!errors.isEmpty()) return sendError(req, res, 500, errors)

        Object.keys(req.body).map((item) => {
            if (!EXCLUSION_ARRAY.includes(item)) {
                req.body[item] = rsaEncrypt(req.body[item])
            } else if (item === 'validationTest') {
                req.body[item].forEach((vldProcess, i) => {
                    req.body[item][i] = encryptObject(vldProcess)
                })
            }
        })

        const NEW_FABRICATION_PROCESS = new fabricationProcess({
            nom: req.body.nom,
            frisbee: req.body.frisbee,
            description: req.body.description,
            validationTest: req.body.validationTest
        })

        NEW_FABRICATION_PROCESS
            .save(function (err, doc) {
                if (!err) {
                    sendData(req, res, doc)
                } else {
                    sendError(res, 500, err)
                }
            })
    },

    /**
     * Edit un FP
     * @param req
     * @param res
     */
    edit(req, res) {
        const errors = validationResult(req)
        if (!errors.isEmpty()) return sendError(req, res, 500, errors)

        Object.keys(req.body).map((item) => {
            if (item !== 'validationTest') {
                req.body[item] = rsaEncrypt(req.body[item])
            } else if (item === 'validationTest') {
                req.body[item].forEach((vldProcess, i) => {
                    req.body[item][i] = encryptObject(vldProcess, ['_id'])
                })
            }
        })

        fabricationProcess
            .findByIdAndUpdate({_id: req.params.id},
                {$set: req.body},
                {useFindAndModify: false, new: true})
            .exec(function (err, doc) {
                if (!err) {
                    return sendData(req, res, doc)
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
                    return sendData(req, res, doc)
                } else {
                    return sendError(res, 500, err)
                }
            })
    }
}

module.exports = fabricationProcessController
