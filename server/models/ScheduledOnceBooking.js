module.exports = function(sequelize, DataTypes) {
    var ScheduledOnceBooking = sequelize.define("ScheduledOnceBooking", {
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
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
                ScheduledOnceBooking.belongsTo(models.Booking, {
                    onDelete: 'RESTRICT',
                    onUpdate: 'RESTRICT'
                });
                ScheduledOnceBooking.belongsTo(models.Employee, {
                    onDelete: 'RESTRICT',
                    onUpdate: 'RESTRICT'
                });
            }
        }
    });

    return ScheduledOnceBooking;
};