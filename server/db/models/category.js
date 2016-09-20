'use strict';
var Sequelize = require('sequelize');

var db = require('../_db');

// KHWA: Maybe in the future, Type could be its own model
module.exports = db.define('category', {
    type: {
        type: Sequelize.STRING,
        allowNull: false
    },
    value: {
        type: Sequelize.STRING,
        allowNull: false
    }
});
