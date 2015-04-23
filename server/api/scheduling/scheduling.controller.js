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
        return res.json(200, []);
    }

    if (start.month() > now.month()) {
        start.date(1);
    }

    var getHours = function(day) {
        var hours = [800, 830, 900, 930, 1000, 1030, 1100, 1130, 1200, 1230, 1300, 1330, 1400, 1430, 1500, 1530, 1600, 1630, 1700, 1730, 1800];
        return hours;
    };

    var getOpenings = function() {
        var openings = {};
        var runner = moment(start);
        for (; runner < end; runner.add(1, 'days')) {
            if (runner.day() !== 0) {
                var d = runner.format("YYYY-MM-DD");
                openings[d] = getHours();
            }
        }
        return openings;
    }



    db.sequelize.query('SELECT id, nickName FROM Employees WHERE deletedAt IS NULL').then(function(employees) {
        _.each(employees[0], function(employee) {
            employee.openings = getOpenings();
            removeScheduledOnceBookings(employee);
        });
    });

    var findOpenings = function(employee) {
        removeOnceOpenings(employee);
        //res.json(employee.id);
    };

    var removeScheduledOnceBookings = function(employee) {
        db.sequelize.query('SELECT * FROM ScheduledOnceBookings WHERE date >= \'' + start.format('YYYY/MM/DD') + '\' AND date < \'' + end.format('YYYY/MM/DD') + '\' AND EmployeeId = ' + employee.id).then(function(rows) {
            _.each(rows[0], function(booking) {
                var date = moment(booking.date).format("YYYY-MM-DD"),
                    time = booking.time,
                    hours = booking.hours;
                    
                var i = employee.openings[date].indexOf(time);
                console.log(date+'=>'+employee.openings[date].join(","));
                employee.openings[date].splice(i, hours*2);
                console.log(date+'=>'+employee.openings[date].join(","));

                res.json(employee.openings[date]);

            });
            //return res.json(employee);
        });
    };


    // var once = null;
    // db.sequelize.query('SELECT * FROM ScheduledOnceBookings WHERE date > NOW()').then(function(rows){
    //  once = rows;
    // });

    /*res.json({
        start: start.format("YYYY-MM-DD"),
        end: end.format("YYYY-MM-DD"),
        now: now.format("YYYY-MM-DD"),
        openings: openings,
        len: openings.length
    });*/

    //db.sequelize.query('select count(*) as employees, date from EmployeeDateConstraints where max < 8 group by date;').then(function(rows){
    //  res.send(rows);
    //});

};