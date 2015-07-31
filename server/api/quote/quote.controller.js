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
            to: ['technology@generationenterprise.org'],
            from: quote.email,
            subject: 'Zest - Quote Request: '+quote.type,
            html: '<b>Type</b>: '+quote.type+' <br> '+
                  '<b>Full Name</b>: '+quote.fullName+' <br> '+
                  '<b>Email</b>: '+quote.email+' <br> '+
                  '<b>Mobile Phone</b>: '+quote.mobilePhone+' <br> '+
                  '<b>Location</b>: '+quote.location+' <br> '+
                  '<b>Best Time</b>:'+quote.bestTime+' <br> '+
                  '<b>Description</b>: '+quote.description+' <br> '+
                  '<b>Notes</b>:'+quote.notes
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