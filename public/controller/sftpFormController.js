'use strict';
/* Controllers */
var sftpFormController = angular.module('sftpFormController', []);

sftpFormController.controller('SftpFormCtrl', [
		'$scope',
		'SftpRestSrvc',
		'SftpFormSrvc',
		'SftpSrvc',
		'$modal',
		'$location',
		'$routeParams',
		'$element',
		function($scope, SftpRestSrvc, SftpFormSrvc, SftpSrvc, $modal, $location, $routeParams, $element) {
			
			var VALIDATIONS = {
					  REQUIRED : {value: "required"}
					};
			
			$scope.clearImportFileName={};
			$scope.content = {};
			$scope.forms = {};
			$scope.pageSize = 10;
			$scope.error = [];
			
			//console.log($scope.error.length);
			$scope.getExportArray = function(){
				return SftpSrvc.buildExportArray($scope.theForm);
			};
			
			$scope.getExportHeaders = function(){
				return SftpSrvc.buildExportHeaders($scope.headers);
			};
			
			  $scope.isInvalid = function(index, field, row){
				  var fieldName = field.fieldName + index;
				  var isInValid = ($scope.forms.importForm[fieldName].$invalid || (field.options && field.options.required && !field.fieldValue)) 
						  			&& ($scope.forms.importForm[fieldName].$dirty || row.isImported);
			    return  isInValid;
			  };
			
			//on load get form data
			var emptyRow = null;
			SftpFormSrvc.get({appId: $routeParams.appId, modId: $routeParams.modId, fnId: $routeParams.fnId},
				function success(response) {
					$scope.error = [];
					console.log("Success:" + JSON.stringify(response));					

					$scope.theForm = response;
					
					emptyRow  = JSON.parse( JSON.stringify( response.data[0]  ) );

					
					$scope.csv = {
						template : JSON.parse( JSON.stringify( emptyRow  ) ),
						header : true,
						separator : ','
					};
					
					
					$scope.headers = [];
					response.data.forEach(function(entry){						
						entry.fields.forEach(function(field){
							$scope.headers.push({fieldHeader:field.fieldHeader, fieldName:field.fieldName});
						}
						);
					}
					);
					

					$scope.theForm.data = [];
					
					
					},
				function error(errorResponse) {
					console.log("Error:" + JSON.stringify(errorResponse));
					});
			
			

			//submit form
			$scope.submit = function() {
				$scope.error = [];
				if ($scope.theForm.data.length === 0) {
					$scope.error.push("No data entered");
					return;
				};
				
				//console.log(JSON.stringify($scope.theForm.data));
				
				validateForm($scope.theForm.data);
				
				if ($scope.error && $scope.error.length > 0){
					console.error("ERR: " + $scope.error);
					return;
					
				}
				
				else{
					
					var waitModalInstance = $modal.open({
						templateUrl : 'submitWaitModal',
						controller : 'SubmitModalCtrl',
						backdrop: 'static',
						size : 'sm',
						scope: $scope,
						resolve: {
				        error: function () {
				          return "";
				        }
				      }
					});
				}
					

				SftpRestSrvc.save({appId: $routeParams.appId, modId: $routeParams.modId, fnId: $routeParams.fnId}, $scope.theForm, 
					function success(response) {
					waitModalInstance.close();
						
					var modalInstance = $modal.open({
						templateUrl : 'submitSuccessModal',
						controller : 'SubmitModalCtrl',
						backdrop: 'static',
						size : 'sm',
						scope: $scope,
						resolve: {
				        error: function () {
				          return "";
				        }
				      }
					});
					
					modalInstance.result.then(function(isDelete) {
					
					if(isDelete){
						$scope.deleteAllRows();
						$scope.theForm.data = [];						
					}
					
					SftpSrvc.setNumber();
					
					
				}, function(isDelete) {
					if(isDelete)
						$scope.deleteAllRows();
					
					$location.path( "/" );
				});
					
					
					console.log("Success:" + JSON.stringify(response));
				}, function error(errorResponse) {
					
					console.log("Error:" + JSON.stringify(errorResponse));
					
					waitModalInstance.close();
					
					if (errorResponse.status === 400){
						$scope.error = [];
						
						if (errorResponse.data.constructor === Array){
							$scope.error=$scope.error.concat(errorResponse.data);
							return;
						}						
							
						for (var err in errorResponse.data){								
							$scope.error.push(err +  ". Lines(s): " + errorResponse.data[err]);
						}
						
						return;
					}				
					
					
					var modalInstance = $modal.open({
						templateUrl : 'submitFailModal',
						controller : 'SubmitModalCtrl',
						backdrop: 'static',
						size : 'sm',
						scope: $scope,
						resolve: {
				        error: function () {
				          return errorResponse.data;
				        }
				      }
					});
					
					
					modalInstance.result.then(function(isDelete) {
					
					if(isDelete){
						$scope.deleteAllRows();
					}
					
					SftpSrvc.setNumber();
					
					
				}, function(isDelete) {
					if(isDelete)
						$scope.deleteAllRows();
					
					$location.path( "/" );
				});
					
					
				});

			};
			
			function validateForm(data){
				
				var badRows = [];
				data.forEach(function(row){
					
				row.fields.forEach(function(entry){
					
					if(entry.validation){
						entry.validation.forEach(function(v){		
							
							switch(v){
							case VALIDATIONS.REQUIRED.value : {if(!entry.fieldValue || entry.fieldValue === ""){badRows.push(data.indexOf(row)+1)}}
							}
							
						});
					}
					
				});
			});
				
				if(badRows.length > 0){
					toUnique(badRows); // remove array duplicates
					$scope.error.push("Missing required Field(s). Line(s) " + badRows);
				}
			}
			


			$scope.addRow = function() {

				//console.log(JSON.stringify(JSON.parse( JSON.stringify( emptyRow  ) )));
				$scope.theForm.data.unshift(JSON.parse( JSON.stringify( emptyRow  ) ));

			};

			$scope.deleteRow = function(i) {
				$scope.theForm.data.splice(i, 1);
			};

			$scope.deleteAllRows = function() {
				$scope.error = [];
				$scope.theForm.data = [];
				$scope.addRow();
				$scope.submitted = false;
				$scope.clearImportFileName();
			}			
			

			$scope.$watch('csvError', function(val) {
				$scope.error.push($scope.csvError);
			});			

			
			 $scope.openDeleteModal = function () {

				var modalInstance = $modal.open({
					templateUrl : 'deleteConfirmationModal',
					controller : 'DeleteConfirmationModalCtrl',
					backdrop: 'static',
					size : 'sm'
				});

				modalInstance.result.then(function(response) {

						$scope.deleteAllRows();
					
				}, function() {});
			};

		} ]);


var cafsDirectives = angular.module('cafsDirectives', []);

cafsDirectives.directive('dynAttr', function() {
    return {
        scope: { list: '=dynAttr' },
        link: function(scope, elem, attrs){
            for(var attr in scope.list){
            	var key = attr;
            	var value = scope.list[key];
                elem.attr(key, value);   
            }
            //console.log("Attrbs: ",scope.list);           
        }
    };
});