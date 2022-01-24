const { DataTypes } = require('sequelize');
const db = require('../db');

const Vote = db.define('vote', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
    },
    vote: {
        type: DataTypes.STRING,
        allowNull: false
    },
    comment: {
        type: DataTypes.STRING,
    },
    fName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lName: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = Vote;