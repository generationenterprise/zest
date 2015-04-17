'use strict';

var express = require('express');
var controller = require('./booking.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/types', controller.types);
router.get('/frequencies', controller.frequencies);
router.get('/extras', controller.extras);

router.get('/', controller.index);
router.post('/', controller.create);
router.get('/:id', controller.show);
router.put('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
