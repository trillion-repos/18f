'use strict';

/* Services */
var caffsRestServices = angular.module('caffsRestServices', ['ngResource']);

caffsRestServices.factory('SftpRestSrvc', ['$resource',
function($resource) {
return $resource("./app/:appId/mod/:modId/fn/:fnId",{}, {
		get: {method: 'GET', cache: false, isArray: true},
		save: {method: 'POST', cache: false, isArray: false}
		});
}]);


caffsRestServices.factory('SftpFormSrvc', ['$resource',
function($resource) {
return $resource("./form/app/:appId/mod/:modId/fn/:fnId",{}, {
		get: {method: 'GET', cache: false, isArray: false}
		});
}]);


caffsRestServices.factory('NavSrvc', ['$resource',
function($resource) {
return $resource("./nav",{}, {
		get: {method: 'GET', cache: false, isArray: false}
		});
}]);

caffsRestServices.factory('MapOpenFDASrvc', ['$resource',
 function($resource) {
 return $resource("./map/:appId/:modId/:fnId",{}, {
 		get: {method: 'GET', cache: false, isArray: false}
 		});
}]);

caffsRestServices.factory('TableOpenFDASrvc', ['$resource',
  function($resource) {
  return $resource("./table/:appId/:modId/:fnId",{}, {
  		get: {method: 'GET', cache: false, isArray: false}
  		});
 }]);
