'use strict';
var router = require('express').Router(); // eslint-disable-line new-cap
module.exports = router;

var Character = require('../../../db/models/character')
var Category = require('../../../db/models/category')

router.get('/', function(req, res, next){
  Character.findAll({include: [Category]})
  .then(foundCharacters => res.send(foundCharacters))
  .catch(next);
})

router.get('/:id', function(req, res, next){
  Character.findOne({where: {id: req.params.id}, include: [Category]})
  .then(foundCharacter => res.send(foundCharacter))
  .catch(next)
})

router.get('/categories/:id', function(req, res, next){
  Character.findById(req.params.id)
  .then(foundCharacter => foundCharacter.getCategories())
  .then(foundCategories => res.send(foundCategories))
  .catch(next)
})

router.post('/', function(req, res, next){

  if (req.body.categories){
    var categories = req.body.categories;
    delete req.body.categories;
  }
  var character;
  Character.create(req.body)
  .then(createdCharacter => {
    character = createdCharacter;
    return createdCharacter.setCategories(categories);
  })
  .then(() => res.send(character))
  .catch(next)
})

router.put('/:id', function(req, res, next){
  var char = req.body[0];
  var categories = req.body[1];
  Character.findById(req.params.id)
  .then(foundCharacter => foundCharacter.update(char))
  .then(updatedCharacter => updatedCharacter.setCategories(categories))
  .then(() => res.send(char))
  .catch(next)
})

router.delete('/:id', function(req, res, next){
  Character.findById(req.params.id)
  .then(foundCharacter => foundCharacter.destroy(req.body))
  .then(() => res.send('destroyed'))
  .catch(next)
})
