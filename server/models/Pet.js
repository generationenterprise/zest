module.exports = function(sequelize, DataTypes) {
  var Pet = sequelize.define("Pet", {
    dogs: DataTypes.BOOLEAN,
    cats: DataTypes.BOOLEAN,
    other: DataTypes.BOOLEAN,
    description: DataTypes.STRING,
    notes: DataTypes.TEXT
  }, {
    paranoid: true,
    classMethods: {
      associate: function(models) {
        Pet.hasMany(models.Booking);
      }
    }
  });

  return Pet;
};