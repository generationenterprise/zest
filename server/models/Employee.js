module.exports = function(sequelize, DataTypes) {
  var Employee = sequelize.define("Employee", {
    firtName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    homePhone: DataTypes.BIGINT,
    mobilePhone: DataTypes.BIGINT,
    address: DataTypes.TEXT,
    city: DataTypes.STRING,
    postcode: DataTypes.STRING,
    notes: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        //Employee.hasMany(models.Booking)
      }
    }
  });

  return Employee;
};