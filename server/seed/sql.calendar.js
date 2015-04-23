module.exports = function(db) {
	
    db.BookingType.create({
        name: 'cleaning',
        description: 'Cleaning service',
        baseRate: 36,
        marginalRate: 12
    });
};
