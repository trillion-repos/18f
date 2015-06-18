'use strict';


var navArray = [ {
		appName:"STS",
		id: "sts",
		modules:[{		  
				moduleName : "File Upload",
				id:"sftp",
				subModules : [ {

					displayName : "Lines of Accounting",
					id:"loa"
					}, {

					displayName : "User Profile",
					id:"up"
					}, {

					displayName : "Organization Xwalk",
					id:"oxw"
					} ]
			}]
		},
		
		{
		appName:"SFS",
		id: "sfs",
		modules:[{		  
				moduleName : "File Upload",
				id:"sftp",
				subModules : [ {

					displayName : "Lines of Accounting",
					id:"loa"
					}, {

					displayName : "User Profile",
					id:"up"
					}, {

					displayName : "Organization Xwalk",
					id:"oxw"
					} ]
			}]
		}
	];




module.exports.getNavFromRoles = function(roles){
	var newNav = navArray;

	
	navArray.forEach(function(app){
		var remove = [];
		if(!findInRole(roles, new Array("_" + app.id, "_all"))){
			console.log("remove app: " + app.id);
			remove.push(newNav.indexOf(app));
		}else if(findInRole(roles, new Array("_all"))){
			return;
		}else{
			var rmIndexes = [];
			app.modules.forEach(function(mod){
				if(!findInRole(roles, new Array("_" + app.id + "_" + mod.id, "_" + app.id + "_all"))){
					rmIndexes.push(app.modules.indexOf(fn));					
				}else if(findInRole(roles, new Array("_" + app.id + "_all"))){
					return;
				}else{
					var delIndexes = [];
					mod.subModules.forEach(function(fn){
						if(!findInRole(roles, new Array("_" + app.id + "_" + mod.id +"_"+ fn.id, "_" + app.id + "_" + mod.id +"_all" ))){
							delIndexes.push(mod.subModules.indexOf(fn));
							
						}						
					});
					if(delIndexes.length)
						mod.subModules = removeFromArray(mod.subModules, delIndexes);
				}
				if(rmIndexes.length)
						app.modules = removeFromArray(mod.subModules, rmIndexes);
				
				
			});
		}
		
		if(remove.length)
			navArray = removeFromArray(navArray, remove);
		
	});
	
	console.log("NAV: " + JSON.stringify(newNav));
	return newNav;
};


function removeFromArray(array, indexes){
	
	for(var i = indexes.length -1 ; i >= 0 ; i--){
		array.splice(indexes[i], 1);
	}
	
	return array;
}


function findInRole(roles, partials){
	//console.log(roles + " : " + partials);
	var flag = false;
	roles.forEach(function(role){
		partials.forEach(function(partial){
			if(role.indexOf(partial) === 0){
				//console.log("FOUND: " + partial + " in role: " + role);
				flag = true;
			}
		});
		
	});
	return flag;
}
