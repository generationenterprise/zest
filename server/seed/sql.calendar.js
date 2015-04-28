var moment = require('moment');

module.exports = function(db) {
    // Bi-Monthly

    db.ScheduledBiMonthlyBooking.create({
        EmployeeId: 1,
        week: 1,
        day: 2,
        time: 900,
        hours: 1
    });

    db.ScheduledBiMonthlyBooking.create({
        EmployeeId: 1,
        week: 1,
        day: 5,
        time: 1200,
        hours: 4
    });

    db.ScheduledBiMonthlyBooking.create({
        EmployeeId: 1,
        week: 2,
        day: 2,
        time: 900,
        hours: 1
    });

    // ------ Weekly

    db.ScheduledWeeklyBooking.create({
        EmployeeId: 1,
        day: 1,
        etime: 1050,
        hours: 1
    });

    db.ScheduledWeeklyBooking.create({
        EmployeeId: 1,
        day: 4,
        etime: 1150,
        hours: 3
    });

    // ------ Once
	
    db.ScheduledOnceBooking.create({
        EmployeeId: 1,
        date: moment().date(3),
        etime: 750,
        hours: 2
    });

    db.ScheduledOnceBooking.create({
        EmployeeId: 1,
        date: moment().add(1,'months').date(16),
        etime: 950,
        hours: 1
    });

    db.ScheduledOnceBooking.create({
        EmployeeId: 1,
        date: moment().add(1,'months').date(11),
        etime: 850,
        hours: 4
    });

    db.ScheduledOnceBooking.create({
        EmployeeId: 1,
        date: moment().add(1,'months').date(15),
        etime: 1050,
        hours: 2
    });

    db.ScheduledOnceBooking.create({
        EmployeeId: 1,
        date: moment().add(1,'months').date(19),
        etime: 1150,
        hours: 2
    });

    db.ScheduledOnceBooking.create({
        EmployeeId: 1,
        date: moment().add(1,'months').date(20),
        etime: 1250,
        hours: 2
    });

    db.ScheduledOnceBooking.create({
        EmployeeId: 1,
        date: moment().add(1,'months').date(25),
        etime: 950,
        hours: 3
    });

    db.ScheduledOnceBooking.create({
        EmployeeId: 1,
        date: moment().add(1,'months').date(25),
        etime: 1450,
        hours: 3
    });

    db.ScheduledOnceBooking.create({
        EmployeeId: 1,
        date: moment().add(2,'months').date(20),
        etime: 950,
        hours: 2.5
    });
};
