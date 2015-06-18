'use strict';

/* Services */
var sftpServices = angular.module('sftpServices', ['ngResource']);

sftpServices.factory('SftpSrvc', [
function() {
	 var number = false;
	 
     function getNumber() {
        return number;
    }
     
    function setNumber() {
        number = !number;
    }
    
    return {
        buildExportArray: function(formData){
					    		var exportArray  = [];
							
								if(!formData.data)
									return [];
								
								formData.data.forEach(function(row){
									var rowObj = {};
									row.fields.forEach(function(field){						
										rowObj[field.fieldHeader]=field.fieldValue;						
									});
									//console.log(JSON.stringify(rowObj));
									exportArray.push(rowObj);
								});
								
								return exportArray;
					        },
        buildExportHeaders: function(headers){
					        	var exportHeader = [];
								headers.forEach(function(field){
									exportHeader.push(field.fieldHeader);
									console.log(JSON.stringify(field));
								});
								return exportHeader;
				        },
        getNumber: getNumber,
        setNumber: setNumber				        
    }

}]);



