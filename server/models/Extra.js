module.exports = function(sequelize, DataTypes) {
  var Extra = sequelize.define("Extra", {
  	name: DataTypes.STRING,
    description: DataTypes.STRING,
  	icon: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    notes: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        Extra.hasMany(models.Booking);
      }
    }
  });

  return Extra;
};