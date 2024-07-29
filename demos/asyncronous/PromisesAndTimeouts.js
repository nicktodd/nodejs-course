function HelloWorldAfter5(){
  return new Promise(function(resolve,reject){
    var timer = Math.floor(Math.random() * 10000 + 1000);
    setTimeout(function(){console.log('hello World took '+timer+' milliseconds to say');}, timer);
    if (timer > 5000){
      resolve('Success')
    }
    else {
      reject('Too Quick')
    }
  })
}

HelloWorldAfter5()
.then(function(result){
  console.log(result);
}).catch(function(error){
  console.log(error);
});
