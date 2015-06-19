'use strict';
/* Controllers */
//var sftpTableControllers = angular.module('sftpTableControllers', []);


openFDA.controller('TableCtrl', [
		'$scope',
		'$filter',
		'$routeParams',
		'TableOpenFDASrvc',
		'ngTableParams',
		'$location',
		function($scope, $filter, $routeParams, TableOpenFDASrvc, ngTableParams, $location) {
			
			$scope.organizedData = [];
			$scope.filteredData = [];
			$scope.columns = [];
			$scope.tableParams = new ngTableParams({
				page : 1, // show first page
				count : 5, // count per page
				sorting : {
					subDate : 'desc' // initial sorting
				}
			}, {
				counts: [],
				total : 1,
				getData : function($defer, params) {
					$scope.filteredData = params.filter() ? $filter('filter')($scope.organizedData, params.filter()) :  $scope.organizedData;
					$scope.filteredData = params.sorting() ? $filter('orderBy')($scope.filteredData, params.orderBy()) : $scope.filteredData;
					$defer.resolve($scope.filteredData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
				}
			});
			
			
			console.log(JSON.stringify($routeParams));
			
			var getTableData = function(){
				
				$scope.error = [];
				
				
				TableOpenFDASrvc.get({appId:$routeParams.appId, modId: $routeParams.modId, fnId:$routeParams.fnId},
				function success(response) {
					
					
					if(!response && !response.length){
						console.warn("No data found for TableId="+$routeParams);
						return;
					}
					

					console.log("Table Success:" + JSON.stringify(response));
					$scope.theTable = response;					
					
					if(!response || !response.length)
						return; 
					
					$scope.title = response[0].typeTitle;
					response[0].fields.forEach(function(entry){
						var column = {};
						column['title'] = entry.fieldHeader;
						column['field'] = entry.fieldName;
						column['filter'] = {};
						column.filter[entry.fieldName] = 'text';
						$scope.columns.push(column);
					}
					);					
					

					response.forEach(function(data){
						var row = {};
						data.fields.forEach(function(field){
							row[field.fieldName] = field.fieldValue;
						});
						$scope.organizedData.push(row);						
					});
					
					//console.log("DATA: " + JSON.stringify($scope.columns));
					
					$scope.filteredData = $scope.organizedData;
					
					$scope.tableParams.reload();

					
					},
				function error(errorResponse) {
					console.log("Error:" + JSON.stringify(errorResponse));					
					
					$scope.error.push(errorResponse.data);
					});

				$scope.pageSize = 5;

			};
			
			
			
			
			
			//getTableData();
			
			

			

		} ]);