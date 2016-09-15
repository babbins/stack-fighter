'use strict';
var router = require('express').Router(); // eslint-disable-line new-cap
module.exports = router;
var Review = require('../../../db/models/review') //I would prefer to see db.model('review') OR better have db/index.js export the models so you can import that file and have access to all models (and not have to worry as much about a name change) -- KHWA
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

router.get('/?', function(req, res, next) { //don't need ?. write one query that includes both potential user and review. Might make more sense to get all for admin view and filter on front end -- KHWA
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
