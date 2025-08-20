module.exports = function (inputValue, callback) {
    // do some processing on the input value
    // could take a while
    console.log("hello from the long running function. I am about to do something that takes a few seconds. I will call you back later")
    let resultOfLotsOfEffort = null;
    let seconds = 5;
    let waitTill = new Date(new Date().getTime() + seconds * 1000);
    try {
       // not really any effort, but just pretending
       while(waitTill > new Date()){}
       resultOfLotsOfEffort = inputValue;
    }
    catch (e) {
        // problem so call back with the exception
        // use the return keyword so the rest of the method doesn't run
        return callback(e);
    }
    // finally done, so callback with the result
    console.log("the long running function is now done, so i will call back now")
    return callback(null, resultOfLotsOfEffort);
  }