'use strict';

var service = require('./../services/upload.server.service');
var userService = require('./../services/user.server.service');
var utils = require('./../utils/utils');

exports.getFormById = function(req, res) {
	var formId = req.params.appId.concat(".", req.params.modId, ".", req.params.fnId );
	res.json( require('../models/widgets/upload.server.forms.js')(formId));		

};


exports.getFileTransactionById = function(req, res) {
	var tableId = req.params.appId.concat(".", req.params.modId, ".", req.params.fnId );
	service.getTransactionById(tableId, function(result, err){
		//console.log(result.length);
		if(err){
			console.error("ERR: " + err);
			res.status(500).send("Unable to retrieve data from DB. " + err.message);
			return;
		}
		
		//res.send(result);
		
		service.getSftpFileNames(function(fileNames, err){
			
			if (err)
				console.error(err); // no need to tell client about this :)
			else{
				var filenames = [];
				
				if(fileNames)
					filenames = fileNames.toString("utf-8").split(/\r?\n/);
				 
				result.forEach(function(row){
					var status = "Pending";
					row.fields.forEach(function(field){
						if (field.fieldName === "fileName"){
							if(filenames.indexOf(field.fieldValue) === -1){									
								status = "Complete";								
							}
						}
						
						if (field.fieldName === "curStatus"){
							field.fieldValue = status;
						}
						
					});
					
					if(status === "Complete"){
						service.updateTransactionStatus(row);// async update of the status
					}

				});
			}			
			
			res.send(result);
		});
		
		
	});
	//res.send(require('../models/tables.js')(tableId));
}


exports.saveUploadForm = function(req, res) {
	var errors = service.validateUploadSubmission(req.body);
	//console.log("Err: " + JSON.stringify(errors));
	if(errors && errors.length > 0)
		res.status(400).send(errors);
	
	else{
		var data = service.convertToCsvFormat(req.body.data);
		var localtime = utils.getLocaltime();
		//console.log(localtime);
		req.body.fileName = req.body.fileName + "_" + localtime + req.body.fileNameExt;
		service.submitCsvFile(data, req.body.fileName, function(err){
			//console.log("Err: " + JSON.stringify(err));
			var subStatus = null;
			
			if(err)
				subStatus = "Fail";						
			else
				subStatus = "Success";
				
			userService.getUserInfoLocal(req.user.username, function(theUser){
				service.persistFormSubmission(req.body, theUser, subStatus, function(err){
					if(err){
						res.status(500).send("Unable to persist transaction. " + err.message);
					}
					else if(subStatus === "Fail"){
						res.status(500).send("Unable to submit file. " + err.message);
					}				
					else{	
						res.send("success");
					}
				});
			});	
				
			
		}
		);		
		
	}
}
