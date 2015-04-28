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
        day: {
            type: DataTypes.INTEGER,
            validate: {
                min: 0,
                max: 6
            }
        },
        etime: {
            type: DataTypes.INTEGER,
            validate: {
                min: 800,
                max: 1800
            }
        },
        hours: {
            type: DataTypes.DECIMAL(10, 2),
            validate: {
                min: 0,
                max: 10
            }
        },
        notes: DataTypes.TEXT
    }, {
        paranoid: true,
        classMethods: {
            associate: function(models) {
                Booking.belongsTo(models.Customer);
                Booking.belongsTo(models.BookingType);
                Booking.belongsTo(models.Checkout);
                Booking.belongsTo(models.Employee);
                Booking.hasOne(models.Cleaning);
            }
        }
    });

    return Booking;
};