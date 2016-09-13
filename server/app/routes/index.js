'use strict';
var router = require('express').Router(); // eslint-disable-line new-cap
module.exports = router;

router.use('/members', require('./members'));
router.use('/characters', require('./characters'))
router.use('/orders', require('/orders'))
router.use('/catgories', require('/catgories'))
router.use('/reviews', require('/reviews'))
router.use('/users', require('/users'))
// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});
