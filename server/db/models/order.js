'use strict';
var Sequelize = require('sequelize');
var db = require('../_db');

//consider required, allowNull, and default values -- KHWA

module.exports = db.define('order', { 
  status: {
    type: Sequelize.STRING //consider enum -- KHWA
  }
})
