'use strict';
var router  = require('express').Router();

var User = require('../../../db/models/user.js');

module.exports = router;

//Authenticate!!! -- KHWA

// router.use(isAuthenticated)

router.get('/', function(req, res, next){ //update like we talked to have query in this middleware function --- KHWA
    //I would expect only admin to be able to find all users, make sure the req.user is an admin; for a single user make sure it matches the req.user -- KHWA
    // let query = req.query --> id: 1231231234 --> /?id=123123
    // if (!isAdmin()) query.id = req.user.id;
    User.findAll({}) //{where: query}
    .then(allUsers => res.send(allUsers)) //sanitize!!! -KHWA
    .catch(next)
});

router.get('/?', function(req, res, next) { //don't need this if we change the get above -- KHWA
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

router.post('/', function(req, res, next){ //this should only be for admin, authenticate that -- KHWA
    User.create(req.body) //in signup make sure to delete any .isAdmin property from the object you create for a user -- KHWA
    .then(createdUser => res.status(201).json(createdUser))
    .catch(next);
})

router.put('/:id', function(req, res, next){ //authenticate -- KHWA (http://expressjs.com/en/api.html#router.param)
    User.findById(req.params.id)
    .then(userToBeUpdated => { //what if there is no user found?! Errors -- KHWA
        return userToBeUpdated.update(req.body);
    })
    .then(successfulUpdate => res.status(200).send(successfulUpdate))
    .catch(next);
})


router.delete('/:id', function(req, res, next){ //something to consider -- never delete, have a status of active/not/temp/something -- KHWA
    User.findById(req.params.id)
    .then(foundToDelete => foundToDelete.destroy())
    .then(() => res.status(204).send('destroyed'))
    .catch(next)
})
