const user = require('../models/User')
const bcrypt = require("bcrypt");
const { sendData, sendError } = require('../utils/send.utils')
const jwt = require('../utils/jwt.utils')
const logger = require('../utils/log.utlis');
const log = require('../models/Log');
const {error} = require("winston");
const {encrypt, decrypt} = require("../utils/crypto.help");

let authentificationController = {

    /**
     * Alors c'est un bordel mais ça fonctionne
     * Cette fonction sert à connecter un utilisateur
     * @param req la requete arricant du front contenant email, pswd
     * @param res la requete sortant vers le frobt
     * @returns {Promise<void>} contenant le token uiliser ensuite pour les appel à l'API
     */
     async connection(req, res) {
         const data = req.body
         const origin = req.query.origin

        // Le problème qu'on rencontre ici c'est que toutes les informations stockées en base de données
        // Sont chiffrées, donc on ne peut pas faire de where on récupère donc toutes les entrées,
        // On ne garde que l'essentiel CAD, mail, pswd et la clée de chiffrement
         const allUsers = await user.findAll({attributes: ['email', 'password', 'encryptedKey'], raw: true})
             .then((users) => {
                 return users
             })
             .catch((error) => {
                 console.log(error)
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
             bcrypt.compare(req.body.password, allUsers[USER_INDEX].password, function (error, result) {
                 if (error) {
                     sendError(req, res, 500, error)
                 } else {
                     if (result) {
                         // Si les infos sont bonnes et qu'on peut connecter l'utilisateur
                         logger.info('User ' + data.email +  ' connected from ' + origin)
                         sendData(req, res, {token : jwt.generatedToken()})
                     } else {
                         logger.error('User ' + data.email + ' tried to connect from ' + origin + ' with incorrect password')
                         sendError(req, res, 500, {
                             message: 'Le mot de passe est incorrect',
                             error: error
                         })
                     }
                 }
             })
         } else {
             sendError(req, res, 500, {
                 message: 'Le mail est incorrect ou n\'est lié à aucuns compte',
                 error: error
             })
              logger.error('User ' + data.email + ') tried to connect from ' + origin + ' with incorrect mail')
          }
     }
}

module.exports = authentificationController
