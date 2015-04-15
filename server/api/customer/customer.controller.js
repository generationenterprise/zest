'use strict';

var db = require('../../models');

exports.index = function(req, res) {
    db.Customer.findAll({
        include: [db.Booking]
    }).then(function(customers) {
        res.json(200, customers);
    });
};
