module.exports = function(db) {
    require('./sql.readonly')(db);
    require('./sql.calendar')(db);

    /*var customer = db.Customer.create({
            username: 'brices@gmail.com',
            password: 'somethingsecret',
            firstName: 'Samuel',
            lastName: 'Brice',
            company: 'ACME',
            email: 'brices@gmail.com',
            homePhone: 6464502537,
            cellPhone: 6464502537,
            address: '30-48 32nd Street',
            city: 'Lagos',
            postcode: 'ZS234 HB44',
            referrer: 'Google',
            notes: 'VIP customer'
        }).success(function(c) {

            var booking = db.Booking.create({
                active: true,
                day: 'Sunday',
                time: 900,
                hours: 2,
                notes: "Nothing special",
                BookingTypeId: 1
            }).success(function(b) {

                c.setBookings([b]);
            });

            var booking2 = db.Booking.create({
                active: false,
                day: 'Sunday',
                time: 900,
                hours: 2,
                notes: "Historical , not active."
            }).success(function(b) {

                c.setBookings([b]);
            });
        });*/
};
