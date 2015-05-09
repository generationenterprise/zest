module.exports = function(db) {
    // --------------  Employees
    db.Employee.create({
        nickName: 'Sam',
        active: false
    });
    db.Employee.create({
        nickName: 'Liz',
        active: true
    });
    db.Employee.create({
        nickName: 'Joe',
        active: false
    });
    db.Employee.create({
        nickName: 'Bunmi',
        active: false
    });
    
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
        name: 'once',
        description: 'Once',
        rate: 50
    });
    db.Frequency.create({
        name: 'daily',
        description: 'Daily',
        rate: 35
    });
    db.Frequency.create({
        name: 'weekly',
        description: 'Weekly',
        rate: 40
    });
    db.Frequency.create({
        name: 'bi-weekly',
        description: 'Bi-Weekly',
        rate: 45
    });
    db.Frequency.create({
        name: 'monthly',
        description: 'Monthly',
        rate: 50
    });

    // --------------  Extras
    db.Extra.create({
        name: 'laundry',
        icon: 'circle_laundry.png',
        rate: 5,
        description: 'Laundry Wash & Dry'
    });
    db.Extra.create({
        name: 'fridge',
        icon: 'circle_fridge.png',
        rate: 15,
        description: 'Inside Fridge'
    });
    db.Extra.create({
        name: 'oven',
        icon: 'circle_oven.png',
        rate: 25,
        description: 'Inside Oven'
    });
    db.Extra.create({
        name: 'cabinets',
        icon: 'circle_cabinets.png',
        rate: 35,
        description: 'Inside Cabinets'
    });
    db.Extra.create({
        name: 'windows',
        icon: 'circle_windows.png',
        rate: 45,
        description: 'Interior Windows'
    });
};
