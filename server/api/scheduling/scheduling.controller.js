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
        start = moment().year(YEAR).month(MONTH).date(1),
        end;

    // If the target month is the current month then add the 3-day wait
    if (now.year() === start.year() && now.month() === start.month()) {
        start = moment();
        start.add(3, 'days');
        // If the actual start date falls in to next month then the target month has no openings
        if (start.month() !== now.month()) {
            return res.json(200, []);
        }
    }

    // If the start date falls in the past then return no openings
    if (start < now) {
        return res.json(200, []);
    }

    // Set the end date to the beginning of next month
    end = moment(start).add(1, 'months').date(1);

    // Returns an hour lyschedule array
    var createHourlySchedule = function(day) {
        var hours = [750, 800, 850, 900, 950, 1000, 1050, 1100, 1150, 1200, 1250, 1300, 1350, 1400, 1450, 1500, 1550, 1600, 1650, 1700, 1750, 1800, 1850];
        return hours;
    };

    // Returns a set of daily hourly schedules from 'start' to 'end'
    var createMomthlyShchedule = function() {
        var openings = {};
        var runner = moment(start);
        for (; runner < end; runner.add(1, 'days')) {
            // Ignore Sundays
            if (runner.day() !== 0) {
                var d = runner.format("YYYY-MM-DD");
                openings[d] = createHourlySchedule();
            }
        }
        return openings;
    }

    // Run day by day to a target day
    var runToDay = function(moment, day) {
        while (moment.day() !== day) {
            moment.add(1, 'days');
        }
    };

    // Given the start time and the block sixe, return true if the start time is available 
    // and the end time is where it should be (o/w theres an overlap w/ another booking)
    var isOpen = function(schedule, etime, hours) {
        var i = schedule.indexOf(etime);
        return ((i !== -1) && (schedule[i + 2 * hours] === (etime + 100 * hours)));
    };

    var closeOpening = function(schedule, etime, hours) {
        var i = schedule.indexOf(etime);
        schedule.splice(i, 2 * hours);
    };

    var doBook = function(type, date, schedule, etime, hours) {
        if (isOpen(schedule, etime, hours)) {
            console.log('=======> Blocking out time for ' + type + ': ' + moment(date).format('YYYY-MM-DD (ddd)') + ', et=' + etime + ', h=' + hours);
            closeOpening(schedule, etime, hours)
        } else {
            console.log('=======> Conflict at ' + type + ': ' + moment(date).format('YYYY-MM-DD (ddd)') + ', et=' + etime + ', h=' + hours);
        }
    };

    var gets  = function(input){
        var deferred = Q.defer();

        setTimeout(function(){
            deferred.resolve({out: input});
        },2*1000);

        return deferred.promise;
    };

    // _.each(employees[0], function(employee) {
    //     employee.openings = getOpenings();
    //     removeScheduledOnceBookings(employee);
    // });

    // db.sequelize.query('SELECT id, nickName FROM Employees WHERE deletedAt IS NULL').then(function(employees) {
    // 
    //     var employee = employees[0][0];
    //     employee.openings = createMomthlyShchedule();
    //     removeScheduledOnceBookings(employee);
    // });

    var removeScheduledOnceBookings = function(employee) {
        db.sequelize.query('SELECT * FROM ScheduledOnceBookings WHERE date >= \'' + start.format('YYYY/MM/DD') + '\' AND date < \'' + end.format('YYYY/MM/DD') + '\' AND EmployeeId = ' + employee.id).then(function(rows) {
            _.each(rows[0], function(booking) {
                var date = moment(booking.date).format("YYYY-MM-DD"),
                    etime = booking.etime,
                    hours = booking.hours;

                var schedule = employee.openings[date];
                doBook('OnceBooking', date, schedule, etime, hours);

            });
            removeScheduledWeeklyBookings(employee);
        });
    };

    var removeScheduledWeeklyBookings = function(employee) {
        db.sequelize.query('SELECT * FROM ScheduledWeeklyBookings WHERE EmployeeId = ' + employee.id).then(function(rows) {
            _.each(rows[0], function(booking) {
                var runner = moment(start),
                    day = booking.day,
                    etime = booking.etime,
                    hours = booking.hours;

                // Find the first target 'day' in the current week
                runToDay(runner, day);

                // While in the current month, move up 7 days to set weekly the booking
                while (runner.month() < end.month()) {
                    var date = runner.format("YYYY-MM-DD");
                    var schedule = employee.openings[date];
                    doBook('WeeklyBooking', date, schedule, etime, hours);
                    runner.add(7, 'days');
                }
            });
            removeScheduledMonthlyBookings(employee);
        });
    };

    var removeScheduledMonthlyBookings = function(employee) {
        db.sequelize.query('SELECT * FROM ScheduledMonthlyBookings WHERE EmployeeId = ' + employee.id).then(function(rows) {
            _.each(rows[0], function(booking) {
                var runner = moment(start).date(1),
                    week = booking.week,
                    day = booking.day,
                    etime = booking.etime,
                    hours = booking.hours;

                // Run to the target week with the month
                // Note: last week in the month may be 4th or 5th
                do {
                    runToDay(runner, day);
                    week--;
                } while (week && (runner.month() === start.month()))

                var date = runner.format("YYYY-MM-DD");
                var schedule = employee.openings[date];
                doBook('MonthlyBooking', date, schedule, etime, hours);
            });
            removeScheduledBiMonthlyBookings(employee);
        });

    };

    var removeScheduledBiMonthlyBookings = function(employee) {
        db.sequelize.query('SELECT * FROM ScheduledBiMonthlyBookings WHERE EmployeeId = ' + employee.id).then(function(rows) {
            _.each(rows[0], function(booking) {
                var runner = moment(start).date(1),
                    week = booking.week,
                    day = booking.day,
                    etime = booking.etime,
                    hours = booking.hours;

                if (week === 1) {
                    runToDay(runner, day);
                } else if (week === 2) {
                    runToDay(runner, day);
                    runToDay(runner, day);
                }
                var date = runner.format("YYYY-MM-DD");
                var schedule = employee.openings[date];
                doBook('BiMonthlyBooking', date, schedule, etime, hours);
                runToDay(runner, day);
                runToDay(runner, day);
                date = runner.format("YYYY-MM-DD");
                schedule = employee.openings[date];
                doBook('BiMonthlyBooking', date, schedule, etime, hours);
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