openFDA.controller('GraphCtrl', [
		'$scope',
		'SharedDataSrvc',
		'$routeParams', 'smoothScroll' ,
		function($scope, SharedDataSrvc, $routeParams, smoothScroll ) {
			
    //var showingMonth = true;
	$scope.graphConfig = {
			  title: false  , // chart title. If this is false, no title element will be created.
			  tooltips: true,
			  labels: false, // labels on data points
			  // exposed events
			  mouseover: function(d, e) {
			  								if(SharedDataSrvc.getView() === 'graphRpy') 
			  									SharedDataSrvc.getCurrentYear = d.x; 
			  								else if(SharedDataSrvc.getView() === 'graphRpm')
			  									$scope.currentMonth = d.x;
  									},			  
			  mouseout: function(d) {},
			  click: function(d){ 
				  					if(SharedDataSrvc.getView() === 'graphRpy')
				  						SharedDataSrvc.fetchData("graphRpy", $scope.state, $routeParams, SharedDataSrvc.getCurrentYear);

				  					else if(SharedDataSrvc.getView() === 'graphRpm') 
			  							SharedDataSrvc.fetchData("tableRpm", $scope.state, $routeParams, SharedDataSrvc.getCurrentYear, $scope.currentMonth);
				  					
				  					SharedDataSrvc.setView('graphRpm');
		  							},
			  // legend config
			  legend: {
			    display: true, // can be either 'left' or 'right'.
			    position: 'right',
			    // you can have html in series name
			    htmlEnabled: false
			  },
			  // override this array if you're not happy with default colors
			  colors: ['#558C89', '#96281B', '#4DAF7C'],
			  innerRadius: 0, // Only on pie Charts
			  lineLegend: 'lineEnd', // Only on line Charts
			  lineCurveType: 'cardinal', // change this as per d3 guidelines to avoid smoothline
			  isAnimate: true, // run animations while rendering chart
			  yAxisTickFormat: 's', //refer tickFormats in d3 to edit this value
			  xAxisMaxTicks: 12, // Optional: maximum number of X axis ticks to show if data points exceed this number
			  yAxisTickFormat: 's', // refer tickFormats in d3 to edit this value,
			  yAxisLabel: '# of Recalls',
			  waitForHeightAndWidth: true // if true, it will not throw an error when the height or width are not defined (e.g. while creating a modal form), and it will be keep watching for valid height and width values
			};
			
			
			$scope.$watch(function () { return SharedDataSrvc.getFoundData(); },
			   function (value) {
					$scope.foundData = value;			   
			   }
			);
	
	
			$scope.$watch(function () { return SharedDataSrvc.getGraphData(); },
			   function (value) {
				   if(value && value.data){
					   //console.log(JSON.stringify(value));
					   
					   $scope.graphData = value.data;
					   $scope.graphTitle = value.title;
					   $scope.state = value.state;
					   
					smoothScroll(document.getElementById('graphAnchor'));

					   
				   }
				   
				   if(value && SharedDataSrvc.getView() === 'mapRps'){
					   $scope.graphData = value.data;
					   $scope.graphTitle = value.title;
					   $scope.state = value.state;
				   }
			   }
			);
			

			

		} ]);