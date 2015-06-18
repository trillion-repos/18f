'use strict';

//user.server.model
module.exports.create = function (username, fname, lname, nav){
					return new User(username, fname, lname, nav);
				};


function User(username, fname, lname, nav){
	//console.trace(__filename);
	var that = this;
	
	that.username = username;
	that.fname = fname;
	that.lname = lname;
	
	that.nav = nav;
	
	return that;	
}