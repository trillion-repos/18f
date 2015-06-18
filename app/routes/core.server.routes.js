'use strict';

var users = require('../../app/controllers/users.server.controller');
var core = require('../../app/controllers/core.server.controller');

module.exports = function(app) {
	// Root routing
	
	app.route('/nav').get(users.requiresLogin,core.nav);

	app.route('/auth/signin').get(users.signin);//TODO - change to POST
	
	app.route('/auth/signout').get(users.signout);
};