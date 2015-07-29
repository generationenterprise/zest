module.exports = function(sequelize, DataTypes) {
    var Extra = sequelize.define("Extra", {
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        icon: DataTypes.STRING,
        variable: DataTypes.BOOLEAN,
        rate: DataTypes.DECIMAL(10, 2),
        notes: DataTypes.TEXT
    }, {
        paranoid: true,
        classMethods: {
            associate: function(models) {
                Extra.hasMany(models.Cleaning, {
                    onDelete: 'RESTRICT',
                    onUpdate: 'RESTRICT'
                });
            }
        }
    });

    return Extra;
};