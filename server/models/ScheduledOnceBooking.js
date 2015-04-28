module.exports = function(sequelize, DataTypes) {
    var ScheduledOnceBooking = sequelize.define("ScheduledOnceBooking", {
        date: {
            type: DataTypes.DATE,
            validate: {
                min: 1,
                max: 31
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
            type: DataTypes.DECIMAL(10,2),
            validate: {
                min: 1,
                max: 10
            }
        }
    }, {
        paranoid: true,
        classMethods: {
            associate: function(models) {
                ScheduledOnceBooking.belongsTo(models.Booking);
                ScheduledOnceBooking.belongsTo(models.Employee);
            }
        }
    });

    return ScheduledOnceBooking;
};