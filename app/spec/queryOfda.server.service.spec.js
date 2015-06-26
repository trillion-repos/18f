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

    var query2 = {
          queryId: 1,
          noun:'drug',
          endpoint:'enforcement',
          params:{
            search:'distribution_pattern:NA',//no state with this name
            count:'distribution_pattern',
            limit:1000, //if set to 0, it will default to 100 results
            skip:0
          }
        };

  it("Spec for getData function", function(done) {
    //positive test
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

        expect(data.results[0].term).toBe("va");
        //done();
      });

      //negative test
      queryService.getData(query2,function(error,data, query){
          if(error.body){
            error = JSON.parse(error.body);
          }else{
            error = {};
          }

          expect(error.error.code).toBe("NOT_FOUND");
          done();
        });
  },500); // timeout after 500 ms
});
