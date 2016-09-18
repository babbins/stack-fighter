'use strict';
var router = require('express').Router(); // eslint-disable-line new-cap
module.exports = router;

var Order = require('../../../db/models/order.js');
var Character = require('../../../db/models/character.js');
var adminTest = require('../../configure/authorization').adminTest;

// '/orders'

router.get('/', function(req, res, next){
  if (!req.user.isAdmin){
    req.query = { userId: req.user.id}
  }
  Order.findAll({where: req.query, include: { model: Character }})
  .then(orders => res.send(orders))
  .catch(next);
});

router.post('/', function(req, res, next){
  Order.create(req.body)
  .then(order => res.status(201).send(order))
  .catch(next);
});

router.put('/:id', function(req, res, next){
  Order.findById(req.params.id)
  .then(order => {
    return order.update(req.body);
  })
  .then(order => res.status(200).send(order))
  .catch(next);
});

router.get('/:id', function(req, res, next){
  Order.findById(req.params.id)
  .then(order => res.send(order))
  .catch(next);
});

router.delete('/:id', function(req, res, next){
  Order.findById(req.params.id)
  .then(order => order.destroy())
  .then(() => res.status(200).send('Order deleted'))
  .catch(next);
});
router.get('/user/:userId', function(req, res, next){
  Order.findAll({where: { userId: req.params.userId}})
  .then(orders => res.send(orders))
  .catch(next);
});

router.get('/status/:status', function(req, res, next){
  Order.findAll({where: { status: req.params.status}})
  .then(orders => res.send(orders))
  .catch(next);
});
