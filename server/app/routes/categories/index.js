'use strict';

var router = require('express').Router(); // eslint-disable-line new-cap
module.exports = router;
var models = require('../../../db/models');
var Category = models.Category;



//Get all Categories with a given type. Eg: Every value (eg: SFII,SFIII,SIV) of a given type (eg: Game);
router.get('/', function(req,res,next){
    Category.findAll({ where: req.query })
    .then(gettingCategories => res.json(gettingCategories))
    .catch(next);
});


//Creating a new category.
router.post('/', function(req,res,next){
    Category.create(req.body)
    .then(creatingCategory => res.status(201).json(creatingCategory))
    .catch(next);
});

//Updating a category.
router.put('/:categoryId', function(req,res,next){
    req.category.update(req.body)
    .then(updatedCategory => res.status(200).json(updatedCategory))
    .catch(next);
});

//Deleting a category.
router.delete('/:categoryId', function(req,res,next){
    req.category.destroy()
    .then(() => res.status(204).end())
    .catch(next);
});