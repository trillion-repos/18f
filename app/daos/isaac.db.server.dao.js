'use strict';

var db = require('./../../config/dbConnection');




module.exports.getUserInfo= function(sessionId, callback){
	//console.trace(__filename);
	var query = "call fams_integration.getinternallogininfo(:sessionId, :user_cursor, :roles_cursor, :errorMsg)";
	execute(query,  new Array(sessionId, new db.instance.OutParam(db.instance.OCCICURSOR), new db.instance.OutParam(db.instance.OCCICURSOR), 
		new db.instance.OutParam(db.instance.OCCISTRING)), function(err, result){

		if(!err && !result.returnParam2){
			callback( err, result.returnParam[0], result.returnParam1);
		}else{	
			callback( err || !result.returnParam2);
			console.error("User Info Error: " + JSON.stringify(err || !result.returnParam2));
		}
		});
	
	//callback({username:"npimente", fname:"nelson", lname:"pimentel", roles:[]}); //TODO
};

module.exports.isAuthenticated = function(sessionId, callback){	
	var query = "select fams_integration.checksession (:sessionId) as RESULT from dual";
	execute(query, new Array(sessionId), function(err, result){

		if(!err) 			
			callback(null, result[0]["RESULT"] === 1);		
		else	
			callback( err);
	});
};

module.exports.logout = function(sessionId){
	console.log("Isaac SessionId=" + sessionId);
	
	var query = "select fams_integration.invalidatesession  (:sessionId) as RESULT from dual";
	execute(query, new Array(sessionId), function(err, result){
		
		if( err || result[0]["RESULT"] === 0)	
			console.error( "Unable to log user out with ISAAC! " + err );
	});
};

function execute(query, binds, callback){
	console.log("sql=" + query);
	console.log("Binds=" + binds);
	db.getOraConnection(
	function(connection, err)
	{
		if (err) {
			console.error(err.message);
			callback(err);
			return;
		}
		
				connection.execute(
					query,
					binds,
					
					function(err, result)
					{
						if (err) {
							console.error(err.message);
							callback(err);
							doRelease(connection, err);
							return;
						}
						//console.log("Result: " + JSON.stringify(result));
						callback(err, result);
						doRelease(connection);
					});	
});	
}


function doRelease(connection, err)
	{	
	connection.close();
	
	if(err)
		console.error(err.message);
	}
	
