'use strict';
var router = require('express').Router(); // eslint-disable-line new-cap
module.exports = router;



router.use(function (req, res) {
    res.status(404).end();
});
