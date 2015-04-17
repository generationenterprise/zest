module.exports = function(sequelize, DataTypes) {
  var Pet = sequelize.define("Pet", {
  	type: DataTypes.ENUM('Dogs', 'Cats', 'Other'),
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