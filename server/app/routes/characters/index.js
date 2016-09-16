'use strict';
var router = require('express').Router(); // eslint-disable-line new-cap
module.exports = router;

var Character = require('../../../db/models/character')

router.get('/', function(req, res, next){
  Character.findAll()
  .then(foundCharacters => res.send(foundCharacters))
  .catch(next)
})

router.get('/:id', function(req, res, next){
  Character.findById(req.params.id)
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
  Character.create(req.body)
  .then(createdCharacter => res.send(createdCharacter))
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
