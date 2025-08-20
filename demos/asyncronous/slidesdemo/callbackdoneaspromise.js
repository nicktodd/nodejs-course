module.exports = function (inputValue) { // note no callback now
    // note function returns a promise    
  return new Promise(function(resolve, reject) {
        console.log("entered the promise");
        // could take a while
        let resultOfLotsOfEffort = null;
        let seconds = 5;
        let waitTill = new Date(new Date().getTime() + seconds * 1000);
        
        try {
            // not really any effort, but just pretending
            while(waitTill > new Date()){}
            resultOfLotsOfEffort = inputValue;
        }
        catch (e) {
            // problem so call back on the reject function
            console.log("Something went wrong so now call reject. " + e);
            return reject(e);
        }
        // finally done, so callback on the resolve function
        console.log("All done so now call resolve. " + resultOfLotsOfEffort);
        return resolve(resultOfLotsOfEffort);
    });
};