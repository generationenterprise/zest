'use strict';

var express = require('express');
var controller = require('./booking.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', controller.index);
router.get('/types', controller.types);
router.get('/frequencies', controller.frequencies);
router.get('/extras', controller.extras);

module.exports = router;
