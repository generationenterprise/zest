module.exports = function(sequelize, DataTypes) {
    var WeeklyBooking = sequelize.define("WeeklyBooking", {
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
                WeeklyBooking.belongsTo(models.Booking);
                WeeklyBooking.belongsTo(models.Employee);
            }
        }
    });

    return WeeklyBooking;
};