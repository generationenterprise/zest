'use strict';

var express = require('express');
var passport = require('passport');
var auth = require('../auth.service');
var db = require('../../models');
var _ = require('lodash');

var router = express.Router();

router.post('/', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        var error = err || info;
        if (error) return res.json(401, error);
        if (!user) return res.json(404, {
            message: 'Something went wrong, please try again.'
        });

        var token = auth.signToken(user._id, user.role);

        db.Customer.find({
            where: {
                email: user.email
            }
        }).then(function(customer) {
            db.Booking.find({
                where: {
                    CustomerId: customer.id
                }
            }).then(function(booking) {
                res.json({
                    CustomerId: customer.id,
                    hasBookings: !_.isEmpty(booking),
                    token: token
                });
            });
        });

    })(req, res, next)
});

module.exports = router;