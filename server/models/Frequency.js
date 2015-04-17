module.exports = function(sequelize, DataTypes) {
  var Frequency = sequelize.define("Frequency", {
    name: DataTypes.STRING,
  	description: DataTypes.STRING,
    notes: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        //Frequency.belongsTo(models.Customer);
      }
    }
  });

  return Frequency;
};