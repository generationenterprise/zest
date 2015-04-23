module.exports = function(sequelize, DataTypes) {
    var Customer = sequelize.define("Customer", {
        uid: {
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        company: DataTypes.STRING,
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        homePhone: DataTypes.BIGINT,
        mobilePhone: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
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