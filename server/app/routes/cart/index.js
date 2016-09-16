'use-strict'
var router = require('express').Router();
module.exports = router;

var Cart = require('../../../db/models/cart');
var User = require('../../../db/models/user');
var Character = require('../../../db/models/character');

// router.get('/', function(req, res, next){
//     console.log(req.user);
//     Cart.findAll()
//     .then(getCart => {
//         console.log("LOG FROM CART.FINDALL --> GET CART: ");
//         res.json(getCart)
//     })
//     .catch(next);
// });


router.get('/', function(req, res, next){
    if(!req.user.isAdmin){
        req.query = req.user.id
    }
    User.findById(req.query)
    .then(user => {
        // console.log("USER FROM ROUTE", user);
        return Cart.findOne({
            where: {
                id: user.cartId
            },
            include: [Character]
        })
        .then(foundCart => {
            res.json(foundCart)  //characters array with length 0
        })
    })
    .catch(next);
});
