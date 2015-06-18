'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	errorHandler = require('../errors.server.controller'),
	passport = require('passport'),
	config = require('./../../../config/config'),
	userService = require('./../../services/user.server.service');

/**
 * Signin after passport authentication
 */
module.exports.signin = function(req, res, next) {
	passport.authenticate('local', function(err, user, info) {
		//console.log("User: " + JSON.stringify(user));
		if (err) {
			console.error("Error: " + JSON.stringify(err));
			res.status(400).send(info);
		} else if(!user){
			res.redirect(config.isaacHome);		
		}else {
			// Remove sensitive data before login
			user.password = undefined;
			user.salt = undefined;

			req.login(user, function(err) {
				
				if (err) {
					res.status(400).send(err);					
				} else {
					res.redirect('/');
				}
			});
		}
	})(req, res, next);
	
	
};

/**
 * Signout
 */
module.exports.signout = function(req, res) {
	userService.logout(req.user.sessionId);
	req.logout();	
	res.send({redirect: config.isaacHome});
};

