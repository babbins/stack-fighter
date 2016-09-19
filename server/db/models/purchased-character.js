'use strict';
var Sequelize = require('sequelize');
var db = require('../_db');

module.exports = db.define('purchasedCharacter', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  //url to image
  portrait: {
    type: Sequelize.STRING
    //defaultValue: urlForPlaceHOlder
  },
  idleSprite: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.TEXT
  },
  price: {
    type: Sequelize.STRING,
    validate: {
      is: /^[0-9]+(\.[0-9]{2})?$/i
    },
    allowNull: false
  },
  strength: {
    type: Sequelize.INTEGER,
    defaultValue: 5,
    validate: {
      max: 10,
      min: 0
    }
  },
  intelligence: {
    type: Sequelize.INTEGER,
    defaultValue: 5,
    validate: {
      max: 10,
      min: 0
    }
  },
  speed: {
    type: Sequelize.INTEGER,
    defaultValue: 5,
    validate: {
      max: 10,
      min: 0
    }
  },
  luck: {
    type: Sequelize.INTEGER,
    defaultValue: 5,
    validate: {
      max: 10,
      min: 0
    }
  },
  quantity: {
      type: Sequelize.INTEGER,
      defaultValue: 1
  }
});
