module.exports = function(sequelize, DataTypes) {
  var BookingType = sequelize.define("BookingType", {
  	description: DataTypes.STRING,
    notes: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        //BookingType.belongsTo(models.Customer);
      }
    }
  });

  return BookingType;
};