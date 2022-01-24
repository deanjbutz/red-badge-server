const { DataTypes } = require('sequelize');
const db = require('../db');

const Asset = db.define('asset', {
    asset: {
        type: DataTypes.STRING,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
    },
    value: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    datePurchased: {
        type: DataTypes.DATEONLY
    },
    dateSold: {
        type: DataTypes.DATEONLY
    }
});

module.exports = Asset;