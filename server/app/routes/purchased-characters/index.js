'use strict';
var router = require('express').Router(); // eslint-disable-line new-cap
module.exports = router;

var purchasedCharacter = require('../../../db/models/purchased-character.js')
var Category = require('../../../db/models/category')

router.get('/', function(req, res, next){
  purchasedCharacter.findAll()
  .then(foundCharacters => res.send(foundCharacters))
  .catch(next);
})

router.get('/:id', function(req, res, next){
  purchasedCharacter.findOne({where: {id: req.params.id}})
  .then(foundCharacter => res.send(foundCharacter))
  .catch(next)
})

router.post('/', function(req, res, next){
  purchasedCharacter.create(req.body) //FIND OR CREATE??
  .then(createdCharacter => res.send(createdCharacter))
  .catch(next)
})

router.put('/:id', function(req, res, next){
  purchasedCharacter.findById(req.params.id)
  .then(foundCharacter => foundCharacter.update(req.body))
  .then(updatedCharacter => res.send(updatedCharacter))
  .catch(next)
})

router.delete('/:id', function(req, res, next){
  purchasedCharacter.findById(req.params.id)
  .then(foundCharacter => foundCharacter.destroy(req.body))
  .then(() => res.send('destroyed'))
  .catch(next)
})
