'use strict';

//var db = require('./../../config/dbConnection').getDbConnection();


//var fileUpCollection = db.collection("file_upload");

module.exports.saveFileUpload = function(data,callback){	
	fileUpCollection.insert(data, {w:1}, function(err, result) {
		callback(err);
	});
};


module.exports.getTransactionById = function(id, callback){
	
	fileUpCollection.find({typeId:id}).toArray(function(err, result) {
		callback(result, err);
  });
};

module.exports.updateTransactionStatus = function (data){
	fileUpCollection.update({_id: data._id},  data, function(err, result) {
		if(err)
			console.error("Unable to Write (async) to Database. Error: "+err.message);
	});
}
