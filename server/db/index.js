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

//user.getCart
// User.hasOne(Cart);
User.belongsTo(Cart);


//order now has FK of user ALSO: access to user.addOrder, user.setOrder, user.getOrders
User.hasMany(Order);
//order.getUser
Order.belongsTo(User);

//review now has FK of user
User.hasMany(Review);
//review.getUser
Review.belongsTo(User)

//character.getCategories
Character.belongsToMany(Category, {through: 'CharacterCategory'});
//category.getCharacter
Category.belongsToMany(Character, {through: 'CharacterCategory'});

//review now has FK of character.
Character.hasMany(Review);
//review.getCharacter (not that useful?)
Review.belongsTo(Character);

//order.getCharacters
Character.belongsToMany(Order, {through: 'CharacterOrder'});
//character.getOrders
Order.belongsToMany(Character, {through: 'CharacterOrder'});

//cart.getCharacters
Character.belongsToMany(Cart, {through: 'CharacterCart'});
//character.getCarts WHY!?
Cart.belongsToMany(Character, {through: 'CharacterCart'});

// if we had more models, we could associate them in this file
// e.g. User.hasMany(Reports)
