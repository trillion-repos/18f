
module.exports = function(tableId) {
	var myTable = {};
	
	tables.forEach(function(table){
		
		if(table.tableId === tableId)
			myTable = table;		
	
	}
	);
	
	return myTable;
	
};


var tables = [
	             {
	              tableId: "sts.sftp.loa", 
	        	  title: "Lines Of Accounting Submissions",
	        	  data:[{	        		  	
	        		  	fields:[
	        		  	        {fieldHeader:"File Name", fieldName:"fileName", fieldValue:"loa1.csv", options:{}},
	        		  	        {fieldHeader:"Username", fieldName:"username", fieldValue:"mmouse", options:{}},
								{fieldHeader:"First Name", fieldName:"fname", fieldValue:"Mickey", options:{}},
								{fieldHeader:"Last Name", fieldName:"lname", fieldValue:"Mouse", options:{}},
								{fieldHeader:"Submission Date", fieldName:"subDate", fieldValue:"4/21/2015 9:00am", options:{}},
								{fieldHeader:"Submission Status", fieldName:"subStatus", fieldValue:"Fail", options:{}},
								{fieldHeader:"Current Status", fieldName:"curStatus", fieldValue:"Pending", options:{}}
	        		  	      ]},
	        		  	    {	        		  	
		        		  	fields:[
		        		  	        {fieldHeader:"File Name", fieldName:"fileName", fieldValue:"loa2.csv", options:{}},
		        		  	        {fieldHeader:"Username", fieldName:"username", fieldValue:"npimente", options:{}},
									{fieldHeader:"First Name", fieldName:"fname", fieldValue:"Nelson", options:{}},
									{fieldHeader:"Last Name", fieldName:"lname", fieldValue:"Pimentel", options:{}},
									{fieldHeader:"Submission Date", fieldName:"subDate", fieldValue:"4/21/2015 1:00pm", options:{}},
									{fieldHeader:"Submission Status", fieldName:"subStatus", fieldValue:"Success", options:{}},
									{fieldHeader:"Current Status", fieldName:"curStatus", fieldValue:"Pending", options:{}}
		        		  	      ]},
		        		  	{	        		  	
		        		  	fields:[
		        		  	        {fieldHeader:"File Name", fieldName:"fileName", fieldValue:"loa3.csv", options:{}},
		        		  	        {fieldHeader:"Username", fieldName:"username", fieldValue:"mmouse", options:{}},
									{fieldHeader:"First Name", fieldName:"fname", fieldValue:"Mickey", options:{}},
									{fieldHeader:"Last Name", fieldName:"lname", fieldValue:"Mouse", options:{}},
									{fieldHeader:"Submission Date", fieldName:"subDate", fieldValue:"4/20/2015 5:00pm", options:{}},
									{fieldHeader:"Submission Status", fieldName:"subStatus", fieldValue:"Success", options:{}},
									{fieldHeader:"Current Status", fieldName:"curStatus", fieldValue:"Pending", options:{}}
		        		  	      ]},
	        		  	    {	        		  	
		        		  	fields:[
		        		  	        {fieldHeader:"File Name", fieldName:"fileName", fieldValue:"loa4.csv", options:{}},
		        		  	        {fieldHeader:"Username", fieldName:"username", fieldValue:"jbower", options:{}},
									{fieldHeader:"First Name", fieldName:"fname", fieldValue:"Jack", options:{}},
									{fieldHeader:"Last Name", fieldName:"lname", fieldValue:"Bower", options:{}},
									{fieldHeader:"Submission Date", fieldName:"subDate", fieldValue:"4/18/2015 1:00am", options:{}},
									{fieldHeader:"Submission Status", fieldName:"subStatus", fieldValue:"Success", options:{}},
									{fieldHeader:"Current Status", fieldName:"curStatus", fieldValue:"Pending", options:{}}
		        		  	      ]},
	        		  	    {	        		  	
		        		  	fields:[
		        		  	        {fieldHeader:"File Name", fieldName:"fileName", fieldValue:"loa5.csv", options:{}},
		        		  	        {fieldHeader:"Username", fieldName:"username", fieldValue:"kclark", options:{}},
									{fieldHeader:"First Name", fieldName:"fname", fieldValue:"Ken", options:{}},
									{fieldHeader:"Last Name", fieldName:"lname", fieldValue:"Clark", options:{}},
									{fieldHeader:"Submission Date", fieldName:"subDate", fieldValue:"4/15/2015 12:00pm", options:{}},
									{fieldHeader:"Submission Status", fieldName:"subStatus", fieldValue:"Success", options:{}},
									{fieldHeader:"Current Status", fieldName:"curStatus", fieldValue:"Complete", options:{}}
		        		  	      ]},
	        		  	    {	        		  	
		        		  	fields:[
		        		  	        {fieldHeader:"File Name", fieldName:"fileName", fieldValue:"loa6.csv", options:{}},
		        		  	        {fieldHeader:"Username", fieldName:"username", fieldValue:"jbower", options:{}},
									{fieldHeader:"First Name", fieldName:"fname", fieldValue:"Jack", options:{}},
									{fieldHeader:"Last Name", fieldName:"lname", fieldValue:"Bower", options:{}},
									{fieldHeader:"Submission Date", fieldName:"subDate", fieldValue:"4/02/2015 5:00pm", options:{}},
									{fieldHeader:"Submission Status", fieldName:"subStatus", fieldValue:"Success", options:{}},
									{fieldHeader:"Current Status", fieldName:"curStatus", fieldValue:"Complete", options:{}}
		        		  	      ]},
	        		  	    {	        		  	
		        		  	fields:[
		        		  	        {fieldHeader:"File Name", fieldName:"fileName", fieldValue:"loa7.csv", options:{}},
		        		  	        {fieldHeader:"Username", fieldName:"username", fieldValue:"bwayne", options:{}},
									{fieldHeader:"First Name", fieldName:"fname", fieldValue:"Bruce", options:{}},
									{fieldHeader:"Last Name", fieldName:"lname", fieldValue:"Wayne", options:{}},
									{fieldHeader:"Submission Date", fieldName:"subDate", fieldValue:"3/31/2015 7:00am", options:{}},
									{fieldHeader:"Submission Status", fieldName:"subStatus", fieldValue:"Success", options:{}},
									{fieldHeader:"Current Status", fieldName:"curStatus", fieldValue:"Complete", options:{}}
		        		  	      ]}
        		  	      
	        	]//end of data
             }
             
            
             
            

];// end of tables
	             


 