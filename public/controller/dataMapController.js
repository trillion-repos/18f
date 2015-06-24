openFDA.controller('DataMapCtrl', [ '$rootScope', '$scope', 'FetchOpenFDASrvc', '$routeParams', '$location', '$anchorScroll',
		function($rootScope, $scope , FetchOpenFDASrvc, $routeParams, $location, $anchorScroll) {

	var mapDataAll = null;
	var orderedDataAll = null
	var titleAll = null;
	var mapFillsAll = null;
	var mapLegends = null;
	var isTableTop = false;
	var top = {};
	var bottom = {};
	var selectedDataset = 'drug';
	
	$scope.changeTopStates = function(){
		isTableTop = !isTableTop;
		
		if(isTableTop){
			
			if(!top[selectedDataset])
				top[selectedDataset] = $scope.orderedData.slice(0,10);
			
			$scope.glyPos = "down";
			$scope.tableTopTitle = "Top ";
			$scope.orderedDataTable = top[selectedDataset];
		}
		else{			

			if(!bottom[selectedDataset])
				bottom[selectedDataset] = $scope.orderedData.reverse().slice(0,10);
			
			$scope.glyPos = "up";
			$scope.tableTopTitle = "Bottom ";
			$scope.orderedDataTable = bottom[selectedDataset];
		}
	};
	
	$scope.selectedDatasetDrugs = true;
	
	$scope.changeMap = function(dataset){
		isTableTop = false;
		selectedDataset = dataset;
		$scope.map.data = mapDataAll[dataset];
		$scope.map.fills = mapFillsAll[dataset];
		$scope.orderedData = orderedDataAll[dataset];
		$scope.changeTopStates(dataset);
		$scope.title = titleAll[dataset];
		$scope.map.options.mapLegends = mapLegends[dataset];
		$scope.mapPluginData = {customLegend:mapLegends[dataset]};
		
		//$scope.map.updateChoropleth();
		
		switch (dataset) {
		case "drug":
			$scope.selectedDatasetDrugs = true;
			$scope.selectedDatasetDevices = false;
			$scope.selectedDatasetFood = false;
			break;
		case "device":
			$scope.selectedDatasetDrugs = false;
			$scope.selectedDatasetDevices = true;
			$scope.selectedDatasetFood = false;
			break;
		case "food":
			$scope.selectedDatasetDrugs = false;
			$scope.selectedDatasetDevices = false;
			$scope.selectedDatasetFood = true;
			break;
		default:
			break;
		}
	};
	
	
	FetchOpenFDASrvc.get({appId:$routeParams.appId, modId: $routeParams.modId, fnId:$routeParams.fnId, qId:"mapRps"},
			function success(response) {
				
				
				if(!response){
					console.warn("No data found for MapId="+$routeParams);
					return;
				}
				

				console.log("Map Success:" + JSON.stringify(response));
				mapDataAll = response.mapData;
				orderedDataAll = response.orderedData;
				titleAll = response.mapDataTitle;
				mapFillsAll = response.mapDataFills;
				mapLegends = response.mapDataLegends;
				$scope.mapPluginData = {customLegend:mapLegends[selectedDataset]};
				
				$scope.changeMap(selectedDataset);
				
				},
			function error(errorResponse) {
				console.log("Error:" + JSON.stringify(errorResponse));					
				
				$scope.error.push(errorResponse.data);
				});
	
	$scope.map = {
			  scope: 'usa',
			  options: {
				  staticGeoData: false,
				  labels: true,
				  labelSize: 10,
			    width: 900,
			    legendHeight: 60// optionally set the padding for the legend

			  },
			  geographyConfig: {
			    highlighBorderColor: '#EAA9A8',
			    highlighBorderWidth: 2
			  },
			  fills: {/*
				"VH":'#2a4644',
			    "H": '#558C89',
			    "M": '#74AFAD',
			    "L": '#D5E7E6',*/
			    'defaultFill': '#ECECEA'
			  },
			  data: {},
			  geographyConfig: {
		            popupTemplate: function(geo, data) {
		            	if(!data)
		            		return ['<div class="hoverinfo"><strong>',
			                        'No Known Recalls for ' + geo.properties.name
			                       ].join('');
		            	
		                return ['<div class="hoverinfo"><strong>',
		                        'Number of Recalls in ' + geo.properties.name,
		                        ': ' + data.count,
		                        '</strong></div>'].join('');
		            }
		        }
			}
			
	
	$scope.mapPlugins = {
			  customLegend: function(layer, data, options) {
				  if(!data)
					  return;
				  console.log("OPTIONS: ",JSON.stringify(data));
			    var html = ['<ul class="list-inline" style="padding-left:40px">'],
			        label = '';
			    for (var fillKey in this.options.fills) {
			      html.push('<li class="key" ',
			                  'style="border-top: 10px solid ' + this.options.fills[fillKey] + '">',
			                  data[fillKey],
			                  '</li>');
			    }
			    html.push('</ul>');
			    d3.select(this.options.element).append('div')
			      .attr('class', 'datamaps-legend')
			      .html(html.join(''));
			  }
			};
	
	
	//GRAPH
	var showingMonth = false;
	$scope.config2 = {
			  title: false  , // chart title. If this is false, no title element will be created.
			  tooltips: true,
			  labels: false, // labels on data points
			  // exposed events
			  mouseover: function(d) {$scope.currentYear = d.x;},
			  mouseout: function(d) {$scope.currentYear = null;},
			  click: function(d){ if(!showingMonth)getGraphData(); else getTableData()},
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

	
	$scope.drillDownToYear = function(geography){
		$rootScope.stateName = geography.properties.name;
		$rootScope.stateCode = geography.id;
		console.log($rootScope.stateName + " : " +  $rootScope.stateCode);
		
		if($rootScope.acData)
			$rootScope.acData = {};
		
		$rootScope.graphTitle = "";
		
		getGraphData();
	};
	
	function getTableData (){
		console.log("Getting table data");
		
	}
function getGraphData (){
		var graphParams = {};
		graphParams.appId = $routeParams.appId;
		graphParams.modId = $routeParams.modId;
		graphParams.fnId = $routeParams.fnId;
		graphParams.qId = "graphRpy";
		graphParams.state = $rootScope.stateCode.toLowerCase();
		
		if($scope.currentYear)
			graphParams.year = $scope.currentYear;
		
		FetchOpenFDASrvc.get(graphParams, function success(response) {
					
					
					if(!response){
						console.warn("No data found for graph="+$routeParams);
						return;
					}
					

					console.log("Graph per Year Success:" + JSON.stringify(response));
					$rootScope.acData = response.graph;
					
					if($scope.currentYear)
						$rootScope.graphTitle = "Recalls for " + $scope.currentYear + " per Month for " + $rootScope.stateName ;
					else
						$rootScope.graphTitle = "Recalls per Year for " + $rootScope.stateName;
					
					 $location.hash('graphAnchor');

				      $anchorScroll();
				      showingMonth = true;
					
					
					},
				function error(errorResponse) {
					console.log("Error:" + JSON.stringify(errorResponse));				
					$scope.error.push(errorResponse.data);
					});
	}

		} ]);