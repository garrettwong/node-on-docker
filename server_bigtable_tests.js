'use strict';

// express 4.0
const express = require('express');

// big table server tests
import BigTableService from './server/lib/bigtable/bigtable-service';

// SHOW API
console.log('BigTableService API:');
console.log(BigTableService);
console.log('//============================= end BigTableService API\n');
// END SHOW API


// ADD ROW
let key = 'rowKey1';
let data = 'Hello Garrett!';

console.log(`AddRow: Adding Row with key: ${key} and data: ${data}`);

BigTableService.addRow(key, data);

console.log('//============================= end AddRow\n');
// END ADD ROW


// GET ROW BY KEY
console.log(`GetRowByKey: key: ${key}`);
let res = BigTableService.getRowByKey(key);
res.then(function(a, b) {
  console.log('GetRowByKey: success');
  console.log(a.data['cf3'].greeting);
}, function(c, d) {
  console.log("GetRowByKey: error", c,d);
});
console.log('//============================= end GetRowByKey\n');
// END GET ROW BY KEY



// GET ROWS
console.log('GetRows:');
getRowsOperation();
console.log('//============================= end GetRows\n');



// DELETE ROW
let keyToDelete = 'greeting1';
console.log(`DeleteRowByKey: key: ${keyToDelete}`);
BigTableService.deleteRow(keyToDelete);
console.log('//============================= end DeleteRowByKey\n');
// END DELETE ROW



// GET ROWS AGAIN
getRowsOperation();


function getRowsOperation() {
  let rows = BigTableService.getRows();

  rows.then(function(rowsResp,b ) {
    // console.log('process bt rows', rowsResp);
  
    let count = 0;
    for (const row of rowsResp) {
      console.log(`Key: ${row.id}`);
      console.log(row.data['cf3']);
      console.log(`\tRead: (${row})`);
    }
  }, function(err, resp) {
    console.log('process bt rows - failure');
    console.log(err, resp);
  });
}