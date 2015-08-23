module.exports = function(sequelize, DataTypes) {
    var ScheduledBiWeeklyBooking = sequelize.define("ScheduledBiWeeklyBooking", {
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
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
                min: 0,
                max: 2400
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
                ScheduledBiWeeklyBooking.belongsTo(models.Booking, {
                    onDelete: 'RESTRICT',
                    onUpdate: 'RESTRICT'
                });
                ScheduledBiWeeklyBooking.belongsTo(models.Employee, {
                    onDelete: 'RESTRICT',
                    onUpdate: 'RESTRICT'
                });
            }
        }
    });

    return ScheduledBiWeeklyBooking;
};