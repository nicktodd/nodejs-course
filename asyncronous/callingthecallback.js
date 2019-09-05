const callbacks = require("./callbacks");

function handleTheResultWhenWeGetIt(err, result) {
    if (err) {
        console.log("looks like the function didn't work");
    }
    else {
        console.log("got a result! " + result);
    }
}
callbacks("hello, please call back when you are done", handleTheResultWhenWeGetIt);