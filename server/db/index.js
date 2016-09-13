'use strict';
var db = require('./_db');
module.exports = db;

// eslint-disable-next-line no-unused-vars
var User = require('./models/user');
var Character = require('./models/character');
var Category = require('./models/category');

// if we had more models, we could associate them in this file
// e.g. User.hasMany(Reports)

Character.belongsToMany(Category, {through: 'CharacterCategory'});
Character.hasMany(Review, {as: 'reviews'});
Character.belongsToMany(Order, {through: 'CharacterOrder'});
Character.belongsToMany(Cart, {through: 'CharacterCart'});
Category.belongsToMany(Character, {through: 'CharacterCategory'});

// if we had more models, we could associate them in this file
// e.g. User.hasMany(Reports)
