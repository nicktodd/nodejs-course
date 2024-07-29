var fetch = require('node-fetch');

async function myAsyncFunction(){
  let response = await fetch('http://date.jsontest.com/');
  let JsonData = await response.json();
  console.log('The data is: ' + JsonData.date)
  return JsonData;
}

myAsyncFunction();
