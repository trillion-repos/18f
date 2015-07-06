'use strict';

var openFDA = angular.module('OpenFDA', [ 'ngRoute','ngTable', 'datamaps', 'angularUtils.directives.dirPagination','ngResource','OpenFda.restServices', 
                                          'ui.bootstrap', 'ngAnimate', 'ngSanitize', 'angularCharts', 'smoothScroll', 'ngActivityIndicator']);

openFDA.config([ '$routeProvider', '$locationProvider',
		function($routeProvider, $locationProvider) {
			
			$routeProvider.when('/:appId', {
				templateUrl : 'view/core/homepage.html'
			});
			
			$routeProvider.when('/:appId/:modId/:fnId', {
				templateUrl : 'view/core/main.html'
			});
			
			$routeProvider.otherwise('/openfda'); //TODO should be ISAAC
			$locationProvider.html5Mode(false).hashPrefix('!');
		} ]);


openFDA.factory('authHttpResponseInterceptor',['$q','$window',function($q,$window){
    return {
        response: function(response){
            if (response.status === 401) {
                console.log("Response 401");
            }
            return response || $q.when(response);
        },
        responseError: function(rejection) {
            if (rejection.status === 401) {
                console.log("Response Error 401",rejection.redirect);
                $window.location.href = rejection.data.redirect;
            }
            return $q.reject(rejection);
        }
    }
}])
.config(['$httpProvider',function($httpProvider) {
    //Http Intercpetor to check auth failures for xhr requests
    $httpProvider.interceptors.push('authHttpResponseInterceptor');
}]);

openFDA.run(function ($rootScope, $location) {
	


	$rootScope.$on("$locationChangeStart",function(event, next, current){
		//console.log("route change: " + $location.path());
//	    if((!$cookies.user || $cookies.user === '') && $location.path() != "/login"){ //TODO: handle cookies
//	    	$location.path( "/" );
//	        event.preventDefault();
//	    }
	});
});


openFDA.animation('.reveal-animation', function() {
	  return {
		    enter: function(element, done) {
		      element.css('display', 'none');
		      element.fadeIn(500, done);
		      return function() {
		        element.stop();
		      }
		    },
		    leave: function(element, done) {
		      element.fadeOut(500, done)
		      return function() {
		        element.stop();
		      }
		    },
		    beforeAddClass: function(element, className,done) {
		    	if(className == 'ng-hide') {
		    		element.fadeOut(500, done)
				      return function() {
				        element.stop();
				      }
		          } else {
		            done();
		          }
			    },
			removeClass: function(element, className,done) {
			    	if(className == 'ng-hide') {
			            //set the height back to zero to make the animation work properly
			            element.css('display', 'none');
		      element.fadeIn(500, done);
		      return function() {
		        element.stop();
		      }
			          } else {
			            done();
			          }
		    }
		  }
		});

// util function to make arrays unique
// this is a compatible with all browsers (including IE9)
function toUnique(a,b,c){//array,placeholder,placeholder
	 b=a.length;
	 while(c=--b)while(c--)a[b]!==a[c]||a.splice(c,1);
	 return a // not needed ;)
}
