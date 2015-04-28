module.exports = function(sequelize, DataTypes) {
    var ScheduledBiMonthlyBooking = sequelize.define("ScheduledBiMonthlyBooking", {
        week: {
            type: DataTypes.INTEGER,
            validate: {
                min: 1,
                max: 2
            }
        },
        day: {
            type: DataTypes.INTEGER,
            validate: {
                min: 1,
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
                ScheduledBiMonthlyBooking.belongsTo(models.Booking);
                ScheduledBiMonthlyBooking.belongsTo(models.Employee);
            }
        }
    });

    return ScheduledBiMonthlyBooking;
};