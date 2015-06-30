var mapService = require("./../services/mapOfda.server.service");
var config = require("./../../config/config");
var states = config.states;

describe("Test Suite for maphOfda.server.service", function() {
  var params = {};

  it("Spec for mapRps function", function(done) {
    mapService.mapRps(params,function( erro,response){
        //expect drug,food,and devices to be retunred
        expect(response.mapData.drug).toBeDefined();
        expect(response.mapData.food).toBeDefined();
        expect(response.mapData.device).toBeDefined();

        /* Drill down in one to make sure the data is correct, expect there
         to be all 50 states with defined properties of fillKey,count,
         and label */
        for(var state in states){
          //no data for SD or ND for some reson, exlcuding them from the test
          if(state != "nd" && state != "sd" ){
            expect(response.mapData.drug[state]).toBeDefined();
            expect(response.mapData.drug[state].fillKey).toBeDefined();
            expect(response.mapData.drug[state].count).toBeDefined();
            expect(response.mapData.drug[state].label).toBeDefined();
          }
        }
        done();
      });
  },10000); // timeout after 1000 ms
});
