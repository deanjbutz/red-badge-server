const { DataTypes } = require('sequelize');
const db = require('../db');

const User = db.define('user', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
    },
    fName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false
    }, password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = User;