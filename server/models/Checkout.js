module.exports = function(sequelize, DataTypes) {
  var Checkout = sequelize.define("Checkout", {
    price: DataTypes.DECIMAL (10,2),
    paid: DataTypes.DECIMAL(10,2),
    type: DataTypes.STRING,
    description: DataTypes.STRING,
    notes: DataTypes.TEXT
  }, {
    paranoid: true,
    classMethods: {
      associate: function(models) {
        //Checkout.belongsTo(models.Customer);
      }
    }
  });

  return Checkout;
};