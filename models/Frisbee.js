const mongo = require('mongoose')
    , Schema = mongo.Schema

const FRISBEE_SCHEMA = new Schema({
    nom: String,
    description: String,
    gamme: String,
    puHT: String,
    gramme: String,
    ingredients: [
        {
            type: mongo.ObjectId,
            ref: 'ingredient'
        }
    ]
})

const frisbee = mongo.model('frisbee', FRISBEE_SCHEMA)

module.exports = frisbee
