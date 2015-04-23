module.exports = function(sequelize, DataTypes) {
    var BiMonthlyBooking = sequelize.define("BiMonthlyBooking", {
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
        time: {
            type: DataTypes.INTEGER,
            validate: {
                min: 800,
                max: 1800
            }
        },
        hours: {
            type: DataTypes.INTEGER,
            validate: {
                min: 1
            }
        }
    }, {
        paranoid: true,
        classMethods: {
            associate: function(models) {
                BiMonthlyBooking.belongsTo(models.Booking);
                BiMonthlyBooking.belongsTo(models.Employee);
            }
        }
    });

    return BiMonthlyBooking;
};