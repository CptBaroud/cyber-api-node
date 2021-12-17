const mongo = require('mongoose')
    , Schema = mongo.Schema

const FABRICATION_PROCESS_SCHEMA = new Schema({
    nom: String,
    description: String,
    frisbee: {
        type: mongo.ObjectId,
        ref: 'frisbe'
    },
    validationTest: [
        {
            etape: String,
            description: String
        }
    ]
})

const log = mongo.model('fabricationProcess', FABRICATION_PROCESS_SCHEMA)

module.exports = log
