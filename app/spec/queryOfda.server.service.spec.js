var queryService = require("./../services/queryOfda.server.service"),
    logger = require('./../utils/logger.js')(module);

describe("Test Suite for queryOfda.server.service", function() {
  var query = {
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

    var negativeQuery = {
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
    queryService.getData(query,function(error,data, query){
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
        done();
      });

  },2000);

  it("Neg Spec for getData function", function(done) {
      //negative test
      queryService.getData(negativeQuery,function(error,data, query){
          if(error.body){
            error = JSON.parse(error.body);
          }else{
            error = {};
          }

          expect(error.error.code).toBe("NOT_FOUND");
          done();
        });
  },1500);
});
