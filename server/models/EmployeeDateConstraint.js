module.exports = function(sequelize, DataTypes) {
    var EmployeeDateConstraint = sequelize.define("EmployeeDateConstraint", {
        date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        max: {
            type: DataTypes.DECIMAL(10, 2),
            validate: {
                min: 0, max: 10
            }
        }
    }, {
        paranoid: true,
        classMethods: {
            associate: function(models) {
                EmployeeDateConstraint.belongsTo(models.Employee);
            }
        }
    });

    return EmployeeDateConstraint;
};