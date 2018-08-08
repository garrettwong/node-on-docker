// Imports the Google Cloud client library
const Bigtable = require('@google-cloud/bigtable');

// The name of the Cloud Bigtable instance
const INSTANCE_NAME = 'my-bigtable-instance';
// The name of the Cloud Bigtable table
const TABLE_NAME = 'my-table';

console.log(INSTANCE_NAME + ':' + TABLE_NAME);

(async () => {
  try {
    // Creates a Bigtable client
    const bigtable = new Bigtable();

    // Connect to an existing instance:my-bigtable-instance
    const instance = bigtable.instance(INSTANCE_NAME);

    // Connect to an existing table:my-table
    const table = instance.table(TABLE_NAME);

    var callback = function(err, apiResponse) {
      if (!err) {
        // Row successfully created
      }
    };
    
    table.create(callback);

    // Read a row from my-table using a row key
    let [singleRow] = await table.row('r1').get();

    // Print the row key and data (column value, labels, timestamp)
    console.log(
      `Row key: ${singleRow.id}\nData: ${JSON.stringify(
        singleRow.data,
        null,
        4
      )}`
    );
  } catch (err) {
    // Handle error performing the read operation
    console.error(`Error reading row r1:`, err);
  }
})();