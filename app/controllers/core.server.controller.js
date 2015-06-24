'use strict';
var config = require('./../../config/config');
/**
 * Module dependencies.
 */


exports.nav = function(req, res) {
	//console.trace(__filename);
	var navArray = [ {
		appName:"openFDA",
		id: "openfda",
		modules:[{		  
				moduleName : "Datasets",
				id:"drugs",
				subModules : [ {

					displayName : "Recalls",
					id:"rps"
					} ]
			}/*,
			
			{		  
				moduleName : "Devices",
				id:"devices",
				subModules : [ {

					displayName : "Recalls Per State",
					id:"rps"
					} ]
			},
			{		  
				moduleName : "Food",
				id:"food",
				subModules : [ {

					displayName : "Recalls Per State",
					id:"rps"
					} ]
			}*/
			
			]
		}
	];
	
	var temp = {};
	temp.nav = navArray;
	res.send(temp);
};