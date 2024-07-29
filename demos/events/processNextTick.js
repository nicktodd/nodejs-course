const fs = require('fs');


function myCallback(){
  console.log("Boop Beep, I'm a callback function");
}

/*
setTimeout(() => {console.log("I have been set on a timeout of zero")},0);
setImmediate(() => {console.log("Hi There")});
process.nextTick(myCallback);
*/

console.log("Entering IO stream");

fs.readFile('SetImmediate.js',() => {
  setTimeout(() => {console.log("I have been set on a timeout of zero")},0);
  setImmediate(() => {console.log("I am set immediate")});
  process.nextTick(myCallback);
});
