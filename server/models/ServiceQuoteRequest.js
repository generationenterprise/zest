module.exports = function(sequelize, DataTypes) {
    var ServiceQuoteRequest = sequelize.define("ServiceQuoteRequest", {
        type: DataTypes.STRING,
        fullName: DataTypes.STRING,
        email: DataTypes.STRING,
        mobilePhone: DataTypes.BIGINT,
        location: DataTypes.STRING,
        bestTime: DataTypes.STRING,
        description: DataTypes.TEXT,
        notes: DataTypes.TEXT
    }, {
        paranoid: true,
        classMethods: {
            associate: function(models) {
            }
        }
    });

    return ServiceQuoteRequest;
};