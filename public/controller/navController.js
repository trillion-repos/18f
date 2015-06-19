//var navController = angular.module('navController', [ ]);

openFDA.controller('NavCtrl', [ '$scope','$location', '$routeParams','NavSrvc', '$window',
		function($scope, $location, $routeParams, NavSrvc, $window) {

			
			NavSrvc.get(function(response){
				console.log("Nav: " + JSON.stringify(response));
				$scope.accessApps = response.nav;
				
				if($routeParams.appId){
					$scope.setApp($routeParams.appId);
					
					$scope.activeMenu.modules.forEach(function(mod){
						if(mod.id === $routeParams.modId){
							mod.selected = true;	
							mod.active = true;
							}						
						
						mod.subModules.forEach(function(subMod){
							if(subMod.id === $routeParams.fnId)
								subMod.selected = true;
						});
					});

				}
				
			}, function(errorResponse){
				console.error("Error retrieving Menu. Error: " + JSON.stringify(errorResponse));
			});			
			
			
			$scope.defaultAppName = "My Applications";
			$scope.myApp = $scope.defaultAppName;			
			
			$scope.showChilds = function(index) {
				$scope.activeMenu.modules[index].active = !$scope.activeMenu.modules[index].active;
			};

			$scope.goTo = function(loc){
				$location.path(loc);
			};
			

			
			$scope.deactivateAll = function(){
				$scope.activeMenu.modules.forEach(function(mod){
					
					mod.selected = false;
					
					mod.subModules.forEach(function(sub){
						sub.selected = false;
					});
				});
			}
			
			
			$scope.setApp = function(id){	
				//NavSrvc.setApp(id);					
				$scope.accessApps.forEach(function(app){
					if(app.id === id){
						$scope.activeMenu = app;
						$scope.myApp = app.appName;
					}					
				}
				);
			};			
			
			
			$scope.filterApps = function(app) {
			    return app.appName !== $scope.myApp;
			};	
			
			

		} ]);