function* generatorFunction(){
  console.log("I've not yielded yet");
  let value = yield // this will assign value to whatever is passed in
  console.log('I will print this, then yield'); //The value will not be assigned until the second .next() call
  console.log(value);
}

var generator = generatorFunction();

//generator.next();

//generator.next('This text was passed into the yield value');
//the output of this code is as follows:
/*
  this is thew first time i hjave been executed
  this is the second, although I am first in line
*/

//so the .next first runs the code until and including the yield line.
//but thew value of that yield will be populated by the value passed by the _second_ .next

// fibonachi generator
function* fibonacciGenerator () {
  let current = 0, next = 1, swap
  while (true) {
    swap = current; 
    current = next
    next = swap + next
    console.log("the next number the generator will be providing is " + current);
    yield current // set this as the value for the caller
  }
}

let fibo = fibonacciGenerator();
for (var i=0; i<10; i++) {
  console.log("The number returned from the generator is " + fibo.next().value);
}