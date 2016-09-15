'use strict';
var db = require('./_db');
module.exports = db; // {db, User, Order, Character, characterCategory: db.models('characterCategory')} you could export the models as well so you don't have to require in specific files -- KHWA

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
User.hasOne(Cart); //might want to add cart assocation for include ability when looking at a single car. Probably not necessary b/c the user will be logged in, but might want it -- KHWA

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
Order.belongsToMany(Character, {through: 'CharacterOrder'}); //have to have quantity and price at purchase for each orderitem -- KHWA

//cart.getCharacters
Character.belongsToMany(Cart, {through: 'CharacterCart'});  //have quantity on characterCart even though I know you will default to 1 right now -- KHWA
//character.getCarts WHY!?
Cart.belongsToMany(Character, {through: 'CharacterCart'});

//just want to show you how to use 'include' with through tables -- http://stackoverflow.com/questions/25880539/join-across-multiple-junction-tables-with-sequelize -- KHWA


// if we had more models, we could associate them in this file
// e.g. User.hasMany(Reports)
