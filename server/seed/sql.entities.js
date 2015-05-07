module.exports = function(db) {
    // --------------  Employees
    db.Employee.create({
        nickName: 'Sam',
        active: true
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
        active: true
    });
    // --------------  Customer
    for (var i = 0; i < 7; i++) {
        db.Customer.create({
            uid: i + '86df4',
            username: 'user' + i + '@gmail.com',
            firstName: 'First' + i,
            lastName: 'Brice' + i,
            email: 'email' + i + '@gmail.com',
            mobilePhone: (123456789 + i)
        });
    }
    // --------------  Bookings
    for (var j = 0; j < 15; j++) {
        db.Booking.create({
            CustomerId: (Math.floor(Math.random() * 6) + 1),
            EmployeeId: 1,
            active: true,
            paid: true
        });
    }
};