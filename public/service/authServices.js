'use strict';

/* Services */
var authServices = angular.module('authServices', [ 'ngResource' ]);

authServices.factory('AuthSrvc', [ '$resource', function($resource) {
	return $resource("./login", {}, {
		login : {
			method : 'POST',
			cache : false,
			isArray : false
		},
		logout : {
			method : 'POST',
			cache : false,
			isArray : false
		}
	});
} ]);
