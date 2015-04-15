module.exports = function(sequelize, DataTypes) {
  var Checkout = sequelize.define("Checkout", {
    price: DataTypes.DECIMAL,
    description: DataTypes.STRING,
    notes: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        //Checkout.belongsTo(models.Customer);
      }
    }
  });

  return Checkout;
};