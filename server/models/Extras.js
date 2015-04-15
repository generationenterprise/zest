module.exports = function(sequelize, DataTypes) {
  var Extras = sequelize.define("Extras", {
  	price: DataTypes.DECIMAL,
  	description: DataTypes.STRING,
  	icon: DataTypes.STRING,
    notes: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        //Extras.belongsTo(models.Customer);
      }
    }
  });

  return Extras;
};