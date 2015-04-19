module.exports = function(sequelize, DataTypes) {
  var Booking = sequelize.define("Booking", {
    active: DataTypes.BOOLEAN,
    paid: DataTypes.BOOLEAN,
    day: DataTypes.ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'),
    time: DataTypes.INTEGER,
    hours: DataTypes.DECIMAL(10,2),
    rate: DataTypes.DECIMAL(10,2),
    notes: DataTypes.TEXT
  }, {
    paranoid: true,
    classMethods: {
      associate: function(models) {
        Booking.belongsTo(models.Customer);
        Booking.belongsTo(models.BookingType);
        Booking.belongsTo(models.Frequency);
        Booking.belongsTo(models.Checkout);
        Booking.belongsTo(models.Employee);
        Booking.hasMany(models.Extra);
        Booking.hasMany(models.Pet);
      }
    }
  });

  return Booking;
};