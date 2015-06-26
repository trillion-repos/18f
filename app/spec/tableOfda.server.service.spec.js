var tableService = require("./../services/tableOfda.server.service");
require("./../utils/utils.js");

describe("Test Suite for tableOfda.server.service", function() {
  var params = {
    month:'aug',
    year:2014,
    state:'va'
  };

  var expectedColumns = [
    { title: 'Recall Number',
        field: 'recall_number',
        filter: { recall_number: 'text' } },
      { title: 'Reason For Recall',
        field: 'reason_for_recall',
        filter: { reason_for_recall: 'text' } },
      { title: 'Status', field: 'status', filter: { status: 'text' } },
      { title: 'Distribution Pattern',
        field: 'distribution_pattern',
        filter: { distribution_pattern: 'text' } },
      { title: 'Product Quantity',
        field: 'product_quantity',
        filter: { product_quantity: 'text' } },
      { title: 'Recall Initiation Date',
        field: 'recall_initiation_date',
        filter: { recall_initiation_date: 'text' } },
      { title: 'State', field: 'state', filter: { state: 'text' } },
      { title: 'Event Id',
        field: 'event_id',
        filter: { event_id: 'text' } },
      { title: 'Product Type',
        field: 'product_type',
        filter: { product_type: 'text' } },
      { title: 'Product Description',
        field: 'product_description',
        filter: { product_description: 'text' } },
      { title: 'Country',
        field: 'country',
        filter: { country: 'text' } },
      { title: 'City', field: 'city', filter: { city: 'text' } },
      { title: 'Recalling Firm',
        field: 'recalling_firm',
        filter: { recalling_firm: 'text' } },
      { title: 'Report Date',
        field: 'report_date',
        filter: { report_date: 'text' } },
      { title: 'Voluntary Mandated',
        field: 'voluntary_mandated',
        filter: { voluntary_mandated: 'text' } },
      { title: 'Classification',
        field: 'classification',
        filter: { classification: 'text' } },
      { title: 'Code Info',
        field: 'code_info',
        filter: { code_info: 'text' } },
      { title: 'Openfda',
        field: 'openfda',
        filter: { openfda: 'text' } },
      { title: 'Initial Firm Notification',
        field: 'initial_firm_notification',
        filter: { initial_firm_notification: 'text' } }
     ];

  it("Spec for tableRpm function", function(done) {
    tableService.tableRpm(params,function(error,response){
      expect(response.tableTitle).toBe('Recalls for 2014 per Month for Virginia');
      expect(response.table).toBeDefined();
      expect(response.columns).toEqual(expectedColumns);
      done();
    });
  },1000); // timeout after 1000 ms
});
