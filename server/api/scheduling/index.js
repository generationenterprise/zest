'use strict';

var express = require('express');
var controller = require('./scheduling.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/:year/:month/:hours', controller.index);
router.get('/openings/:hours', controller.openings);
router.post('/complete', controller.complete);


module.exports = router;
