'use-strict'
var router = require('express').Router();
module.exports = router;

var Cart = require('../../../db/models/cart');
var User = require('../../../db/models/user');
var Character = require('../../../db/models/character');

router.get('/', function(req, res, next){
    if(!req.user.isAdmin){
        req.query = req.user.id
    } else if (req.user == null){
        return
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

router.post('/', function(req, res, next) {
    User.findOne({
        where: {
            id: req.user.id
        },
        attributes: ['cartId']
    })
    .then(foundUser => {
        console.log("FU CART ID: ", foundUser.cartId);
        return Cart.findById(foundUser.cartId)
        // res.send(foundUser);
    })
    .then(foundCart => foundCart.addCharacter(req.body.character))
    .then(function(){
        res.end();
    })
    .catch(next);
})
