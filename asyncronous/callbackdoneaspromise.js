module.exports = function (inputValue) { // note no callback now
    // note function returns a promise    
    return new Promise(function(resolve, reject) {
        console.log("entered the promise");
        // could take a while
        var resultOfLotsOfEffort = null;
        try {
            // not really any effort, but just pretending
            resultOfLotsOfEffort = inputValue;
        }
        catch (e) {
            // problem so call back on the reject function
            console.log("Inside the promise " + e);
            return reject(e);
        }
        // finally done, so callback on the resolve function
        console.log("this is DONE JUST BEFORE THE CALLBACK " + resultOfLotsOfEffort);
        return resolve(resultOfLotsOfEffort);
    });
};