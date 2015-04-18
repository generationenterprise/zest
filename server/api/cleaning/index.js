'use strict';

var express = require('express');
var controller = require('./cleaning.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', controller.index);
router.post('/', controller.create);
router.get('/booking/:id', controller.booking);
router.get('/:id', controller.show);
router.put('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
