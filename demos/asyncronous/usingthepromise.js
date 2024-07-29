const callbackdoneasapromise = require("./callbackdoneaspromise");

// using the promise with the then/catch syntax
//callbackdoneasapromise("hello")
//        .then((result) => console.log(result) ) // handle the success
//        .catch((err) => console.log(err)) ; // handle the failure

        
// using the promise with async / await
async function callTheFunctionUsingPromisesUsingAsyncAwait() {
    try {
        console.log("Just before the await");
        var result = await callbackdoneasapromise("hello");
        console.log("this is AFTER AWAIT " + result);
    }
    catch(err) {
        console.log("looks like the promise didn't work out" + err);
    }
}
console.log("about to call the async function");
callTheFunctionUsingPromisesUsingAsyncAwait();
console.log("just finished calling the async function");