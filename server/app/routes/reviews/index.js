'use strict';
var router = require('express').Router(); // eslint-disable-line new-cap
module.exports = router;
var Review = require('../../../db/models/review')
router.post('/', function(req, res, next){
  Review.create(req.body).then(function(createdReview){
    res.send(createdReview)
  }).catch(next)
})

router.put('/:id', function(req, res, next) {
  Review.findById(req.params.id).then(function(foundReview){
    return foundReview.update(req.body)
  }).then(function(updatedReview){
    res.send(updatedReview)
  })
  .catch(next)
})

router.delete('/:id', function(req, res, next) {
  Review.findById(req.params.id).then(function(foundReview){
    return foundReview.destroy()
  }).then(function(){
    res.send('destroyed')
  })
  .catch(next)
})

router.get('/?', function(req, res, next) {
  if (req.query.user) {
    Review.findAll({
      where: {
        userId: req.query.user
      }
    }).then(function(foundReviews){
      res.send(foundReviews)
    }).catch(next)
  } else if (req.query.character) {
    Review.findAll({
      where: {
        characterId: req.query.character
      }
    }).then(function(foundReviews){
      res.send(foundReviews)
    }).catch(next)
  }
})
