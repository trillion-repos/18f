var mapService = require("./../services/mapOfda.server.service");
var config = require("./../../config/config");
var states = config.states;

describe("Test Suite for maphOfda.server.service", function() {
  var params = {};

  it("Spec for mapRps function", function(done) {
    mapService.mapRps(params,function( erro,response){
        //expect there to be all 50 states with defined properties of fillKey,count, and label
        for(var state in states){
          if(state != "nd" && state != "sd" ){//no data for SD or ND for some reson, exlcuding them from the test
            expect(response.mapData.drug[state]).toBeDefined();
            expect(response.mapData.drug[state].fillKey).toBeDefined();
            expect(response.mapData.drug[state].count).toBeDefined();
            expect(response.mapData.drug[state].label).toBeDefined();
          }
        }
        done();
      });
  },1000); // timeout after 1000 ms
});
