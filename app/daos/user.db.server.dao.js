'use strict';

//var db = require('./../../config/dbConnection').getDbConnection();

//var userCollection = db.collection("user");

module.exports.getUserById = function(id, callback){
	
	userCollection.findOne({_id:id},function(err, result) {
		callback(result, err);
  });
};


module.exports.saveUser = function(user){
	user._id = user.username;
	userCollection.save(user, {w:1}, function(err, result) {
		if(err)
			console.error("Unable to persist user locally. Error: ", err);
	});
};

