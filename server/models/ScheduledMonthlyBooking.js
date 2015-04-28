module.exports = function(sequelize, DataTypes) {
    var ScheduledMonthlyBooking = sequelize.define("ScheduledMonthlyBooking", {
        week: {
            type: DataTypes.INTEGER,
            validate: {
                min: 1,
                max: 5
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
                ScheduledMonthlyBooking.belongsTo(models.Booking);
                ScheduledMonthlyBooking.belongsTo(models.Employee);
            }
        }
    });

    return ScheduledMonthlyBooking; 
};