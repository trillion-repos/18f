'use strict';
var config = require('./../../config/config');
/**
 * Module dependencies.
 */


exports.nav = function(req, res) {
	//console.trace(__filename);
	var navArray = [ {
		appName:"STS",
		id: "sts",
		modules:[{		  
				moduleName : "File Upload",
				id:"sftp",
				subModules : [ {

					displayName : "Lines of Accounting",
					id:"loa"
					}, {

					displayName : "User Profile",
					id:"up"
					}, {

					displayName : "Organization Xwalk",
					id:"oxw"
					} ]
			}]
		}
	];
	
	var temp = {};
	temp.user = {};
	temp.user.fname = req.user.fname;
	temp.user.lname = req.user.lname;
	temp.user.username = req.user.username;
	temp.nav = navArray;
	res.send(temp);
};