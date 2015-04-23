module.exports = function(sequelize, DataTypes) {
    var MonthlyBooking = sequelize.define("MonthlyBooking", {
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
                MonthlyBooking.belongsTo(models.Booking);
                MonthlyBooking.belongsTo(models.Employee);
            }
        }
    });

    return MonthlyBooking;
};