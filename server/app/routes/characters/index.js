'use strict';
var router = require('express').Router(); // eslint-disable-line new-cap
module.exports = router;

var Character = require('../../../db/models/character')

router.get('/', function(req, res, next){
  Character.findAll().then(function(foundCharacters){
    res.send(foundCharacters)
  }).catch(next)
})

router.get('/:id', function(req, res, next){
  Character.findById(req.params.id).then(function(foundCharacter){
    res.send(foundCharacter)
  }).catch(next)
})

router.post('/', function(req, res, next){
  Character.create(req.body).then(function(createdCharacter){
    res.send(createdCharacter)
  }).catch(next)
})

router.put('/:id', function(req, res, next){
  Character.findById(req.params.id).then(function(foundCharacter){
    return foundCharacter.update(req.body)
  }).then(function(updatedCharacter){
    res.send(updatedCharacter)
  })
  .catch(next)
})

router.delete('/:id', function(req, res, next){
  Character.findById(req.params.id).then(function(foundCharacter){
    return foundCharacter.destroy(req.body)
  }).then(function(){
    res.send('destroyed')
  })
  .catch(next)
})
