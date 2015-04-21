
module.exports = function(sequelize, DataTypes) {
  var Customer = sequelize.define("Customer", {
    uid: DataTypes.STRING,
    username: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    company: DataTypes.STRING,
    email: DataTypes.STRING,
    homePhone: DataTypes.BIGINT,
    mobilePhone: DataTypes.BIGINT,
    address: DataTypes.TEXT,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
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