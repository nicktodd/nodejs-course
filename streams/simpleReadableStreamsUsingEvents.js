const fs = require('fs');

var fileStreamToRead = fs.createReadStream("./as_you.xml");
var fileStreamToSave = fs.createWriteStream('./simpleOutputText.txt');


// set up some event handlers
let chunkCount = 0;
fileStreamToRead.on('data', (chunk)=> {
      console.log("wrote this chunk " + chunk);
      fileStreamToSave.write(chunk);
      chunkCount++;
});
fileStreamToRead.on('end',()=>{
      console.log("finished receiving data");
      console.log("wrote " + chunkCount + " chunks");
});
fileStreamToRead.on('error', (e) => {
  console.log("something went wrong" + e);
});

