const mongo = require('mongoose')
    , Schema = mongo.Schema

const log_schema = new Schema({
    type: String,
    message: String,
    timestamp: Date
})

const log = mongo.model('Log', log_schema)

module.exports = log
