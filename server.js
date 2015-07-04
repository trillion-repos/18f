'use strict';
/**
 * Module dependencies.
 */
var init = require('./config/init')(),
	config = require('./config/config'),
	//dbConn = require('./config/dbConnection'),
	//mongoose = require('mongoose'),
	chalk = require('chalk');
	

/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */
// Bootstrap db connections
//dbConn.createConnection(config.db);
//dbConn.createOraConnection(config.famsUser, config.famsPassword, config.famsConnectionString, config.poolMax, config.poolMin, config.poolTimeout);

/*
// Bootstrap db connection
var db = mongoose.connect(config.db, function(err) {
	if (err) {
		console.error(chalk.red('Could not connect to MongoDB!'));
		console.log(chalk.red(err));
	}
});*/

// Init the express application
var app = require('./config/express')();


// Start the app by listening on <port>
app.listen(config.port);

// Expose app
exports = module.exports = app;

// Logging initialization
console.log('MEAN.JS application started on port ' + config.port);