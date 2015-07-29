'use strict';

var db = require('../../models');

exports.index = function(req, res) {
    db.ServiceQuoteRequest.findAll({}).then(function(quotes) {
        res.json(200, quotes);
    });
};

exports.show = function(req, res) {
    db.ServiceQuoteRequest.find(req.params.id).then(function(quote) {
        res.json(200, quote);
    });
};

exports.create = function(req, res) {
    db.ServiceQuoteRequest.create(req.body).then(function(quote) {
        return res.json(200, quote)
    }).error(function(error) {
        return res.json(500, error);
    });
};

exports.update = function(req, res) {
    db.ServiceQuoteRequest.find(req.body.id).then(function(quote) {
        quote.updateAttributes(req.body).then(function(quote) {
            return res.json(200, quote);
        }).error(function(error) {
            return res.json(500, error);
        })
    });
};

exports.destroy = function(req, res) {
    db.ServiceQuoteRequest.find(req.body.id).then(function(quote) {
        quote.destroy(req.body).then(function(quote) {
            return res.json(200, quote);
        }).error(function(error) {
            return res.json(500, error);
        })
    });
};
