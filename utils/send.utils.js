const jwt = require('jsonwebtoken')
const logger = require('./log.utlis')

let send = {
    sendData (req, res, data) {
        // On récupere l'origine de la requete
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress

        if (data) {
            if (req.method !== 'GET') {
                const tokenInfo = req.headers.authorization ? jwt.decode(req.headers.authorization) : {mail: ''}
                // On recupère l'objet de la requete -> le type
                // ex : Ingredients
                const object = req.baseUrl.replace('/api/', '')

                logger.actions({
                    message: tokenInfo.mail + ' à ' + getActionVerb(req.method) + ' un ' + getObjectName(object),
                    id: req.params.id ? req.params.id : req.body._id,
                    type: getActionType(req.method),
                    objet: req.baseUrl.replace('/api/', ''),
                    originalUrl: req.originalUrl,
                    body: req.body,
                    ip: ip,
                    user: tokenInfo.mail,
                })
            }
            res.status(200).send(data)
        } else {
            // On enregistre l'erreur dans la base de log
            logger.error({
                message: 'Une erreur est survenue lors de l\'envois des données',
                baseURL: req.baseUrl,
                method : req.method,
                body: req.body,
                path: req.path,
                code: 404,
                // Ne peut etre nul dans la mesure ou on le check dans le middleware
                token: jwt.decode(req.headers.authorization),
                error: 'No data'
            })
            // et on renvoie un 404
            send404(req, res)
        }
    },

    sendError (req, res, code, error) {
        res.status(code).json({
            message: 'Internal Server Error',
            error: error,
            stack: error.stack ? error.stack : null
        })
    }
}

module.exports = send

function send404 (req, res) {
    const payload = {
        message: 'Not found'
    }
    res.status(404).json(payload)
}

function getActionType (item) {
    switch (item) {
        case 'PUT':
            return 'Edition'
        case 'DELETE':
            return 'Supression'
        case 'POST':
            return 'Ajout'
        default:
            return item
    }
}

function getActionVerb (item) {
    switch (item) {
        case 'PUT':
            return 'éditer'
        case 'DELETE':
            return 'supprimé'
        case 'POST':
            return 'ajouté'
        default:
            return item
    }
}

function getObjectName (item) {
    switch (item) {
        case 'comment':
            return 'commentaire'
        case 'knowledge':
            return 'element de base de connaissance'
        case 'subscription':
            return 'abonnement'
        case 'delivery':
            return 'livraison'
        case 'template':
            return 'modèle de base de connaissance'
        case 'attachment':
            return 'pièce jointe'
        default:
            return item
    }
}
