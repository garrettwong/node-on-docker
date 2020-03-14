// This file will only work on node v8.x since it uses async/await.
// A version of this script is available for node v6.x in index.v6.js

const bigtable = require('@google-cloud/bigtable');

const TABLE_ID = 'my-table2';
const COLUMN_FAMILY_ID = 'cf3';
const COLUMN_QUALIFIER = 'greeting';
const INSTANCE_ID = process.env.INSTANCE_ID;
const GCLOUD_PROJECT = process.env.GCLOUD_PROJECT;

if (!INSTANCE_ID) {
  throw new Error('Environment variables for INSTANCE_ID must be set!');
}

if (!GCLOUD_PROJECT) {
  throw new Error('Environment variables GCLOUD_PROJECT must be set!');
}

var bigtableOptions = {
  projectId: GCLOUD_PROJECT,
};

const getRowGreeting = row => {
  return row.data[COLUMN_FAMILY_ID][COLUMN_QUALIFIER][0].value;
};

(async () => {
  try {
    const bigtableClient = bigtable(bigtableOptions);
    const instance = bigtableClient.instance(INSTANCE_ID);

    const table = instance.table(TABLE_ID);
    const [tableExists] = await table.exists();
    if (!tableExists) {
      console.log(`Creating table ${TABLE_ID}`);
      const options = {
        families: [
          {
            id: COLUMN_FAMILY_ID,
            rule: {
              versions: 1,
            },
          },
        ],
      };
      
      await table.create(options);
    }

    const family = table.family(COLUMN_FAMILY_ID);
    console.log('family');
    console.log(family);
    //-
    // If the callback is omitted, we'll return a Promise.
    //-
    family.create().then(function(data) {
        console.log('success');

        const family2 = data[0];
        const apiResponse2 = data[1];

        console.log(family2, apiResponse2);
    });

    
    console.log('Write some greetings to the table');
    const greetings = ['Hello World!', 'Hello Bigtable!', 'Hello Node!'];
    const rowsToInsert = greetings.map((greeting, index) => ({
      key: `greeting${index}`,
      data: {
        [COLUMN_FAMILY_ID]: {
          [COLUMN_QUALIFIER]: {
            // Setting the timestamp allows the client to perform retries. If
            // server-side time is used, retries may cause multiple cells to
            // be generated.
            timestamp: new Date(),
            value: greeting,
          },
        },
      },
    }));
    await table.insert(rowsToInsert);

    const filter = [
      {
        column: {
          cellLimit: 1, // Only retrieve the most recent version of the cell.
        },
      },
    ];

    console.log('Reading a single row by row key');
    let [singeRow] = await table.row('greeting0').get({filter});
    console.log(`\tRead: ${getRowGreeting(singeRow)}`);

    console.log('Reading the entire table');
    const [allRows] = await table.getRows({filter});
    for (const row of allRows) {
      console.log(`\tRead: ${getRowGreeting(row)}`);
    }

    console.log('Delete the table');
    await table.delete();
  } catch (error) {
    console.error('Something went wrong:', error);
  }
})();