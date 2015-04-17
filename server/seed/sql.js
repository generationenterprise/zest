module.exports = function(db) {
    db.BookingType.create({
        name: 'cleaning',
        description: 'Cleaning service'
    });
    db.BookingType.create({
        name: 'fumigation',
        description: 'Fumigation service'
    });

    db.Frequency.create({
        name: 'weekly',
        description: 'Weekly'
    });
    db.Frequency.create({
        name: 'bi-weekly',
        description: 'Bi-Weekly'
    });
    db.Frequency.create({
        name: 'monthly',
        description: 'Monthly'
    });

    db.Extra.create({
        name: 'laundry',
        icon: 'laundry',
        price: 5,
        description: 'Laundry Wash & Dry'
    });
    db.Extra.create({
        name: 'fridge',
        icon: 'fridge',
        price: 15,
        description: 'Inside Fridge'
    });
    db.Extra.create({
        name: 'over',
        icon: 'over',
        price: 25,
        description: 'Inside Overn'
    });
    db.Extra.create({
        name: 'cabinets',
        icon: 'cabinets',
        price: 35,
        description: 'Inside Cabinets'
    });
    db.Extra.create({
        name: 'windows',
        name: 'windows',
        price: 45,
        description: 'Interior Windows'
    });
    db.Extra.create({
        name: 'walls',
        icon: 'walls',
        price: 55,
        description: 'Interior Walls'
    });

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
