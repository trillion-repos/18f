var graphService = require("./../services/graphOfda.server.service");
var utils = require("./../utils/utils.js");

describe("Test Suite for graphOfda.server.service", function() {
 var params = {
   state: "va",
   year: 2013
 };
 var negParams = {
   state: "va",
   year: 2018 //future time no results
 };

 var expectedGraph = {
   series: [ 'Drugs', 'Devices', 'Food' ],
   data:[
         { x: 'Jan', y: [ 0, 14, 30 ] },
         { x: 'Feb', y: [ 1, 26, 7 ] },
         { x: 'Mar', y: [ 0, 24, 81 ] },
         { x: 'Apr', y: [ 2, 43, 7 ] },
         { x: 'May', y: [ 0, 26, 27 ] },
         { x: 'Jun', y: [ 0, 43, 20 ] },
         { x: 'Jul', y: [ 3, 43, 81 ] },
         { x: 'Aug', y: [ 0, 34, 11 ] },
         { x: 'Sep', y: [ 0, 40, 13 ] },
         { x: 'Oct', y: [ 0, 31, 5 ] },
         { x: 'Nov', y: [ 0, 166, 38 ] },
         { x: 'Dec', y: [ 299, 32, 40 ] },
         { x: 'Jan', y: [ 0, 10, 221 ] }
        ]
    };

    var expectedNegGraph = {
      series: [ 'Drugs', 'Devices', 'Food' ],
      data:[]
       };


  it("Spec for graphRpy function", function(done) {
	  setTimeout(function(){
    graphService.graphRpy(params,function(error,response){
        if(error){
          console.error("ERROR: ", JSON.stringify(error));
        }
        console.log(response.graph);
        expect(expectedGraph).toEqual(response.graph);
        done();
      });
	  },utils.getTimeout());

  },10000); // timeout after 1000 ms

  it("Negative Spec for graphRpy function", function(done) {
	  setTimeout(function(){
    graphService.graphRpy(negParams,function(error,response){
        if(error){
          console.error("ERROR: ", JSON.stringify(error));
        }
        console.log(response.graph.data);
        expect(response.graph).toEqual(expectedNegGraph);
        done();
      });
	  },utils.getTimeout());
  },10000); // timeout after 1000 ms
});
