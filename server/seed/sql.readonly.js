module.exports = function(db) {
	// --------------  Booking Types
    db.BookingType.create({
        name: 'cleaning',
        description: 'Cleaning service',
        baseRate: 36,
        marginalRate: 12
    });
    db.BookingType.create({
        name: 'fumigation',
        description: 'Fumigation service',
        baseRate: 50,
        marginalRate: 20
    });

    // --------------  Frequencies
    db.Frequency.create({
        name: 'once',
        description: 'Once',
        rate: 50
    });
    db.Frequency.create({
        name: 'weekly',
        description: 'Weekly',
        rate: 45
    });
    db.Frequency.create({
        name: 'bi-weekly',
        description: 'Bi-Weekly',
        rate: 40
    });
    db.Frequency.create({
        name: 'monthly',
        description: 'Monthly',
        rate: 35
    });

    // --------------  Extras
    db.Extra.create({
        name: 'laundry',
        icon: 'laundry.png',
        rate: 5,
        description: 'Laundry Wash & Dry'
    });
    db.Extra.create({
        name: 'fridge',
        icon: 'fridge.png',
        rate: 15,
        description: 'Inside Fridge'
    });
    db.Extra.create({
        name: 'oven',
        icon: 'oven.png',
        rate: 25,
        description: 'Inside Oven'
    });
    db.Extra.create({
        name: 'cabinets',
        icon: 'cabinets.png',
        rate: 35,
        description: 'Inside Cabinets'
    });
    db.Extra.create({
        name: 'windows',
        icon: 'windows.png',
        rate: 45,
        description: 'Interior Windows'
    });
    db.Extra.create({
        name: 'walls',
        icon: 'walls.png',
        rate: 55,
        description: 'Interior Walls'
    });
};
