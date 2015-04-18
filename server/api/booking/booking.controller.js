'use strict';

var db = require('../../models'),
    _ = require('lodash'),
    Q = require('q');

exports.index = function(req, res) {
    db.Booking.findAll({
        include: [db.BookingType, db.Cleaning,db.Extra, db.Pet]
    }).then(function(bookings) {
        res.json(200, bookings);
    });
};

exports.register = function(req, res) {
    // Create customer
    var customerQ = db.Customer.create(req.body.customer).then(function(customer) {
        req.body.booking.CustomerId = customer.id;
        // Create booking
        var bookingQ = db.Booking.create(req.body.booking).success(function(booking) {
            var traillingQs = [];
            req.body.cleaning.BookingId = booking.id;
            // Create cleaning
            var cleaningQ = db.Cleaning.create(req.body.cleaning);
            traillingQs.push(cleaningQ);
            // Set pets
            if (req.body.booking.pets) {
                req.body.booking.pets.BookingId = booking.id;
                var petQ = db.Pet.create(req.body.booking.pets);
                traillingQs.push(petQ);
            }
            // Set extras
            if (req.body.booking.extras) {
                var extras = [];
                _.each(req.body.booking.extras, function(extra) {
                    var x = db.Extra.build(extra);
                    x.BookingId = booking.id;
                    extras.push(x);
                })
                var extraQ = booking.setExtras(extras);
                traillingQs.push(extraQ);
            }
            // Trainling promisses
            Q.all(traillingQs).then(function(qs) {
                return res.json(200, booking);
            });
        }).catch(function(err) {
            return res.json(500, err);
        });
    });
};

exports.show = function(req, res) {
    db.Booking.findOne({
        where: {
            id: req.params.id
        },
        include: [db.BookingType, db.Extra, db.Pet]
    }).then(function(booking) {
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

exports.pets = function(req, res) {
    db.Pet.findAll().then(function(pets) {
        res.json(200, pets);
    });
};
