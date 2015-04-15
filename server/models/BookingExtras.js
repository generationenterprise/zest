module.exports = function(sequelize, DataTypes) {
  var BookingExtras = sequelize.define("BookingExtras", {
    notes: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        //BookingExtras.belongsTo(models.Customer);
      }
    }
  });

  return BookingExtras;
};