var express = require('express');
var router  = express.Router();
var db = require('../../../db');

var User = require('../../../db/models/user.js');
// var User = db.model('user');

module.exports = router;

//Get all the users
router.get('/', function(req, res, next){
    User.findAll()
    .then(function(allUsers){
        console.log(allUsers);
        res.json(allUsers);
    })
    .catch(next);
})

// Get by ID
router.get('/:id', function(req, res, next){
    User.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(function(oneUser){
        if(oneUser === null){
            res.status(404);
        }
        res.json(oneUser);
    })
    .catch(next);
})


// Post
router.post('/', function(req, res, next){
    User.create(req.body)
    .then(function(createdUser){
        res.status(201);
        res.json(createdUser);
    })
    .catch(next);
})


// Put. User or admin updating their info
router.put('/:id', function(req, res, next){
    User.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(function(userToBeUpdated){
        if(userToBeUpdated === null){
            res.status(404);
            res.send();
        } else {
            userToBeUpdated.update(req.body)
            .then(function(successfulUpdate){
                res.send(successfulUpdate)
            })
        }
    })
    .catch(next);
})


// Delete
router.delete('/:id', function(req, res, next){
    User.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(function(foundToDelete){
        if(foundToDelete === null){
            res.status(404);
            res.send();
        } else {
            return foundToDelete.destroy();
        }
    })
    .then(function(deleteSuccess){
        res.status(204);
        res.send();
    })
    .catch(next);
})
