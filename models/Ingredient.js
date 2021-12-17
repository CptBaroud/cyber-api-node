const mongo = require('mongoose')
    , Schema = mongo.Schema

const INGREDIENT_SCHEMA = new Schema({
    nom: String,
    description: String,
    gramme: Number
})

const log = mongo.model('ingredient', INGREDIENT_SCHEMA)

module.exports = log
