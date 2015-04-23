module.exports = function(sequelize, DataTypes) {
    var BookingType = sequelize.define("BookingType", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        notes: DataTypes.TEXT
    }, {
        paranoid: true,
        classMethods: {
            associate: function(models) {
                //BookingType.belongsTo(models.Customer);
            }
        }
    });

    return BookingType;
};