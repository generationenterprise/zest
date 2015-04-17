
module.exports = function(sequelize, DataTypes) {
  var Customer = sequelize.define("Customer", {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    firtName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    company: DataTypes.STRING,
    email: DataTypes.STRING,
    homePhone: DataTypes.BIGINT,
    mobilePhone: DataTypes.BIGINT,
    address: DataTypes.TEXT,
    city: DataTypes.STRING,
    postcode: DataTypes.STRING,
    referrer: DataTypes.STRING,
    notes: DataTypes.TEXT
  }, {
    paranoid: true,
    classMethods: {
      associate: function(models) {
        Customer.hasMany(models.Booking)
      }
    }
  });

  return Customer;
};