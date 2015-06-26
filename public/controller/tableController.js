'use strict';
/* Controllers */
//var sftpTableControllers = angular.module('sftpTableControllers', []);


openFDA.controller('TableCtrl', [
		'$scope',
		'$filter',
		'$routeParams',
		'ngTableParams',
		'$location','$anchorScroll', 'SharedDataSrvc',
		function($scope, $filter, $routeParams, ngTableParams, $location, $anchorScroll, SharedDataSrvc) {
			var activeCols = ["recall_number", "reason_for_recall", "status", "distribution_pattern", "product_quantity", "recall_initiation_date", "product_type"];
			$scope.organizedData = [];
			$scope.filteredData = [];
			$scope.columns = [];
			$scope.pageSize = 25;
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
			
			
			$scope.toggleField = function(col){
				//console.log("Column: " , JSON.stringify(col));
				
				if(col.active === 'active'){
					delete col.active;
					
					var index = $scope.columns.indexOf(col);
					$scope.columns.splice(index, 1);
				}
				
				else{
					col['active'] = 'active';
					$scope.columns.push(col);
				}
					
			};
			
			
	
			$scope.$watch(function () { return SharedDataSrvc.getTableData(); },
			   function (value) {
				   if(value && value.data){
					   console.log("TableData: ", JSON.stringify(value));
					   
					   $scope.organizedData = value.data;
					   $scope.filteredData = $scope.organizedData;
					   $scope.title = value.title;
					   $scope.allColumns = value.columns;
					   $scope.columns = [];
					   $scope.allColumns.forEach(function(col){
						   if (activeCols.indexOf(col.field) > -1){
							   $scope.columns.push(col);
							   col.active = 'active';
						   }
					   });
					   
					   $scope.tableParams.reload();
					   
					 	$location.hash('tableAnchor');
					    $anchorScroll();
					   
				   }
			   }
			);			

		} ]);