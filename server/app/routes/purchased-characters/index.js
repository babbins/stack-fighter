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
  var purchasedCharPromises = [];
  req.body.characters.forEach(function(character){
    var promise = purchasedCharacter.findOrCreate({where: {
      name: character.name,
      portrait: character.portrait,
      idleSprite: character.idleSprite,
      description: character.description,
      strength: character.strength,
      intelligence: character.intelligence,
      speed: character.speed,
      luck: character.luck,
      quantity: character.quantity,
      price: character.price
    }});
    purchasedCharPromises.push(promise);
  })

  Promise.all(purchasedCharPromises)
  .then(createdCharacters => res.send(createdCharacters))
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
