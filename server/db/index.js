'use strict';
var db = require('./_db');
module.exports = db;

// eslint-disable-next-line no-unused-vars
var User = require('./models/user');
var Order = require('./models/order')
var Character = require('./models/character');
var Category = require('./models/category');
var Review = require('./models/review');
var Cart = require('./models/cart');

// if we had more models, we could associate them in this file
// e.g. User.hasMany(Reports)

User.hasOne(Cart);
User.hasMany(Order, {as: 'orders'});
User.hasMany(Review, {as: 'reviews'});

Character.belongsToMany(Category, {through: 'CharacterCategory'});
Character.hasMany(Review, {as: 'reviews'});
Character.belongsToMany(Order, {through: 'CharacterOrder'});
Character.belongsToMany(Cart, {through: 'CharacterCart'});
Category.belongsToMany(Character, {through: 'CharacterCategory'});

// if we had more models, we could associate them in this file
// e.g. User.hasMany(Reports)
