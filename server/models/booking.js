module.exports = function(sequelize, DataTypes) {
    var Booking = sequelize.define("Booking", {
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        paid: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        notes: DataTypes.TEXT
    }, {
        paranoid: true,
        classMethods: {
            associate: function(models) {
                Booking.belongsTo(models.Customer, {
                    onDelete: 'RESTRICT',
                    onUpdate: 'RESTRICT'
                });
                Booking.belongsTo(models.BookingType, {
                    onDelete: 'RESTRICT',
                    onUpdate: 'RESTRICT'
                });
                Booking.belongsTo(models.Checkout, {
                    onDelete: 'RESTRICT',
                    onUpdate: 'RESTRICT'
                });
                Booking.belongsTo(models.Employee, {
                    onDelete: 'RESTRICT',
                    onUpdate: 'RESTRICT'
                });
                Booking.hasOne(models.Cleaning, {
                    onDelete: 'RESTRICT',
                    onUpdate: 'RESTRICT'
                });
            }
        }
    });

    return Booking;
};