const mongo = require('mongoose')
    , Schema = mongo.Schema

const FRISBEE_SCHEMA = new Schema({
    nom: String,
    description: String,
    puHT: Number,
    gramme: Number,
    ingredients: [
        {
            type: mongo.ObjectId,
            ref: 'ingredient'
        }
    ]
})

const log = mongo.model('frisbee', FRISBEE_SCHEMA)

module.exports = log
