if (!global.hasOwnProperty('db')) {
    var Sequelize = require('sequelize'),
        sequelize = null,
        fs = require("fs"),
        path = require("path");

    if (process.env.HEROKU_POSTGRESQL_COPPER_URL) {
        // the application is executed on Heroku ... use the postgres database
        sequelize = new Sequelize(process.env.HEROKU_POSTGRESQL_COPPER_URL, {
            dialect: 'postgres',
            protocol: 'postgres',
            port: match[4],
            host: match[3],
            logging: true //false
        })
    } else {
        // the application is executed on the local machine ... use mysql
        sequelize = new Sequelize('ZestServices', 'root', 'qwerty')
    }

    global.db = {
        Sequelize: Sequelize,
        sequelize: sequelize
    };

    fs.readdirSync(__dirname)
        .filter(function(file) {
            return (file.indexOf(".") !== 0) && (file !== "index.js");
        })
        .forEach(function(file) {
            var model = sequelize["import"](path.join(__dirname, file));
            global.db[model.name] = model;
        });

    Object.keys(global.db).forEach(function(modelName) {
        if ("associate" in global.db[modelName]) {
            global.db[modelName].associate(db);
        }
    });
}

module.exports = global.db
