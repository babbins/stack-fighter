'use strict';
var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('review', {
    rating: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 5
        }
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    }
})
