
var VALIDATIONS =  {
						required: function(value) { if(!value) {return "Required Field(s) Missing"} return null; }
						
					};


module.exports.VALIDATIONS = VALIDATIONS;

module.exports.validate = function(validation, value){
	//console.log("Validation: " + validation + " Value: " + value);
	if(validation)
		return VALIDATIONS[validation](value); 	
};




// util function to make arrays unique
// this is a compatible with all browsers (including IE9)
module.exports.toUnique  = function (a,b,c){//array,placeholder,placeholder
	 b=a.length;
	 while(c=--b)while(c--)a[b]!==a[c]||a.splice(c,1);
	 return a // not needed ;)
}


module.exports.mergeErrors = function(errors){	
	//console.log("errors: " + errors);
	if(!errors)
		return [];
	
	var uniqueErrors = {};
	var finalErrorArray = [];
	errors.forEach(function(errorObj){
		for(k in errorObj){
			if(! uniqueErrors[k]){
				uniqueErrors[k] = [];
			}				
			uniqueErrors[k].push(errorObj[k]);			
		}
		
	}
	);
	
	return uniqueErrors;
}
