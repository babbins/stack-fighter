/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/

var chalk = require('chalk');
var db = require('./server/db').db;
var Category = db.model('category');
var Order = db.model('order');
var Power = db.model('power');
var PowerCategory = db.model('power_category');
var PowerOrder = db.model('power_order');
var Review = db.model('review');
var User = db.model('user');
var Promise = require('sequelize').Promise;

var seedUsers = function () {

    var users = [
        {
            email: 'testing@fsa.com',
            password: 'password'
        },
        {
            email: 'obama@gmail.com',
            password: 'potus'
        }
    ];

    var creatingUsers = users.map(function (userObj) {
        return User.create(userObj);
    });

    return Promise.all(creatingUsers);

};

var seedPowers = function () {
    var powers = [
        {
            name: 'Super Speed',
            description: 'Go fast.',
            price: 499.99
        },
        {
            name: 'Sweaty Hands',
            description: 'Feel the moisture.',
            price: 1.99
        },
        {
            name: 'Telepathy',
            description: 'Read minds.',
            price: 999.99
        }
    ];
    var creatingPowers = powers.map(function(powerObj) {
        return Power.create(powerObj);
    });
    return Promise.all(creatingPowers);
};

var seedCategories = function () {
    var categories = [
        {
            name: 'Physical'
        },
        {
            name: 'Mental'
        }
    ];
    var creatingCategories = categories.map(function(cateObj) {
        return Category.create(cateObj);
    });
    return Promise.all(creatingCategories);
};

var seedPowerCategories = function () {
    var powercategories = [
        {
            powerId: 1,
            categoryId: 1
        },
        {
            powerId: 2,
            categoryId: 1
        },
        {
            powerId: 3,
            categoryId: 2
        }
    ];
    var creatingPowerCategories = powercategories.map(function(pcObj) {
        return PowerCategory.create(pcObj);
    });
    return Promise.all(creatingPowerCategories);
};

var seedReviews = function () {
    var reviews = [
        {
            description: 'Amazing power. 10/10.',
            rating: 5,
            powerId: 1,
            userId: 1
        },
        {
            description: 'This power is useful, but I get chaffed nipples while running now :(',
            rating: 3,
            powerId: 1,
            userId: 2
        }
    ];
    var creatingReviews = reviews.map(function(rObj) {
        return Review.create(rObj);
    });
    return Promise.all(creatingReviews);
};

db.sync({ force: true })
    .then(function () {
        return seedUsers();
    })
    .then(function () {
        return seedPowers();
    })
    .then(function () {
        return seedCategories();
    })
    .then(function () {
        return seedPowerCategories();
    })
    .then(function () {
        return seedReviews();
    })
    .then(function () {
        console.log(chalk.green('Seed successful!'));
        process.exit(0);
    })
    .catch(function (err) {
        console.error(err);
        process.exit(1);
    });
