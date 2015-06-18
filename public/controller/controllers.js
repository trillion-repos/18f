'use strict';
/* Controllers */
var sftpControllers = angular.module('sftpControllers', []);


sftpControllers.controller('SubmitModalCtrl', ['$scope', '$modalInstance', 'error', 'SftpSrvc', function ($scope, $modalInstance, error, SftpSrvc) {

	$scope.error = error;
	  $scope.returnDelete = function () {
	    $modalInstance.close(true);
	  };
	
	  $scope.home = function () {
	    $modalInstance.dismiss();
	  };
	  
	  $scope.returnNoDelete = function(){
		  $modalInstance.close(false);
	  };
	  
	  $scope.getExportArray = function(){
			return SftpSrvc.buildExportArray($scope.theForm);
	  };
	  
	  $scope.getExportHeaders = function(){
			return SftpSrvc.buildExportHeaders($scope.headers);
		};
}]);

sftpControllers.controller('DeleteConfirmationModalCtrl', function ($scope, $modalInstance) {
	
	  $scope.delete = function () {
	    $modalInstance.close();
	  };
	
	  $scope.cancel = function () {
	    $modalInstance.dismiss();
	  };
	  
});

sftpControllers.controller('LoginCtrl', [
    '$scope', 
    'AuthSrvc',
    '$location',
    '$cookies',
	function ($scope, AuthSrvc, $location, $cookies) {
		$scope.login = function(){
			$scope.error = null;
			AuthSrvc.login({}, $scope.formData, 
				function success(response) {
					//$cookies.user = 'npimente';					
					//$location.path( "/" );
					}, 
				function error (){
//					if ($cookies.user)
//						$cookies.user = '';
//					$cookies.user = 'npimente'; //TODO: remove
//					$scope.password = "";
					//$scope.error = "Invalid username or password";//TODO: undo
					
					//$location.path( "/" ); //TODO: change to login page

					});
		};
	
}]);

sftpControllers.controller('LogoutCtrl', [
    '$scope', 
    'AuthSrvc',
    '$location',
    '$cookies',
	function ($scope, AuthSrvc, $location, $cookies) {

		//console.log("in logout controller");

			AuthSrvc.logout({}, $scope.formData, 
				function success(response) {	
					if ($cookies.user)
						$cookies.user = '';
					$location.path( "/login" );
					}, 
				function error (){
					if ($cookies.user)
						$cookies.user = '';					
					$location.path( "/login" ); 

					});

	
}]);
