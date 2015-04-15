module.exports = function(sequelize, DataTypes) {
  var Booking = sequelize.define("Booking", {
    active: DataTypes.BOOLEAN,
    day: DataTypes.ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'),
    time: DataTypes.INTEGER,
    hours: DataTypes.DECIMAL,
    notes: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        Booking.belongsTo(models.Customer);
      }
    }
  });

  return Booking;
};