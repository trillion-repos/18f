//fileUpload.server.model
var utils = require('./../utils/utils');
module.exports.create = function (typeId, typeTitle, fileName, username, fname, lname, subStatus, curStatus){
					return new FileUpload(typeId, typeTitle, fileName, username, fname, lname, subStatus, curStatus);
				};


function FileUpload(typeId, typeTitle, fileName, username, fname, lname, subStatus, curStatus){
	//console.trace(__filename);
	var that = this;
	var localtime = utils.getLocaltime();
	
	that.typeId = typeId;
	that.typeTitle = typeTitle;
	that.fields = [];
	
	that.fields.push( new Field("File Name", "fileName", fileName));
	that.fields.push( new Field("Username", "username", username));
	that.fields.push( new Field("First Name", "fname", fname));
	that.fields.push( new Field("Last Name", "lname", lname));
	that.fields.push( new Field("Submission Date", "subDate", localtime));
	that.fields.push( new Field("Submission Status", "subStatus", subStatus));
	that.fields.push( new Field("Current Status", "curStatus", curStatus));
	
	
	return that;	
}


function Field(fieldHeader, fieldName , fieldValue){
	var that = this;
	
	that.fieldName = fieldName;
	that.fieldHeader = fieldHeader;
	that.fieldValue = fieldValue;

	return that;
}