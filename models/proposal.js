const { DataTypes } = require('sequelize');
const db = require('../db');

const Proposal = db.define('proposal', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ticker1: {
        type: DataTypes.STRING,
        allowNull: false
    },
    quantity1: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    value1: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    ticker2: {
        type: DataTypes.STRING,
    },
    quantity2: {
        type: DataTypes.INTEGER,
    },
    value2: {
        type: DataTypes.DECIMAL(10,2),
    },
    ticker3: {
        type: DataTypes.STRING,
    },
    quantity3: {
        type: DataTypes.INTEGER,
    },
    value3: {
        type: DataTypes.DECIMAL(10,2),
    }
});

module.exports = Proposal;