const {error} = require("winston");
const bcrypt = require("bcrypt");

const user = require('../models/User')
const ban = require('../controllers/BanController')

const {sendData, sendError} = require('../utils/send.utils')
const jwt = require('../utils/jwt.utils')
const {decrypt} = require("../utils/crypto.help");

let authentificationController = {
    /**
     * Alors c'est un bordel mais ça fonctionne
     * Cette fonction sert à connecter un utilisateur
     * @param req la requete arricant du front contenant email, pswd
     * @param res la requete sortant vers le frobt
     * @returns {Promise<void>} contenant le token uiliser ensuite pour les appel à l'API
     */
    async connection(req, res) {
        let userTmp
        let banDate
        // Options pour le display des dates
        const dateOption = {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }

        const data = req.body
        const origin = req.headers['x-forwarded-for'] || req.socket.remoteAddress

        // Le problème qu'on rencontre ici c'est que toutes les informations stockées en base de données
        // Sont chiffrées, donc on ne peut pas faire de where on récupère donc toutes les entrées,
        // On ne garde que l'essentiel CAD, mail, pswd et la clée de chiffrement
        const allUsers = await user.findAll({attributes: ['email', 'password', 'encryptedKey'], raw: true})
            .then((users) => {
                return users
            })
            .catch((error) => {
                ban.incTentativeCount(req, res, origin)
                ban.incTentativeCount(req, res, data.mail)
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
            return item.email === data.email
        })
        // Si on à trouvé l'élément dans le tableau on continue le process de connection
        if (USER_INDEX !== -1) {
            // On verifie que l'adresse mail ne soie pas ban
           ban.getItem(data.email)
                .then(async (item) => {
                    // Si notre utilsateur est ban
                    if (item && item.isBan) {
                        banDate = item.banUntil
                        // Si il n'est plus ban on continue le process
                        if (new Date(item.banUntil) <= new Date()) {
                            userTmp = await ban.unban(data.email)
                        } else {
                            // Sinon on renvoie une erreur
                            await ban.incTentativeCount(req, res, origin)
                            return sendError(req, res, 401, {message: 'User is banned'}, "Vous êtes ban jusqu'au " + new Date(item.banUntil).toLocaleDateString('fr-FR', dateOption))
                        }
                    }
                })
                .catch((e) => {
                    return sendError(req, res, 500, e)
                })

            bcrypt.compare(req.body.password, allUsers[USER_INDEX].password, function (error, result) {
                if (error) {
                    ban.incTentativeCount(req, res, origin)
                    ban.incTentativeCount(req, res, data.mail)
                    return sendError(req, res, 500, error)
                } else {
                    if (result) {
                        // Si les infos sont bonnes et qu'on peut connecter l'utilisateur
                        return sendData(req, res, {token: jwt.generatedToken(data.email)})
                    } else {
                        ban.incTentativeCount(req, res, origin)
                        ban.incTentativeCount(req, res, data.email)
                        return sendError(req, res, 500, {
                            message: 'Le mot de passe est incorrect',
                            error: error
                        })
                    }
                }
            })
        } else {
            await ban.incTentativeCount(req, res, origin)
            await ban.incTentativeCount(req, res, req.body.mail)
            return sendError(req, res, 500, {
                message: 'Le mail est incorrect ou n\'est lié à aucuns compte',
                error: error
            })
        }
    }
}

module.exports = authentificationController
