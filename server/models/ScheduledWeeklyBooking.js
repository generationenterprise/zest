module.exports = function(sequelize, DataTypes) {
    var ScheduledWeeklyBooking = sequelize.define("ScheduledWeeklyBooking", {
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
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
                min: 0,
                max: 2400
            }
        },
        hours: {
            type: DataTypes.DECIMAL(10, 2),
            validate: {
                min: 1,
                max: 10
            }
        }
    }, {
        paranoid: true,
        classMethods: {
            associate: function(models) {
                ScheduledWeeklyBooking.belongsTo(models.Booking, {
                    onDelete: 'RESTRICT',
                    onUpdate: 'RESTRICT'
                });
                ScheduledWeeklyBooking.belongsTo(models.Employee, {
                    onDelete: 'RESTRICT',
                    onUpdate: 'RESTRICT'
                });
            }
        }
    });

    return ScheduledWeeklyBooking;
};