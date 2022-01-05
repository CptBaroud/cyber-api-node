const mongo = require('mongoose')
    , Schema = mongo.Schema


// On peut av
const ban_schema = new Schema({
    origin: String, // Peut etre l'ip, l'adresse mail ou l'identifiant
    type: Number, // Différencie les ip des mails
    duration: Number,
    isBan: {
        type: Boolean,
        default: false
    },
    banUntil: {
        type: Date,
        required: false
    },
    banCount: Number, // Date jsuqu'a laquelle il est ban
    tentativeCount: Number // Nombre de tentative Pour l'instant si dépasse 5 on ban dans le cas d'un user (mail ou id)
})

const ban = mongo.model('bans', ban_schema)

module.exports = ban
