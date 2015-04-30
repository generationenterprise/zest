var _ = require('lodash'),
    moment = require('moment'),
    Clog = require('./clog.model');

exports.index = function(req, res) {
    Clog.find(function(err, clogs) {
        if (err) {
            return res.json(500, err);
        }
        return res.json(200, clogs);
    });
};

exports.create = function(req, res) {
    Clog.findOrCreate({
        ip: req.body.ip,
        moment: moment().format('YYYY-MM-DD-HH')
    }, function(err, clog, created) {
        if (err) {
            return res.json(500, err);
        }
        return res.json(200, clog);
    });
};
