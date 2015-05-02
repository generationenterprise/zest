var moment = require('moment');

module.exports = function(db) {
    // Bi-Weekly

    db.ScheduledBiWeeklyBooking.create({
        EmployeeId: 2,
        BookingId: 1,
        CustomerId: Math.floor(Math.random() * 6) + 1,
        week: 1,
        day: 2,
        etime: 850,
        hours: 1
    });

    db.ScheduledBiWeeklyBooking.create({
        EmployeeId: 2,
        BookingId: 2,
        CustomerId: Math.floor(Math.random() * 6) + 1,
        week: 1,
        day: 5,
        etime: 1150,
        hours: 4
    });

    db.ScheduledBiWeeklyBooking.create({
        EmployeeId: 2,
        BookingId: 3,
        CustomerId: Math.floor(Math.random() * 6) + 1,
        week: 2,
        day: 2,
        etime: 850,
        hours: 1
    });

    // Monthly

    db.ScheduledMonthlyBooking.create({
        EmployeeId: 1,
        BookingId: 4,
        CustomerId: Math.floor(Math.random() * 6) + 1,
        week: 1,
        day: 2,
        etime: 750,
        hours: 1
    });

    db.ScheduledMonthlyBooking.create({
        EmployeeId: 2,
        BookingId: 5,
        CustomerId: Math.floor(Math.random() * 6) + 1,
        week: 5,
        day: 2,
        etime: 750,
        hours: 1.5
    });

    // ------ Weekly

    db.ScheduledWeeklyBooking.create({
        EmployeeId: 2,
        BookingId: 6,
        CustomerId: Math.floor(Math.random() * 6) + 1,
        day: 1,
        etime: 1050,
        hours: 1
    });

    db.ScheduledWeeklyBooking.create({
        EmployeeId: 1,
        BookingId: 7,
        CustomerId: Math.floor(Math.random() * 6) + 1,
        day: 4,
        etime: 1150,
        hours: 3.5
    });

    // ------ Once

    db.ScheduledOnceBooking.create({
        EmployeeId: 1,
        BookingId: 8,
        CustomerId: Math.floor(Math.random() * 6) + 1,
        date: moment().date(3),
        etime: 750,
        hours: 2
    });

    db.ScheduledOnceBooking.create({
        EmployeeId: 1,
        BookingId: 9,
        CustomerId: Math.floor(Math.random() * 6) + 1,
        date: moment().add(1, 'months').date(16),
        etime: 950,
        hours: 1
    });

    db.ScheduledOnceBooking.create({
        EmployeeId: 1,
        BookingId: 10,
        CustomerId: Math.floor(Math.random() * 6) + 1,
        date: moment().add(1, 'months').date(11),
        etime: 850,
        hours: 4
    });

    db.ScheduledOnceBooking.create({
        EmployeeId: 1,
        BookingId: 11,
        CustomerId: Math.floor(Math.random() * 6) + 1,
        date: moment().add(1, 'months').date(15),
        etime: 1050,
        hours: 2
    });

    db.ScheduledOnceBooking.create({
        EmployeeId: 1,
        BookingId: 12,
        CustomerId: Math.floor(Math.random() * 6) + 1,
        date: moment().add(1, 'months').date(19),
        etime: 1150,
        hours: 2
    });

    db.ScheduledOnceBooking.create({
        EmployeeId: 1,
        BookingId: 13,
        CustomerId: Math.floor(Math.random() * 6) + 1,
        date: moment().add(1, 'months').date(20),
        etime: 1250,
        hours: 2
    });

    db.ScheduledOnceBooking.create({
        EmployeeId: 1,
        BookingId: 14,
        CustomerId: Math.floor(Math.random() * 6) + 1,
        date: moment().add(1, 'months').date(25),
        etime: 950,
        hours: 3
    });

    db.ScheduledOnceBooking.create({
        EmployeeId: 1,
        BookingId: 15,
        CustomerId: Math.floor(Math.random() * 6) + 1,
        date: moment().add(1, 'months').date(25),
        etime: 1450,
        hours: 3
    });
};