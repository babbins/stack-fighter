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
    console.log(categories);
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
  Character.findById(req.params.id)
  .then(foundCharacter => foundCharacter.update(req.body))
  .then(updatedCharacter => res.send(updatedCharacter))
  .catch(next)
})

router.delete('/:id', function(req, res, next){
  Character.findById(req.params.id)
  .then(foundCharacter => foundCharacter.destroy(req.body))
  .then(() => res.send('destroyed'))
  .catch(next)
})
