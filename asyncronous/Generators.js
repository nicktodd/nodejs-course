function* generatorFunction(){
  console.log("I've not yielded yet");
  value = yield console.log('I will print this, then yield'); //The value will not be assigneds until the second .next() call
  console.log(value);
}

var generator = generatorFunction();

generator; //running the function like this doesn't do anything because the generator starts in the suspended state.

generator.next();
generator.next('This text was passed into the yield value');
//the output of this code is as follows:
/*
  this is thew first time i hjave been executed
  this is the second, although I am first in line
*/

//so the .next first runs the code until and including the yield line.
//but thew value of that yield will be populated by the value passed by the _second_ .next

// fibonachi generator
function* fibonacciGenerator () {
  var current = 0, next = 1, swap
  while (true) {
    swap = current, current = next
    next = swap + next
    yield current
  }
}

fibo = fibonacciGenerator();
for (var i=0; i<10; i++) {
  console.log(fibo.next().value);
}