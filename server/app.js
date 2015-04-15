/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express'),
	mongoose = require('mongoose'),
	config = require('./config/environment'),
	db = require('./models');

// Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options);

// Populate DB with sample data
if (config.seedDB) {
    require('./seed/mongo');
}

// Setup server
var app = express(),
	server = require('http').createServer(app);

require('./config/express')(app);
require('./routes')(app);

// Sync Sequelize and start server
db.sequelize.sync({force: config.force}).then(function() {
	if(config.seedDB){
		require('./seed/sql')(db);
	}
    server.listen(config.port, config.ip, function() {
        console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
    });
});

// Expose app
exports = module.exports = app;
