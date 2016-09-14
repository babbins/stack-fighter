'use strict';
var router = require('express').Router(); // eslint-disable-line new-cap
module.exports = router;
var Review = require('../../../db/models/review')
router.post('/', function(req, res, next){
  Review.create(req.body)
  .then(createdReview => res.send(createdReview))
  .catch(next)
})

router.put('/:id', function(req, res, next) {
  Review.findById(req.params.id)
  .then(foundReview => foundReview.update(req.body))
  .then(updatedReview => res.send(updatedReview))
  .catch(next)
})

router.delete('/:id', function(req, res, next) {
  Review.findById(req.params.id)
  .then(foundReview => foundReview.destroy())
  .then(() => res.send('destroyed'))
  .catch(next)
})

router.get('/?', function(req, res, next) {
  if (req.query.user) {
    Review.findAll({
      where: {
        userId: req.query.user
      }
    })
    .then(foundReviews => res.send(foundReviews))
    .catch(next)
  } else if (req.query.character) {
    Review.findAll({
      where: {
        characterId: req.query.character
      }
    })
    .then(foundReviews => res.send(foundReviews))
    .catch(next)
  }
})
