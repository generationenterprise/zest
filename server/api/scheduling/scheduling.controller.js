'use strict';

var db = require('../../models'),
    _ = require('lodash'),
    Q = require('q'),
    moment = require('moment');

exports.index = function(req, res) {
    var year = req.params.year,
        month = (req.params.month - 1),
        hours = req.params.hours;

    var now = moment(),
        start = moment().year(year).month(month).add(3, 'days'),
        end = moment(start).add(1, 'months').date(1);

    if (start < now) {
        /*return res.json({
            start: start,
            end: end,
            now: now
        });*/
        return res.json(200, []);
    }

    if (start.month() > now.month()) {
        start.date(1);
    }

    var openings = [];

    for (; start < end; start.add(1, 'days')) {
        if (start.day() !== 0) {
            openings.push(start.toString());
        }
    }

    res.json({
        start: start,
        end: end,
        now: now,
        openings: openings,
        len: openings.length
    });

    //db.sequelize.query('select count(*) as employees, date from EmployeeDateConstraints where max < 8 group by date;').then(function(rows){
    //	res.send(rows);
    //});

};