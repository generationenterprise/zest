'use strict';

var db = require('../../models');

exports.index = function(req, res) {
    db.Booking.findAll().then(function(customers) {
        res.json(200, customers);
    });
};

exports.types = function(req, res) {
    db.BookingType.findAll().then(function(types) {
        res.json(200, types);
    });
};

exports.frequencies = function(req, res) {
    db.Frequency.findAll().then(function(frequencies) {
        res.json(200, frequencies);
    });
};

exports.extras = function(req, res) {
    db.Extra.findAll().then(function(extras) {
        res.json(200, extras);
    });
};