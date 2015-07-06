var 	config = require('./../../config/config.js');

describe("Test Suite for config", function() {
    it("Spec for getGlobbedFiles function", function(done) {
      var globbedFileArray = config.getGlobbedFiles('./app/models/**/*.js');

      expect(globbedFileArray[0]).toEqual('./app/models/query.server.model.js');
      done();
    });
});
