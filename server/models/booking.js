module.exports = function(sequelize, DataTypes) {
    var Booking = sequelize.define("Booking", {
        active: DataTypes.BOOLEAN,
        paid: DataTypes.BOOLEAN,
        day: {
            type: DataTypes.INTEGER,
            validate: {
                min: 0,
                max: 6
            }
        },
        time: {
            type: DataTypes.INTEGER,
            validate: {
                min: 0,
                max: 2400
            }
        },
        hours: {
            type: DataTypes.DECIMAL(10,2),
            validate: {
                min: 0,
                max: 12
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