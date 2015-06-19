'use strict';

var config = require('./config');
/** TINGO DB **/
//var Db = require('tingodb')().Db;


var db = null;
var thePool = null;

exports.createConnection = function (location) {
	db = new Db(location, {});
};

module.exports.getDbConnection = function () {
    return db;
};


/** ORACLE DB**/
//var oracledb = require("strong-oracle")(config.famsDbSettings);
//module.exports.instance = oracledb;

module.exports.createOraConnection = function () {


oracledb.createConnectionPool(config.famsDbSettings, function(err, pool) {
	if (err) {
		 console.error("Error creating oracle connection pool. Details: " + err.message);
		 process.exit(1);
	}

	console.log("Oracle connection pool created: Details - User: " + config.famsDbSettings.user + ", ConnectionString: " + config.famsDbSettings.tns);
	console.log("Pool details: " + JSON.stringify(pool));
	thePool = pool;
});


};

exports.getOraConnection = function (callback) {
	while(!thePool){
		console.warn("Connection pool has not yet been created, please wait a moment");
	}
	thePool.getConnection (
	    function(err, connection)
	    {
	    	callback(connection, err);
	    });

};
