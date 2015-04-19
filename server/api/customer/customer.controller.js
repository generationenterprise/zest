'use strict';

var db = require('../../models');

exports.index = function(req, res) {
    db.Customer.findAll({}).then(function(customers) {
        res.json(200, customers);
    });
};

exports.contains = function(req, res) {
    db.Customer.find({
        where: db.Sequelize.or({
            email: req.body.email
        }, {
            mobilePhone: req.body.mobilePhone
        })
    }).then(function(customers) {
        res.json(200, customers);
    });
};

exports.show = function(req, res) {
    db.Customer.find(req.params.id).then(function(booking) {
        res.json(200, booking);
    });
};

exports.create = function(req, res) {
    db.Customer.create(req.body).then(function(customer) {
        return res.json(200, customer)
    }).error(function(error) {
        return res.json(500, error);
    });
};

exports.update = function(req, res) {
    db.Customer.find(req.body.id).then(function(customer) {
        customer.updateAttributes(req.body).then(function(customer) {
            return res.json(200, customer);
        }).error(function(error) {
            return res.json(500, error);
        })
    });
};

exports.destroy = function(req, res) {
    db.Customer.find(req.body.id).then(function(customer) {
        customer.destroy(req.body).then(function(customer) {
            return res.json(200, customer);
        }).error(function(error) {
            return res.json(500, error);
        })
    });
};
