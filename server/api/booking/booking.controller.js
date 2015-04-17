'use strict';

var db = require('../../models');

exports.index = function(req, res) {
    db.Booking.findAll().then(function(bookings) {
        res.json(200, bookings);
    });
};

exports.show = function(req, res) {
    db.Booking.find(req.params.id).then(function(booking) {
        res.json(200, booking);
    });
};

exports.create = function(req, res) {
    db.Booking.create(req.body).success(function(booking) {
        return res.json(200, booking)
    }).error(function(error) {
        return res.json(500, error);
    });
};

exports.types = function(req, res) {
    db.BookingType.findAll().then(function(types) {
        res.json(200, types);
    });
};

exports.update = function(req, res) {
    db.Booking.find(req.body.id).then(function(booking) {
        booking.updateAttributes(req.body).success(function(booking) {
            return res.json(200, booking);
        }).error(function(error) {
            return res.json(500, error);
        })
    });
};

exports.destroy = function(req, res) {
    db.Booking.find(req.body.id).then(function(booking) {
        booking.destroy(req.body).success(function(booking) {
            return res.json(200, booking);
        }).error(function(error) {
            return res.json(500, error);
        })
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
