
module.exports = function(formId) {
	var myform = {};
	
	forms.forEach(function(form){
		
		if(form.formId === formId)
			myform = form;		
	
	}
	);
	
	return myform;
	
};

var lastYear = Number(new Date().getFullYear()) - 1;
var nextYear = Number(new Date().getFullYear()) + 1;


var forms = [
	             {
	              formId: "sts.sftp.loa", 
	        	  appId:"sts", 
	        	  modId:"sftp", 
	        	  fnId:"loa", 
	              fieldWidthClass: "col-md-2",
	        	  data:[{
	        		  	isImported:false,	        		  	
	        		  	fields:[
	        		  	        {fieldHeader:"#", fieldName:"lineNumber", fieldValue:"1", type:"number", options:{required:"required", disabled:"disabled"}, validation:["required"]},
	        		  	        {fieldHeader:"Line Of Accounting", fieldName:"loa", fieldValue:"", type:"text", options:{required:"required"}, validation:["required"]},
	        		  	        {fieldHeader:"Program Code", fieldName:"progCode", fieldValue:"", type:"text", options:{required:"required"}, validation:["required"]},
	        		  	        {fieldHeader:"Fiscal Year", fieldName:"fy", fieldValue:2015, type:"number", options:{required:"required", min:lastYear, max:nextYear, integer:"integer"}, validation:["required"]}
	        		  	        ]}
	        	]//end of data
             },
             {
	              formId: "sts.sftp.up", 
	        	  appId:"sts", 
	        	  modId:"sftp", 
	        	  fnId:"up", 
	        	  title: "Add User Profile",
	        	  fieldWidthClass: "col-md-3",
	        	  data:[{
     	        		  	isImported:false,
     	        		  	fields:[
     	        		  	        {fieldHeader:"Vendor ID", fieldName:"vendorId", fieldValue:"", type:"text", options:{required:"required"}},
     	        		  	        {fieldHeader:"First Name", fieldName:"fname", fieldValue:"", type:"text"},
     	        		  	        {fieldHeader:"Last Name", fieldName:"lname", fieldValue:"", type:"text"}
     	        		  	        ]}
	        	]//end of data
            },
            {
	              formId: "sts.sftp.oxw", 
	        	  appId:"sts", 
	        	  modId:"sftp", 
	        	  fnId:"oxw", 
	        	  title: "Add Organization Crosswalk",
	        	  fieldWidthClass: "col-md-2",
	        	  data:[{
   	        		  	isImported:false,
   	        		  	fields:[
   	        		  	        {fieldHeader:"Organization Code", fieldName:"orgCode", fieldValue:"", type:"number", options:{required:"required"}},
   	        		  	        {fieldHeader:"Organization Name", fieldName:"orgName", fieldValue:"", type:"text"},
   	        		  	        {fieldHeader:"CGE Organization Name", fieldName:"cgeOrgName", fieldValue:"", type:"text", options:{required:"required"}},
   	        		  	        {fieldHeader:"Default Line of Accounting", fieldName:"defaultLoa", fieldValue:"", type:"text", options:{required:"required"}},
   	        		  	        {fieldHeader:"Routing List", fieldName:"routeList", fieldValue:"", type:"text", options:{required:"required"}}
   	        		  	        ]}
	        	]//end of data
          }
             
            

];// end of forms
	             


 