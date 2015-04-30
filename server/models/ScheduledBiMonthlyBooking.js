module.exports = function(sequelize, DataTypes) {
    var ScheduledBiMonthlyBooking = sequelize.define("ScheduledBiMonthlyBooking", {
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
                min: 750,
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
                ScheduledBiMonthlyBooking.belongsTo(models.Booking, {
                    onDelete: 'RESTRICT',
                    onUpdate: 'RESTRICT'
                });
                ScheduledBiMonthlyBooking.belongsTo(models.Employee, {
                    onDelete: 'RESTRICT',
                    onUpdate: 'RESTRICT'
                });
            }
        }
    });

    return ScheduledBiMonthlyBooking;
};