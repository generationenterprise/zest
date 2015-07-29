module.exports = function(sequelize, DataTypes) {
    var Customer = sequelize.define("Customer", {
        uid: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        mobilePhone: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: DataTypes.STRING,
        company: DataTypes.STRING,
        homePhone: DataTypes.BIGINT,
        address: DataTypes.TEXT,
        city: DataTypes.STRING,
        neighborhood: DataTypes.STRING,
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