'use strict';
var router  = require('express').Router();

var User = require('../../../db/models/user.js');

module.exports = router;

router.get('/', function(req, res, next){
    User.findAll({})
    .then(allUsers => res.send(allUsers))
    .catch(next)
});

router.get('/?', function(req, res, next) {
    if(req.query.user) {
        User.findAll({
            where: {
                id: req.query.user
            }
        })
        .then(oneUser => res.send(oneUser))
        .catch(next);
    }
})

router.post('/', function(req, res, next){
    User.create(req.body)
    .then(createdUser => res.status(201).json(createdUser))
    .catch(next);
})

router.put('/:id', function(req, res, next){
    User.findById(req.params.id)
    .then(userToBeUpdated => {
        return userToBeUpdated.update(req.body);
    })
    .then(successfulUpdate => res.status(200).send(successfulUpdate))
    .catch(next);
})


router.delete('/:id', function(req, res, next){
    User.findById(req.params.id)
    .then(foundToDelete => foundToDelete.destroy())
    .then(() => res.status(204).send('destroyed'))
    .catch(next)
})
