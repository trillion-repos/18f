var	dao = require('./../daos/upload.db.server.dao');
var fileUpload = require('./../models/fileUpload.server.model');
var assert = require('assert');
var FormValidation = require('./../models/formValidator.server.model');
var sftpDao = require('./../daos/upload.sftp.server.dao');
var forms = require ('./../models/widgets/upload.server.forms');


module.exports.validateUploadSubmission = function(formData){
	
	
	var errorMap = [];
	var errorGeneric = [];
	
	
	if (!formData.formId)
		errorGeneric.push("Form ID must not be null");
	
	var form = forms(formData.formId);
	
	if (!formData.title || form.title !== formData.title)
		errorMap.push("Form Title is invalid");
	
	if (!formData.fileName || formData.fileName !== form.fileName)
		errorMap.push("Filename is invalid");
	
	if(!formData.fileNameExt || formData.fileNameExt !== form.fileNameExt)
		errorMap.push("File extension is invalid");
	
	if(errorMap && errorMap.length > 0)
		return errorMap;
	
	console.log("ERROR_MAP1: " + JSON.stringify(errorMap));
	
	//console.log(JSON.stringify(formData.data));
	formData.data.forEach(function(row){
		var errorObj = {};
		row.fields.forEach(function(field){
			if(field.validation){
				field.validation.forEach(function(validation){
					var err = FormValidation.validate(validation, field.fieldValue);
					if(err){
						//error.push(err);
						errorObj[err] = formData.data.indexOf(row) + 1;
						errorMap.push(errorObj);
					}
				});
			}
			//console.log(field.validation);		
		});
		
	});
	
	

	if(errorMap && errorMap.length > 0)
		FormValidation.toUnique(errorMap);
	
	//console.log("ERROR_MAP2: " + JSON.stringify(errorMap));
	console.log(FormValidation.mergeErrors(errorMap));
	
	return FormValidation.mergeErrors(errorMap);
}

module.exports.convertToCsvFormat= function(data){
	
	var result = "";
	var headers = "";
	var h =true;
	
	data.forEach(function(row){
		var i =0;
		row.fields.forEach(function(field){
			
			if( h){
				headers += field.fieldHeader;				
			}
				
			
			result += field.fieldValue;
			
			if(row.fields.length === ++i){
				result += "\n";
				if(h)
					headers += "\n";
				h = false;
			}
				
			
			else{
				result += ",";
				if(h)
					headers += ",";
			}
		});
		
		
	});
	
	return  headers + result;
}


module.exports.submitCsvFile = function(formData, fileName, callback){
	return sftpDao.sendData(formData, fileName, callback);
}


module.exports.persistFormSubmission = function(formData, user, subStatus, callback){	
	//console.trace(__filename);
	

	var data = fileUpload.create(formData.formId, formData.title, formData.fileName, user.username, user.fname, user.lname, subStatus, "Pending");	
	console.log("Persist Format: " + JSON.stringify(data));
	dao.saveFileUpload(data, callback);
};

module.exports.getTransactionById = function(typeId, callback){
	dao.getTransactionById(typeId, callback);
};

module.exports.getSftpFileNames = function(callback){
	sftpDao.getSftpFileNames(callback);
}

module.exports.updateTransactionStatus = function(data){
	dao.updateTransactionStatus(data);
}


