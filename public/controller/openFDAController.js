'use strict';
/* Controllers */
var gsaModule = angular.module('gsaModule', []);

gsaModule.controller('ReportCtrl', [
    '$scope',
	function ($scope) {

		//console.log("in logout controller");
    	$scope.getData = function(){
    		console.log("Getting data!");
    	}
	
}]);
