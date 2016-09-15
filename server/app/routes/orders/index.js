'use strict';
var router = require('express').Router(); // eslint-disable-line new-cap
module.exports = router;

var Order = require('../../../db/models/order.js');


// '/orders'

router.get('/', function(req, res, next){
  //admins can find all, but we could add query to findAll if user is not admin (req.user); can include different queries like status (maybe reassign req.query.id = req.user.id) -- KHWA
  // /?status=pending ==> req.query = {status: pending}
  // req.query.id = req.user.id
  Order.findAll({}) //{where: req.query} ==> {status: pending, id: req.user.id}
  .then(orders => res.send(orders))
  .catch(next);
});

router.post('/', function(req, res, next){
  //check order.user == req.user, or admin -- KHWA
  Order.create(req.body)
  .then(order => res.status(201).send(order))
  .catch(next);
});

router.put('/:id', function(req, res, next){ //consider router.params -- KHWA
  //can users update? if so only allow cancel or some specific type of update on an order associated with req.user -- KHWA
  //I think we should only be updating status, not orderitems -- KHWA
  Order.findById(req.params.id) //what happens when no order is found and .update is not a function!?! -- KHWA
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

router.delete('/:id', function(req, res, next){ //let's not delete but change a status -- paper trails = awesome -- KHWA
  Order.findById(req.params.id)
  .then(order => order.destroy())
  .then(() => res.status(200).send('Order deleted'))
  .catch(next);
});
router.get('/user/:userId', function(req, res, next){ //don't need if you implement the first get / differently -- KHWA
  Order.findAll({where: { userId: req.params.userId}})
  .then(orders => res.send(orders))
  .catch(next);
});

router.get('/status/:status', function(req, res, next){ //I would think this would be a query param in get / -- KHWA
  Order.findAll({where: { status: req.params.status}})
  .then(orders => res.send(orders))
  .catch(next);
});
