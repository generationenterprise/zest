module.exports = function(sequelize, DataTypes) {
    var Booking = sequelize.define("Booking", {
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        confirmed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        total: DataTypes.DECIMAL(10,2),
        paid: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        hours: {
            type: DataTypes.DECIMAL(10,2),
            validate: {
                min: 1,
                max: 10
            }
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