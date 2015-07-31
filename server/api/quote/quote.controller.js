'use strict';

var db = require('../../models');
var sendgrid = require('sendgrid')(process.env.SENDGRID_USERNAME, process.env.SENDGRID_PASSWORD);

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
        sendgrid.send({
            to: ['brices@gmail.com','0x360z@gmail.com'],
            from: quote.email,
            subject: 'Zest - Quote Request: '+quote.type,
            text: 'Type: '+quote.type+' -- '+
                  'Full Name: '+quote.fullName+' -- '+
                  'Email: '+quote.email+' -- '+
                  'Mobile Phone: '+quote.mobilePhone+' -- '+
                  'Location: '+quote.location+' -- '+
                  'Best Time:'+quote.bestTime+' -- '+
                  'Description: '+quote.description+' -- '+
                  'Notes:'+quote.notes
        }, function(err, json) {
            if (err) {
                return res.json(500, json);
            }
            return res.json(200, json);
        });       

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