'use-strict'
var router = require('express').Router();
module.exports = router;

var Cart = require('../../../db/models/cart');

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
    User.findOne(req.query)
    .then(user => {
        return Cart.findOne({
            where: {
                id: user.cartId
            }
        })
        .then(foundCart => {
            res.json(foundCart)
        })
    })
    .catch(next);
});
