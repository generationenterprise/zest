module.exports = function(sequelize, DataTypes) {
    var ScheduledWeeklyBooking = sequelize.define("ScheduledWeeklyBooking", {
        day: {
            type: DataTypes.INTEGER,
            validate: {
                min: 1,
                max: 6
            }
        },
        time: {
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
                ScheduledWeeklyBooking.belongsTo(models.Booking);
                ScheduledWeeklyBooking.belongsTo(models.Employee);
            }
        }
    });

    return ScheduledWeeklyBooking;
};