module.exports = function(db) {
	// --------------  Booking Types
    db.BookingType.create({
        name: 'cleaning',
        description: 'Cleaning service'
    });
    db.BookingType.create({
        name: 'fumigation',
        description: 'Fumigation service'
    });

    // --------------  Frequencies
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

    // --------------  Extras
    db.Extra.create({
        name: 'laundry',
        icon: 'laundry.png',
        price: 5,
        description: 'Laundry Wash & Dry'
    });
    db.Extra.create({
        name: 'fridge',
        icon: 'fridge.png',
        price: 15,
        description: 'Inside Fridge'
    });
    db.Extra.create({
        name: 'oven',
        icon: 'oven.png',
        price: 25,
        description: 'Inside Oven'
    });
    db.Extra.create({
        name: 'cabinets',
        icon: 'cabinets.png',
        price: 35,
        description: 'Inside Cabinets'
    });
    db.Extra.create({
        name: 'windows',
        icon: 'windows.png',
        price: 45,
        description: 'Interior Windows'
    });
    db.Extra.create({
        name: 'walls',
        icon: 'walls.png',
        price: 55,
        description: 'Interior Walls'
    });
};
