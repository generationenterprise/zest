module.exports = function(sequelize, DataTypes) {
  var BookingExtra = sequelize.define("BookingExtra", {
    notes: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        //BookingExtra.belongsTo(models.Customer);
      }
    }
  });

  return BookingExtra;
};