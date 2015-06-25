var queryService = require("./../services/queryOfda.server.service");

describe("Test Suite for queryOfda.server.service", function() {
  var expectedURL = 'https://api.fda.gov/drug/enforcement.json?search=distribution_pattern:VA&count=distribution_pattern';
  var query1 = {
        queryId: 1,
        noun:'drug',
        endpoint:'enforcement',
        params:{
          search:'distribution_pattern:VA',
          count:'distribution_pattern',
          limit:1000, //if set to 0, it will default to 100 results
          skip:0
        }
      };
  it("Spec for getData function", function(done) {
    queryService.getData(query1,function(error,data, query){
        if(error){
          console.error("ERROR: ", JSON.stringify(error), JSON.stringify(query));
        }

        if(data){
          data = JSON.parse(data);
        }else{
          data = {};
        }

        if(!data.results){
          console.log("No Results for: " + JSON.stringify(query));
          data.results = [];
        }

        var testTerm = data.results[0].term;

        expect(testTerm).toBe("va");
        done();
      });
  },250); // timeout after 250 ms
});
