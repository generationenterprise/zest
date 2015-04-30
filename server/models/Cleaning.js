 module.exports = function(sequelize, DataTypes) {
     var Cleaning = sequelize.define("Cleaning", {
         bedrooms: {
             type: DataTypes.DECIMAL(10, 2),
             validate: {
                 min: 1
             }
         },
         bathrooms: {
             type: DataTypes.DECIMAL(10, 2),
             validate: {
                 min: 1
             }
         },
         kitchens: DataTypes.DECIMAL(10, 2),
         others: DataTypes.DECIMAL(10, 2),
         instructions: DataTypes.STRING,
         notes: DataTypes.TEXT
     }, {
         paranoid: true,
         classMethods: {
             associate: function(models) {
                 Cleaning.belongsTo(models.Frequency, {
                    onDelete: 'RESTRICT',
                    onUpdate: 'RESTRICT'
                });
                 Cleaning.belongsTo(models.Booking, {
                    onDelete: 'RESTRICT',
                    onUpdate: 'RESTRICT'
                });
                 Cleaning.hasMany(models.Extra, {
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE'
                });
                 Cleaning.hasMany(models.Pet, {
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE'
                });
             }
         }
     });

     return Cleaning;
 };