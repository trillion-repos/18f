openFDA.controller('DataMapCtrl', [ '$rootScope', '$scope', 'FetchOpenFDASrvc', '$routeParams', '$location', '$anchorScroll','SharedDataSrvc',
		function($rootScope, $scope , FetchOpenFDASrvc, $routeParams, $location, $anchorScroll ,SharedDataSrvc) {

	var mapDataAll = null;
	var orderedDataAll = null
	var titleAll = null;
	var mapFillsAll = null;
	var mapLegends = null;
	var isTableTop = false;
	var top = {};
	var bottom = {};
	
	
	
	$scope.theMap = {
			  scope: 'usa',
			  options: {
				  staticGeoData: false,
				  labels: true,
				  labelSize: 10,
			   /* width: 500,*/
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
			    'defaultFill': '#ECECEA', 
			    'selectedFill': '#F5D76E'
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
			};
	
	$scope.changeTopStates = function(){
		var selectedDataset = SharedDataSrvc.getSelectedDataset();
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
	
	$scope.changeMap = function(dataset, isReload){
		SharedDataSrvc.setSelectedDataset(dataset);
		isTableTop = false;
		$scope.theMap.data = mapDataAll[dataset];
		$scope.theMap.fills = mapFillsAll[dataset];
		$scope.orderedData = orderedDataAll[dataset];
		$scope.changeTopStates(dataset);
		$scope.title = titleAll[dataset];
		$scope.theMap.options.mapLegends = mapLegends[dataset];
		$scope.mapPluginData = {customLegend:mapLegends[dataset]};
		
		if (!isReload){
			SharedDataSrvc.removeTableData();
			SharedDataSrvc.setView("mapRps");
			SharedDataSrvc.clearGraph();
		
		
			//un-highlight selected state
			if(SharedDataSrvc.getFillKey()){
				$scope.theMap.data[SharedDataSrvc.getState().stateCode.toLowerCase()].fillKey = SharedDataSrvc.getFillKey();			
			}
		}
		
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
	
	var response = SharedDataSrvc.getMapData($routeParams, "mapRps", function(err, response, isReload){
		var selectedDataset = SharedDataSrvc.getSelectedDataset();
		if(err){
			console.error(JASON.stringify(err));
			return;
		}
		
		mapDataAll = response.mapData;
		orderedDataAll = response.orderedData;
		titleAll = response.mapDataTitle;
		mapFillsAll = response.mapDataFills;
		mapLegends = response.mapDataLegends;
		$scope.mapPluginData = {customLegend:mapLegends[selectedDataset]};
		
		$scope.changeMap(selectedDataset, isReload);
	});
	
	
	
	
	$scope.theMap.responsive = true;
			
	
	$scope.mapPlugins = {
			  customLegend: function(layer, data, options) {
				  if(!data)
					  return;
				  //console.log("OPTIONS: ",JSON.stringify(data));
			    var html = ['<ul class="list-inline" style="padding-left:40px">'],
			        label = '';
			    for (var fillKey in this.options.fills) {
			    	if(data[fillKey]){
				      html.push('<li class="key" ',
				                  'style="border-top: 10px solid ' + this.options.fills[fillKey] + '">',
				                  data[fillKey],
				                  '</li>');
			    	}
			    }
			    html.push('</ul>');
			    d3.select(this.options.element).append('div')
			      .attr('class', 'datamaps-legend')
			      .html(html.join(''));
			  }
			};
	
	
	$scope.drillDownToYear = function(geography){
		var state = {};
		state.stateName = geography.properties.name;
		state.stateCode = geography.id;
		console.log(state.stateName + " : " +  state.stateCode);
		SharedDataSrvc.removeTableData();
		SharedDataSrvc.setView("graphRpy");		
		
		//un-highlight selected state
		if(SharedDataSrvc.getFillKey()){
			$scope.theMap.data[SharedDataSrvc.getState().stateCode.toLowerCase()].fillKey = SharedDataSrvc.getFillKey();			
		}				
		
		SharedDataSrvc.fetchData("graphRpy", state, $routeParams, null, null, $scope.theMap.data[geography.id.toLowerCase()].fillKey);
		
		//highlight selected state
		$scope.theMap.data[geography.id.toLowerCase()].fillKey = 'selectedFill'; 
	};
	
	

		} ]);