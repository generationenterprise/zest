module.exports = function(sequelize, DataTypes) {
  var Extra = sequelize.define("Extra", {
  	price: DataTypes.DECIMAL,
  	description: DataTypes.STRING,
  	icon: DataTypes.STRING,
    notes: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        //Extra.belongsTo(models.Customer);
      }
    }
  });

  return Extra;
};