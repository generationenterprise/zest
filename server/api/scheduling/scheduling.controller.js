'use strict';

var db = require('../../models'),
    _ = require('lodash'),
    Q = require('q'),
    moment = require('moment');

/**
 * Given the {YEAR} {MONTH} and {HOURS} this endpoint returns all openings in {MONTH} for bookings of {HOURS} long.
 */
exports.index = function(req, res) {
    var YEAR = req.params.year,
        MONTH = (req.params.month - 1),
        HOURS = req.params.hours;

    var now = moment(),
        start = moment().year(YEAR).month(MONTH).add(3, 'days'),
        end = moment(start).add(1, 'months').date(1);

    if (start < now) {
        return res.json(200, []);
    }

    if (start.month() > now.month()) {
        start.date(1);
    }

    var getHours = function(day) {
        var hours = [750, 800, 850, 900, 950, 1000, 1050, 1100, 1150, 1200, 1250, 1300, 1350, 1400, 1450, 1500, 1550, 1600, 1650, 1700, 1750, 1800, 1850];
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
        /*_.each(employees[0], function(employee) {
            employee.openings = getOpenings();
            removeScheduledOnceBookings(employee);
        });*/
        var employee = employees[0][0];
        employee.openings = getOpenings();
        removeScheduledOnceBookings(employee);
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
                if (i !== -1) {
                    console.log('=======> One time booking on ' + date + ', t=' + time + ', h=' + hours);
                    employee.openings[date].splice(i, hours * 2);
                } else {
                    console.error('=======> Trying to schedule OnceBooking at a time not available.');
                }
            });
            removeScheduledWeeklyBookings(employee);
        });
    };

    var removeScheduledWeeklyBookings = function(employee) {
        db.sequelize.query('SELECT * FROM ScheduledWeeklyBookings WHERE EmployeeId = ' + employee.id).then(function(rows) {
            //res.json(rows[0]);
            _.each(rows[0], function(booking) {
                var runner = moment().day(booking.day),
                    time = booking.time,
                    hours = booking.hours;

                var days = [];
                days.push(booking);
                while (runner.month() <= MONTH) {
                    var date = runner.format("YYYY-MM-DD");
                    if (employee.openings[date] === undefined) {
                        runner.add(7, 'days');
                        continue;
                    }

                    var i = employee.openings[date].indexOf(time);
                    if (i !== -1) {
                        console.log('=======> Weekly booking on ' + date + ', t=' + time + ', h=' + hours);
                        employee.openings[date].splice(i, hours * 2);
                    } else {
                        console.error('=======> Trying to schedule WeeklyBooking at a time not available.');
                    }
                    runner.add(7, 'days');
                }
            });
            removeScheduledBiMonthlyBookings(employee);
        });
    };

    var removeScheduledBiMonthlyBookings = function(employee){
        db.sequelize.query('SELECT * FROM ScheduledBiMonthlyBookings WHERE EmployeeId = ' + employee.id).then(function(rows) {
            _.each(rows[0], function(booking) {
                var runner = moment().day(booking.day),
                    time = booking.time,
                    hours = booking.hours;
                    
                var days = [];
                days.push(booking);
                while (runner.month() <= MONTH) {
                    var date = runner.format("YYYY-MM-DD");
                    if (employee.openings[date] === undefined) {
                        runner.add(7, 'days');
                        continue;
                    }

                    var i = employee.openings[date].indexOf(time);
                    if (i !== -1) {
                        console.log('=======> Weekly booking on ' + date + ', t=' + time + ', h=' + hours);
                        employee.openings[date].splice(i, hours * 2);
                    } else {
                        console.error('=======> Trying to schedule WeeklyBooking at a time not available.');
                    }
                    runner.add(7, 'days');
                }
            });
            res.json(employee);
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