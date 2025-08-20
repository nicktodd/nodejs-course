const callbackExample = require("./callbacks");
const promisesExample = require("./callbackdoneaspromise")


// ********************** Let's first test the classic callback mechanism
function handleTheResultWhenWeGetIt(err, result) {
    if (err) {
        console.log("looks like the function didn't work");
    }
    else {
        console.log("I'm the callback function and the long running process is finished! Here is your message back: " + result);
    }
}
callbackExample("I'd like to get this message back when you are finished", handleTheResultWhenWeGetIt);

console.log("*******************************************");

// ***********************  Now let's test the same thing but it's now written with Promises
promisesExample("hello").then(function(result) {
    console.log("got this back " + result);
}).catch(function(e) {
    console.log("something went wrong" + e);
});

console.log("*******************************************");
// ********************** Finally let's test the same promise using async/await
async function testingAsyncSyntax() {
    // And Now finally, let's test the promise using async/await
    console.log("calling the promise now using async. Will have to wait for the reply");
    try {
        let result = await promisesExample("hello");
        console.log("got a reply " + result);
    }
    catch (e) {
        console.log("didn't work!");
    }
}

testingAsyncSyntax();

