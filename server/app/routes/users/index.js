var express = require('express');
var router  = express.Router();

var User = require('../../../db/models/user.js');
var User = db.model('user');
//****^^^*****//WHICH ONE?

module.exports = router;

//Get all the users
router.get('/users', function(req, res, next){
    User.findAll()
    .then(function(allUsers){
        res.json(allUsers);
    })
    .catch(next);
})

// Get by ID
router.get('/users/:id', function(req, res, next){
    User.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(function(oneUser){
        if(oneUser === null){
            res.status(404);
        }
        res.json(oneBook);
    })
    .catch(next);
})


// Post
router.post('/users', function(req, res, next){
    User.create(req.body)
    .then(function(createdUser){
        res.status(201);
        res.json(createdUser);
    })
    .catch(next);
})


// Put. User or admin updating their info
router.put('/users/:id', function(req, res, next){
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
            userToBeUpdated.update({
                name:
                phone: //NOT SURE WHAT TO UPDATE YET...
            })
            .then(function(successfulUpdate){
                res.send(successfulUpdate)
            })
        }
    })
    .catch(next);
})


// Delete
router.delete('/users/:id', function(req, res, next){
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
