const {createLogger, format, transports} = require('winston');
require('winston-mongodb');
require('dotenv').config()

// Mongodb connection
const MONGO_OPTION = process.env.DEV ?
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    } : {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        auth: {
            authSource: 'admin'
        },
        user: process.env.MONGODB_LOGIN,
        password: process.env.MONGODB_PSWD
    }

const customLevels = {
    levels: {
        actions: 1,
        error: 3,
        info: 6
    },
    colors: {
        actions: 'yellow',
        error: 'red',
        info: 'blue'
    }
}


module.exports = createLogger({
    levels: customLevels.levels,
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

        new transports.File({
            level: 'actions',
            filename: 'logs/actions.log',
            format: format.combine(
                format.timestamp({format: 'MMM-DD-YYYY HH:mm:ss'}),
                format.align(),
                format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`),
            )
        }),

        // MongoDB transport
        new transports.MongoDB({
            level: 'info',
            //mongo database connection link & options depend on the context
            db: process.env.MONGODB_WINSTON_LINK,
            options: MONGO_OPTION,
            // A collection to save json formatted logs
            collection: 'logs',
            format: format.combine(
                format.timestamp(),
                format.metadata({ fillExcept: ['message', 'level', 'timestamp', 'label', 'stack'] }),
                // Convert logs to a json format
                format.json())
        }),

        // Log des actiosn sur l'application
        // Ici on log dans la base du client
        new transports.MongoDB({
            level: 'actions',
            //mongo database connection link & options depend on the context
            db: process.env.MONGODB_WINSTON_LINK,
            options: MONGO_OPTION,
            // A collection to save json formatted logs
            collection: 'logs',
            format: format.combine(
                format.timestamp(),
                format.metadata({ fillExcept: ['message', 'level', 'timestamp', 'label', 'stack'] }),
                // Convert logs to a json format
                format.json())
        }),

        new transports.MongoDB({
            level: 'error',
            //mongo database connection link & options depend on the context
            db: process.env.MONGODB_WINSTON_LINK,
            options: MONGO_OPTION,
            format: format.combine(
                format.timestamp(),
                format.metadata({ fillExcept: ['message', 'level', 'timestamp', 'label'] }),
                // Convert logs to a json format
                format.json())
        })]
});
