module.exports = function(sequelize, DataTypes) {
    var ScheduledDailyBooking = sequelize.define("ScheduledDailyBooking", {
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
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
                ScheduledDailyBooking.belongsTo(models.Booking, {
                    onDelete: 'RESTRICT',
                    onUpdate: 'RESTRICT'
                });
                ScheduledDailyBooking.belongsTo(models.Employee, {
                    onDelete: 'RESTRICT',
                    onUpdate: 'RESTRICT'
                });
            }
        }
    });

    return ScheduledDailyBooking;
};