//Example transform stream file for converting a plain text file to individual json objects for each chunk

const fs = require('fs');
const { Transform } = require('stream');

const ioStream = new Transform({
  readableObjectMode : true,

  transform(chunk, encoding, callback) {
    let obj = {"data":chunk.toString()};
    this.push(obj);
    callback();
  }
});

const fileStreamIn = fs.createReadStream('./myInputFile.txt');

const fileStreamOut = fs.createWriteStream('./myOutputFile.txt');

fileStreamIn.pipe(ioStream);

var chunkCount = 0;
ioStream.on('data',(chunk)=>{
  console.log("writing the following to output file...\n" + chunk.data);
  fileStreamOut.write(chunk.data);
  chunkCount ++;
});

ioStream.on('end',()=>{
  console.log("\nFinished file. used a total of "+chunkCount.toString()+" chunks");
});
ioStream.on('error',(error)=>{
  console.log("Stream failed!\nReceived this error: "+error.toString());
})
