const { Readable,Writable } = require('stream');

const myObjectModeReadableStream = new Readable({
  objectMode:true,
  read(){
    //do the reading...
  }
});

const myObjectModeWritableStream = new Writable({
  objectMode:true,
  write(){
    //do the writing...
  }
})
