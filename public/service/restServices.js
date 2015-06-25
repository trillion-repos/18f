'use strict';

/* Services */
var openFdaRestServices = angular.module('OpenFda.restServices', ['ngResource']);

openFdaRestServices.factory('NavSrvc', ['$resource',
function($resource) {
return $resource("./nav",{}, {
		get: {method: 'GET', cache: false, isArray: false}
		});
}]);

openFDA.factory('FetchOpenFDASrvc', ['$resource',
 function($resource) {
 return $resource("./fetch/:appId/:modId/:fnId/:qId",{}, {
 		get: {method: 'GET', cache: false, isArray: false}
 		});
}]);
