const jwt = require('jsonwebtoken')
const fs = require("fs");

/**
 * Middleware verifiant la validité d'un token
 * @param req - la requete envoyée
 * @param res - la reponse à envoyé
 * @param next - la fonction suivante
 * @returns {this} - soit un 404 ou laisse l'API continuer
 */
function isAuthenticated(req, res, next) {
    const token = getToken(req, res)
    const PUBLIC_KEY = fs.readFileSync('publickey.crt')
    // On verifie la validité du token
    jwt.verify(token, PUBLIC_KEY, (err) => {
        // Si la verification échoue on renvoie un 404
        // Et on print dans la console le message d'erreurs
        if (err) {
            return res.status(404).send({
                message: 'Invalid Token',
                error: err,
                stack: err.stack
            })
        }
        // Si on ne rencontre aucune erreur on passe à la fonction suivante
        next()
    })
}

function getToken (req, res) {
    //On check si il y a un token
    if (!req.headers.authorization) return res.status(404).json({
        message: 'Missing Token',
        error: 'Token not found or null'
    })

    // On recupere le token dans les headers
    // Et on vire le prefix bearer
    const token = req.headers.authorization.replace('Bearer ', '')

    // Si le token est null on renvoit une erreur 404
    if (!token) return res.status(404).json({
        message: 'Missing Token',
        error: 'Token not found or null'
    })
    return token
}

module.exports = { isAuthenticated }
