'use strict';

var db = require('../../models');

exports.index = function(req, res) {
    db.Cleaning.findAll().then(function(cleanings) {
        res.json(200, cleanings);
    });
};

exports.booking = function(req, res) {
    db.Cleaning.findOne({
        where: {
            BookingId: req.params.id
        }
    }).then(function(cleaning) {
        res.json(200, cleaning);
    });
    /*db.Cleaning.find(req.params.id).then(function(cleaning) {
        res.json(200, cleaning);
    });*/
};

exports.show = function(req, res) {
    db.Cleaning.find(req.params.id).then(function(cleaning) {
        res.json(200, cleaning);
    });
};

exports.create = function(req, res) {
    db.Cleaning.create(req.body).success(function(cleaning) {
        return res.json(200, cleaning)
    }).error(function(error) {
        return res.json(500, error);
    });
};

exports.update = function(req, res) {
    db.Cleaning.find(req.body.id).then(function(cleaning) {
        cleaning.updateAttributes(req.body).success(function(cleaning) {
            return res.json(200, cleaning);
        }).error(function(error) {
            return res.json(500, error);
        })
    });
};

exports.destroy = function(req, res) {
    db.Cleaning.find(req.body.id).then(function(cleaning) {
        cleaning.destroy(req.body).success(function(cleaning) {
            return res.json(200, cleaning);
        }).error(function(error) {
            return res.json(500, error);
        })
    });
};
