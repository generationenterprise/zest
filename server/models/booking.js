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
        Booking.belongsTo(models.BookingType);
        Booking.belongsTo(models.Frequency);
        Booking.belongsTo(models.Checkout);
        Booking.belongsTo(models.Employee);
        Booking.hasMany(models.Extra);
      }
    }
  });

  return Booking;
};