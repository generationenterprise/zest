'use strict';

var db = require('../../models');

exports.index = function(req, res) {
    db.Cleaning.findAll({
        include: [db.Frequency, db.Extra, db.Pet]
    }).then(function(cleanings) {
        res.json(200, cleanings);
    });
};

exports.show = function(req, res) {
    db.Cleaning.find(req.params.id).then(function(cleaning) {
        res.json(200, cleaning);
    });
};

exports.create = function(req, res) {
    db.Cleaning.create(req.body).then(function(cleaning) {
        return res.json(200, cleaning)
    }).error(function(error) {
        return res.json(500, error);
    });
};

exports.update = function(req, res) {
    db.Cleaning.find(req.body.id).then(function(cleaning) {
        cleaning.updateAttributes(req.body).then(function(cleaning) {
            return res.json(200, cleaning);
        }).error(function(error) {
            return res.json(500, error);
        })
    });
};

exports.destroy = function(req, res) {
    db.Cleaning.find(req.body.id).then(function(cleaning) {
        cleaning.destroy(req.body).then(function(cleaning) {
            return res.json(200, cleaning);
        }).error(function(error) {
            return res.json(500, error);
        })
    });
};
