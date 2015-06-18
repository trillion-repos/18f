'use strict';

var isaacDao = require('./../daos/isaac.db.server.dao');
var dao = require('./../daos/user.db.server.dao');
var userObj = require ('./../models/user.server.model');
var navObj = require('./../models/widgets/nav.server.model');

module.exports.getUserInfo = function(sessionId, callback){
	isaacDao.getUserInfo(sessionId, function(err, user, roles){
		if(err)
			callback(err);
		
		
		var theRoles = [];
		roles.forEach(function(role){
			var theRole = role['ACCESS_CONTROL_NAME'].toLowerCase().replace("cafs", "");
			//console.log("Role: " + theRole);
			var roleArray = theRole.split("_");
			if(roleArray.length && roleArray[0] === 'cafs'){
				theRoles.push(theRole);
			}		
		});
		
		
		var nav = navObj.getNavFromRoles(new Array("_sts_all")); //theRoles TODO
		
		user = userObj.create(user['USERNAME'], user['FIRSTNAME'], user['LASTNAME'], nav);
		//console.log("UserObj: " + JSON.stringify(user));
		callback(null, user);
		
	}
	);	
}


module.exports.isAuthenticated = function(sessionId, callback){
	isaacDao.isAuthenticated(sessionId, callback)
}


module.exports.getUserInfoLocal = function(username, callback){
	dao.getUserById(username, callback);	
}

module.exports.persistUserLocal = function(user){
	dao.saveUser(user);
};

module.exports.logout = function(sessionId){
	isaacDao.logout(sessionId);
}

