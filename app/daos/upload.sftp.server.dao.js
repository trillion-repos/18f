'use strict';

var config = require('../../config/config');
//var Client = require('ssh2').Client;

var connectionConfig= {
             		  	host: config.sftpServerAddress,
						port: config.sftpServerPort,
						username: config.sftpServerUsername
}

if(config.sftpServerKeyFile)
	connectionConfig.privateKey = config.sftpServerKeyFile
else
	connectionConfig.password = config.sftpServerPassword;

console.log("SFTP server connection details: "  + JSON.stringify(connectionConfig));

module.exports.sendData = function(data, fileName, callback){
	var conn = new Client();
	//console.log("filename: "  + fileName);
	conn.on('ready', function() {
		  //console.log('DATA: ' + JSON.stringify(data));
		  conn.exec('echo "' + data + '"> ' + '"' + config.sftpServerPath + fileName + '"', function(err, stream) {
		    callback(err);
		    stream.on('close', function(code, signal) {
		      console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
		      conn.end();
		    });
		  });
		}).on('error', function(err){
			callback(err);
			}).connect(connectionConfig);
};


module.exports.getSftpFileNames = function(callback){
	var conn = new Client();
	conn.on('ready', function() {
		  //console.log('DATA: ' + JSON.stringify(data));
		  conn.exec('ls', function(err, stream) {
		    var resultData= null;
		    stream.on('close', function(code, signal) {
		      console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
		      callback(resultData, err);
		      conn.end();
		    }).on('data', function(data) {
		        //console.log('STDOUT: ' + data);
		    	resultData = data;
		        conn.end();
		    }).stderr.on('data', function(data) {
		      console.log('STDERR: ' + data);
		      resultData = data;
		      conn.end();
		    });
		  });
		}).on('error', function(err){
			callback(null, err);
			conn.end();
			}).connect(connectionConfig);
};
