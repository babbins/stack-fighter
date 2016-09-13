'use strict';
var db = require('./_db');
module.exports = db;

// eslint-disable-next-line no-unused-vars
var User = require('./models/user');
var Character = require('./models/character');
// if we had more models, we could associate them in this file
// e.g. User.hasMany(Reports)

Character.belongsToMany(Category, {through: 'CharacterCategory'});
Character.hasMany(Review, {as: 'reviews'});
Character.belongsToMany(Order, {through: 'CharacterOrder'});
Character.belongsToMany(Cart, {through: 'CharacterCart'});
