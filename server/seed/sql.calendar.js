var moment = require('moment');

module.exports = function(db) {
	
    db.ScheduledOnceBooking.create({
        EmployeeId: 1,
        date: moment().date(29),
        time: 800,
        hours: 2
    });

    db.ScheduledOnceBooking.create({
        EmployeeId: 1,
        date: moment().add(1,'months').date(16),
        time: 1000,
        hours: 1
    });

    db.ScheduledOnceBooking.create({
        EmployeeId: 1,
        date: moment().add(1,'months').date(11),
        time: 900,
        hours: 4
    });

    db.ScheduledOnceBooking.create({
        EmployeeId: 1,
        date: moment().add(1,'months').date(15),
        time: 1100,
        hours: 2
    });

    db.ScheduledOnceBooking.create({
        EmployeeId: 1,
        date: moment().add(1,'months').date(19),
        time: 1200,
        hours: 2
    });

    db.ScheduledOnceBooking.create({
        EmployeeId: 1,
        date: moment().add(1,'months').date(20),
        time: 1300,
        hours: 2
    });

    db.ScheduledOnceBooking.create({
        EmployeeId: 1,
        date: moment().add(1,'months').date(25),
        time: 1000,
        hours: 3
    });

    db.ScheduledOnceBooking.create({
        EmployeeId: 1,
        date: moment().add(1,'months').date(25),
        time: 1500,
        hours: 3
    });

    db.ScheduledOnceBooking.create({
        EmployeeId: 1,
        date: moment().add(2,'months').date(20),
        time: 1000,
        hours: 2.5
    });
};
