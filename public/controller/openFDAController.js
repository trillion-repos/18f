'use strict';
/* Controllers */

openFDA.controller('HomeCtrl', [
    '$scope', '$location',
	function ($scope, $location) {

		$scope.goTo = function(loc){
			$location.path(loc);
		};
	
}]);
