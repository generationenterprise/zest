module.exports = function(sequelize, DataTypes) {
  var BookingType = sequelize.define("BookingType", {
    name: DataTypes.STRING,
  	description: DataTypes.STRING,
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