
function myCallback(){
  console.log("Boop Beep, I'm a callback function");
}

setImmediate(myCallback);
console.log("Hi There");
