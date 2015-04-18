module.exports = function(sequelize, DataTypes) {
  var BookingType = sequelize.define("BookingType", {
    name: DataTypes.STRING,
  	description: DataTypes.STRING,
    baseRate: DataTypes.DECIMAL(10,2),
    marginalRate: DataTypes.DECIMAL(10,2),
    notes: DataTypes.TEXT
  }, {
    paranoid: true,
    classMethods: {
      associate: function(models) {
        //BookingType.belongsTo(models.Customer);
      }
    }
  });

  return BookingType;
};