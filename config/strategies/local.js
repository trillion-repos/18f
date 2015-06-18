'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	userService = require('./../../app/services/user.server.service');
	

module.exports = function() {
	// Use local strategy
	passport.use(new LocalStrategy({
			usernameField: 'sessionId',
			passwordField: 'sessionId'
		},
		function(sessionId, password, done) {
			userService.isAuthenticated(sessionId, function(err, isAuth){
				
				if(err){
					console.error("Error: " + err);
					return done(err);
				}else if(!isAuth){
					console.log("Unable to authenticate User" );
					return done(null, false);
					}
				
				userService.getUserInfo(sessionId, function(err, user){
					//console.log("the user: " + JSON.stringify(user));
					if(err)
						return done(err);
					else if(!user)
						return done(null, false);
					
					user.sessionId = sessionId;					
					userService.persistUserLocal(user);
					return done(null, user);
				});							
			}
			);			
		}
	));
};