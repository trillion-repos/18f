'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport'),
	userServices = require('./../app/services/user.server.service'),
	path = require('path'),
	config = require('./config');
	
/**
 * Module init function.
 */
module.exports = function() {
	// Serialize sessions
	passport.serializeUser(function(user, done) {
		//console.log("Serializing: " + JSON.stringify(user));
		var tempUser = {username:user.username, sessionId:user.sessionId};
		done(null, tempUser);
	});

	// Deserialize sessions
	passport.deserializeUser(function(user, done) {
		if (!user)
			done(new Error("User not found in request"), null);
	

		userServices.getUserInfoLocal(user.username, function(user, err){
			//console.log("USER: "  + JSON.stringify(user));
			done(err, user);
		});		
	
		//asyncronously hit Isaac to keep that session alive
		userServices.isAuthenticated(user.sessionId, function(err, isAuth){
			if(err)
				console.err(err);
		});		

	});

	// Initialize strategies
	config.getGlobbedFiles('./config/strategies/**/*.js').forEach(function(strategy) {
		require(path.resolve(strategy))();
	});
};