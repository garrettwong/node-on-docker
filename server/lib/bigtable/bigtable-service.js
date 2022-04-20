/* 
  Bigtable Reference: 
    https://cloud.google.com/bigtable/docs/overview

  Bigtable node.js reference: 
    https://github.com/googleapis/nodejs-bigtable
*/

const Bigtable = require('@google-cloud/bigtable');

const TABLE_NAME = 'my-table2';
const COLUMN_FAMILY_ID = 'cf3';
const COLUMN_QUALIFIER = 'greeting';
const INSTANCE_ID = 'my-bigtable-instance';
const GCLOUD_PROJECT = '[YOUR_PROJECT_ID]';

async function getTable() {
  var bigtableOptions = {
    projectId: GCLOUD_PROJECT,
  };

  const bigtableClient = Bigtable(bigtableOptions);
  const instance = bigtableClient.instance(INSTANCE_ID);


  const table = instance.table(TABLE_NAME);
  const [tableExists] = await table.exists();
  if (!tableExists) {
    console.log(`Creating table ${TABLE_NAME}`);
    const options = {
      families: [{
        id: COLUMN_FAMILY_ID,
        rule: {
          versions: 1,
        },
      }, ],
    };

    await table.create(options);
  }

  // create family if doesn't exist
  const family = table.family(COLUMN_FAMILY_ID);
  family.create().then(function (data) {
    const family2 = data[0];
    const apiResponse2 = data[1];
  });

  return table;
}


async function getRows() {
  let table = await getTable();

  const filter = [{
    column: {
      cellLimit: 1, // Only retrieve the most recent version of the cell.
    },
  }];

  const [allRows] = await table.getRows({
    filter
  });

  return allRows;
  
}

const getRowGreeting = row => {
  return row.data[COLUMN_FAMILY_ID][COLUMN_QUALIFIER][0].value;
};

async function getRowByKey(key) {
  let table = await getTable();
  const filter = [{
    column: {
      cellLimit: 1, // Only retrieve the most recent version of the cell.
    },
  }, ];
  let [singleRow] = await table.row(key).get({
    filter
  });
  console.log(`\tRead: ${(singleRow)}`);
  return singleRow;
}

async function addRow_test() {
  let table = await getTable();

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
  console.log('inserted', rowsToInsert);

  table.insert(rowsToInsert);
}

async function addRow(key, data) {
  let table = await getTable();
  
  let formattedData = {
    [COLUMN_FAMILY_ID]: {
      timestamp: new Date(),
      value: data
    }
  };

  table.insert({ key: key, data: formattedData});
}

// rows: [] of objects or strings or whichever data type
async function addRows(rows) {
  let table = await getTable();
  const rowsToInsert = rows.map((data, index) => ({
    key: `row${index}`,
    data: {
      [COLUMN_FAMILY_ID]: {
        timestamp: new Date(),
        value: data
      }
    }
  }));
}

async function updateRow(key, data) {
  let table = await getTable();

  let formattedData = {
    [COLUMN_FAMILY_ID]: {
      timestamp: new Date(),
      value: data
    }
  };

  table.updateRow(key, formattedData);
}

async function deleteRow(key) {
  let table = await getTable();

  console.log('wht');

  const filter = [{
    column: {
      cellLimit: 1, // Only retrieve the most recent version of the cell.
    },
  }];

  let res = await table.row(key).delete({filter});

  console.log('deletion???', res);
  
  res.then(function(a, b) {
    console.log('Delete success');
    console.log(a,b);
  }, function(c,d ) {
    console.log('Delete error');
    console.log('err', c, d);
  });
}

// exposed on the service
export default {
  getRowGreeting,
  getRows,
  getRowByKey,
  addRow_test,
  addRow,
  addRows,
  updateRow,
  deleteRow,
};