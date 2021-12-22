const fs = require('fs')
const {validationResult} = require("express-validator");


const ingredient = require('../models/Ingredient')
const {sendData, sendError} = require("../utils/send.utils");
const { rsaEncrypt, rsaDecrypt } = require("../utils/crypto.help");

let ingredientController = {

    get(req, res) {
        ingredient
            .find()
            .exec(function (err, doc) {
                if (!err) {
                    doc.map((ingredient) => {
                        // On déchiffre les champs chiffré dans la base de données
                        Object.keys(ingredient._doc).map((item) => {
                            // Si le champ est chiffré on le déchiffre sinon on passe a l'élément suivant
                            ingredient[item] = rsaDecrypt(ingredient[item])
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

        const NEW_INGREDIENT = new ingredient({
            nom: rsaEncrypt(req.body.nom),
            description: rsaEncrypt(req.body.description),
            gramme: rsaEncrypt(req.body.gramme)
        })

        NEW_INGREDIENT
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

        ingredient
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
     * Delete une ingredient
     * @param req
     * @param res
     */
    delete(req, res) {
        const id = req.params.id

        ingredient
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

module.exports = ingredientController
