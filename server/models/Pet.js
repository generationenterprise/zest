module.exports = function(sequelize, DataTypes) {
  var Pet = sequelize.define("Pet", {
    dogs: DataTypes.BOOLEAN,
    cats: DataTypes.BOOLEAN,
    other: DataTypes.BOOLEAN,
    rate: DataTypes.DECIMAL(10,2),
    description: DataTypes.STRING,
    notes: DataTypes.TEXT
  }, {
    paranoid: true,
    classMethods: {
      associate: function(models) {
        Pet.belongsTo(models.Cleaning);
      }
    }
  });

  return Pet;
};