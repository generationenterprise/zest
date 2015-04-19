 module.exports = function(sequelize, DataTypes) {
  var Cleaning = sequelize.define("Cleaning", {
    bedrooms: DataTypes.DECIMAL(10,2),
    bathrooms: DataTypes.DECIMAL(10,2),
    kitchens: DataTypes.DECIMAL(10,2),
    others: DataTypes.DECIMAL(10,2),
    instructions: DataTypes.STRING,
    notes: DataTypes.TEXT
  }, {
    paranoid: true,
    classMethods: {
      associate: function(models) {
        Cleaning.belongsTo(models.Frequency);
        Cleaning.belongsTo(models.Booking);
        Cleaning.hasMany(models.Extra);
        Cleaning.hasMany(models.Pet);
      }
    }
  });

  return Cleaning;
};