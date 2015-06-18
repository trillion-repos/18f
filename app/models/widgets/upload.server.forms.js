'use strict';

var fv = require('./../../models/formValidator.server.model');

module.exports = function(formId) {
	//console.trace(__filename);
	var myform = {};
	
	forms.forEach(function(form){
		
		if(form.formId === formId)
			myform = form;		
	
	}
	);
	
	return myform;
	
};

//var lastYear = Number(new Date().getFullYear()) - 1;
//var nextYear = Number(new Date().getFullYear()) + 1;

//console.log(Object.keys(fv.VALIDATIONS));

var forms = [
	             {
	              fileName: "cge_org_loa_xwalk",
	              fileNameExt: ".csv",
	              formId: "sts.sftp.loa",  
	        	  title: "Lines Of Accounting",
	              fieldWidthClass: "col-md-3",
	        	  data:[{
	        		  	isImported:false,	        		  	
	        		  	fields:[
	        		  	        {fieldHeader:"Line Of Accounting", fieldName:"loa", fieldValue:"", type:"text", options:{required:"required"}, validation:['required']},
	        		  	        {fieldHeader:"Program Code", fieldName:"progCode", fieldValue:"", type:"text", options:{required:"required"}, validation:['required']},
	        		  	        {fieldHeader:"Fiscal Year", fieldName:"fy", fieldValue:2015, type:"number", options:{required:"required", min:1900, max:2100, integer:"integer"}, validation:['required']}
	        		  	        ]}
	        	]//end of data
             },// end of form
             {
            	  fileName: "cge_user_manual_prof",
            	  fileNameExt: ".csv",
	              formId: "sts.sftp.up", 
	        	  appId:"sts", 
	        	  modId:"sftp", 
	        	  fnId:"up", 
	        	  title: "User Profile",
	        	  fieldWidthClass: "col-md-3",
	        	  data:[{
     	        		  	isImported:false,
     	        		  	fields:[
     	        		  	        {fieldHeader:"Vendor ID", fieldName:"vendorId", fieldValue:"", type:"text", options:{required:"required"}, validation:['required']},
     	        		  	        {fieldHeader:"First Name", fieldName:"fname", fieldValue:"", type:"text"},
     	        		  	        {fieldHeader:"Last Name", fieldName:"lname", fieldValue:"", type:"text"}
     	        		  	        ]}
	        	]//end of data
            },// end of form
            {
            	  fileName: "fema_cge_org_xwalk",
            	  fileNameExt: ".csv",
	              formId: "sts.sftp.oxw", 
	        	  appId:"sts", 
	        	  modId:"sftp", 
	        	  fnId:"oxw", 
	        	  title: "Organization Crosswalk",
	        	  fieldWidthClass: "col-md-2",
	        	  data:[{
   	        		  	isImported:false,
   	        		  	fields:[
   	        		  	        {fieldHeader:"Organization Code", fieldName:"orgCode", fieldValue:"", type:"text", options:{required:"required"}, validation:['required']},
   	        		  	        {fieldHeader:"Organization Name", fieldName:"orgName", fieldValue:"", type:"text"},
   	        		  	        {fieldHeader:"CGE Organization Name", fieldName:"cgeOrgName", fieldValue:"", type:"text", options:{required:"required"}, validation:['required']},
   	        		  	        {fieldHeader:"Default Line of Accounting", fieldName:"defaultLoa", fieldValue:"", type:"text", options:{required:"required"}, validation:['required']},
   	        		  	        {fieldHeader:"Routing List", fieldName:"routeList", fieldValue:"", type:"text", options:{required:"required"}, validation:['required']}
   	        		  	        ]}
	        	]//end of data
          }// end of form
             
            

];// end of all forms
	             


 