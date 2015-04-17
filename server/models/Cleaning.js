module.exports = function(sequelize, DataTypes) {
  var Cleaning = sequelize.define("Cleaning", {
    bedrooms: DataTypes.DECIMAL,
    bathrooms: DataTypes.DECIMAL,
    kitchens: DataTypes.DECIMAL,
    others: DataTypes.DECIMAL,
    instructions: DataTypes.STRING,
    notes: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        Cleaning.belongsTo(models.Booking);
      }
    }
  });

  return Cleaning;
};