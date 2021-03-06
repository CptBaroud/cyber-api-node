const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const rand = require('csprng')
const {validationResult} = require("express-validator");

const user = require('../models/User')
const { sendData,  sendError } = require("../utils/send.utils");
const jwt_utils = require('../utils/jwt.utils')
const { encrypt, decrypt } = require('../utils/crypto.help')
const ban = require("../controllers/BanController");

const SALT_ROUND = 10
const USER_ENCRYPTED_FIELDS = ['firstName', 'lastName', 'email']

let userController = {

    get(req, res) {
        user
            .findAll()
            .then(users => {
                // On parcourt la liste de tout nos utilisateurs
                users.forEach((user) => {
                    //Si on arrive pas à récupérer la clé chiffré de chiffrement on renvoie une erreur
                    if (!user.encryptedKey) return send.sendError(res, 500, 'Key not found')

                    // On déchiffre la clé à l'aide du mot de passe
                    const decryptedKey = decrypt(user.encryptedKey, user.password)
                    // On déchiffre les champs chiffré dans la base de données
                    Object.keys(user.dataValues).map((item) => {
                        // Si le champ est chiffré on le déchiffre sinon on passe a l'élément suivant
                        USER_ENCRYPTED_FIELDS.includes(item) ? user[item] = decrypt(user[item], decryptedKey) : null
                    })
                })
                // On renvoi les utilisateurs
                sendData(req, res, users)
            })
            .catch(err => {
                sendError(req, res, 500, err)
            })
    },

    getOne (req, res) {
        const id = req.params.id

        user
            .findOne({ where: {id: id} })
            .then(user => {
                //Si on arrive pas à récupérer la clé chiffré de chiffrement on renvoie une erreur
                if (!user.encryptedKey) return send.sendError(res, 500, 'Key not found')

                // On déchiffre la clé à l'aide du mot de passe
                const decryptedKey = decrypt(user.encryptedKey, user.password)
                // On déchiffre les champs chiffré dans la base de données
                Object.keys(user.dataValues).map((item) => {
                    // Si le champ est chiffré on le déchiffre sinon on passe a l'élément suivant
                    USER_ENCRYPTED_FIELDS.includes(item) ? user[item] = decrypt(user[item], decryptedKey) : null
                })
                // On renvoi les utilisateurs
                sendData(req, res, user)
            })
            .catch(err => {
                sendError(req, res, 500, err)
            })
    },

    async create(req, res) {
        const errors = validationResult(req)
        if (!errors.isEmpty()) return sendError(res, 500, errors)

        // Le problème qu'on rencontre ici c'est que toutes les informations stockées en base de données
        // Sont chiffrées, donc on ne peut pas faire de where on récupère donc toutes les entrées,
        // On ne garde que l'essentiel CAD, mail, pswd et la clée de chiffrement
        const allUsers = await user.findAll({attributes: ['email', 'password', 'encryptedKey'], raw: true})
            .then((users) => {
                return users
            })
            .catch((error) => {
                return sendError(req, res, 500, error)
            })

        // On dechiffre les mails afin de pouvoir chercher celui qui essaye de se connecter
        allUsers.forEach((user) => {
            // On déchiffre la clée récupérée en base de données
            const decryptedKey = decrypt(user.encryptedKey, user.password)
            // On déchiffre uniquement le mail
            user['email'] = decrypt(user['email'], decryptedKey)
        })

        // On cherche le mail de celui qui se connecte, on cherche à récupérer l'index dans le tableau
        const USER_INDEX = allUsers.findIndex((item) => {
            return item.email === req.body.email
        })

        if (USER_INDEX !== -1) {
            return sendError(req, res, 409, {message: 'This email is already used'})
        }

        const KEY_1 = rand(256, 36)

        const NEW_USER = {
            id: null,
            firstName: encrypt(req.body.firstName, KEY_1),
            lastName: encrypt(req.body.lastName, KEY_1),
            email: encrypt(req.body.email, KEY_1),
            password: req.body.password
        }

        // On hash le mot de passe
        bcrypt.genSalt(SALT_ROUND, function (err, salt) {
            if (err) {
                sendError(req, res, 500, err)
            } else {
                bcrypt.hash(NEW_USER.password, salt, function (err, pswd) {
                    if (err) {
                        sendError(req, res, 500, err)
                    } else {
                        NEW_USER.encryptedKey = encrypt(KEY_1, pswd)
                        NEW_USER.password = pswd
                        user
                            .create(NEW_USER)
                            .then(user => {
                                sendData(req, res, user)
                            })
                            .catch(err => {
                                sendError(req, res, 500, err)
                            })
                    }
                })
            }
        })
    },

    async delete(req, res) {
        const id = req.params.id
        let userTemp = await userController.findOne({where: {id: id}})

        user
            .destroy()
            .then(doc => {
                sendData(req, res, doc)
            })
            .catch(error => {
                sendError(req, res, 500, error)
            })
    },

    async edit(req, res) {
        const id = req.params.id
        let userTemp = await userController.findOne({where: {id: id}})

        Object.entries(req.body).forEach(([key, item])=> {
            userTemp[key] = item
        })

        userTemp
            .save()
            .then(doc => {
                sendData(req, res, doc)
            })
            .catch(error => {
                sendError(req, res, 500, error)
            })
    }
}

module.exports = userController
