module.exports = function(sequelize, DataTypes) {
    var EmployeeSchedule = sequelize.define("EmployeeSchedule", {
        date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        e750:DataTypes.INTEGER,
        e800:DataTypes.INTEGER,
        e850:DataTypes.INTEGER,
        e900:DataTypes.INTEGER,
        e950:DataTypes.INTEGER,
        e1000:DataTypes.INTEGER,
        e1500:DataTypes.INTEGER,
        e1200:DataTypes.INTEGER,
        e1250:DataTypes.INTEGER,
        e1300:DataTypes.INTEGER,
        e1350:DataTypes.INTEGER,
        e1400:DataTypes.INTEGER,
        e1450:DataTypes.INTEGER,
        e1500:DataTypes.INTEGER,
        e1550:DataTypes.INTEGER,
        e1600:DataTypes.INTEGER,
        e1650:DataTypes.INTEGER,
        e1700:DataTypes.INTEGER,
        e1750:DataTypes.INTEGER,
        e1800:DataTypes.INTEGER,
        e1850:DataTypes.INTEGER
    }, {
        paranoid: true,
        classMethods: {
            associate: function(models) {
                EmployeeSchedule.belongsTo(models.Employee);
                EmployeeSchedule.belongsTo(models.Booking);
            }
        }
    });

    return EmployeeSchedule;
};