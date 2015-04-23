module.exports = function(sequelize, DataTypes) {
    var OnceBooking = sequelize.define("OnceBooking", {
        date: {
            type: DataTypes.DATE,
            validate: {
                min: 1,
                max: 31
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
                min: 1,
                max: 10
            }
        }
    }, {
        paranoid: true,
        classMethods: {
            associate: function(models) {
                OnceBooking.belongsTo(models.Booking);
                OnceBooking.belongsTo(models.Employee);
            }
        }
    });

    return OnceBooking;
};