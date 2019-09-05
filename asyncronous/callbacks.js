module.exports = function (inputValue, callback) {
    // do some processing on the input value
    // could take a while
    var resultOfLotsOfEffort = null;
    try {
       // not really any effort, but just pretending
       var resultOfLotsOfEffort = inputValue;
    }
    catch (e) {
        // problem so call back with the exception
        // use the return keyword so the rest of the method doesn't run
        return callback(e);
    }
    // finally done, so callback with the result
    return callback(null, resultOfLotsOfEffort);
  }