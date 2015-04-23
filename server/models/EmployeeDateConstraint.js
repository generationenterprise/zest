module.exports = function(sequelize, DataTypes) {
    var EmployeeDateConstraint = sequelize.define("EmployeeDateConstraint", {
        date: DataTypes.DATE,
        maxBlock: DataTypes.DECIMAL(10,2)
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