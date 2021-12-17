const {Sequelize, DataTypes} = require('sequelize');
const sequelize = require('../db/db.sql')

const User = sequelize.define('User', {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        notEmpty: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    encryptedKey: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = User
