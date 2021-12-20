const {createLogger, format, transports} = require('winston');
require('winston-mongodb');
require('dotenv').config()

// Mongodb connection
const MONGO_OPTION = process.env.DEV ?
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    } : {
        auth: {
            authSource: 'admin'
        },
        user: process.env.MONGODB_LOGIN,
        password: process.env.MONGODB_PSWD
    }


module.exports = createLogger({
    transports: [
        // File transport
        new transports.File({
            filename: 'logs/server.log',
            format: format.combine(
                format.timestamp({format: 'MMM-DD-YYYY HH:mm:ss'}),
                format.align(),
                format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`),
            )
        }),

        // MongoDB transport
        new transports.MongoDB({
            level: 'info',
            //mongo database connection link
            db: process.env.MONGODB_WINSTON_LINK,
            options: MONGO_OPTION,
            // A collection to save json formatted logs
            collection: 'logs',
            format: format.combine(
                format.timestamp(),
                // Convert logs to a json format
                format.json())
        })]
});
