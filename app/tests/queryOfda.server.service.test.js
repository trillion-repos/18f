describe("Test Suite for queryOfda.server.service", function() {

  var queryService = require("./../services/queryOfda.server.service");

  it("Spec for openFDAUrl function", function(){
    var query;
    var url = queryService.openFDAUrl(query);
    expect(a).toBe(true);
  });

  it("Spec for getData function", function(done) {
    	queryService.getData(allTermQuery,function(error,data, query){
        expect(a).toBe(true);
        done();
      }
  },500); // timeout after 500 ms
});
