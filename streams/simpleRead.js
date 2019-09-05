const fs = require('fs');


/*fs.readFileSync('./simpleInputText.txt').toString().split('\n').forEach(function (line) { 
    console.log(line);
    fs.appendFileSync("./simpleOutputText.txt", line.toString() + "\n");
});*/

// or even simpler
inStream = fs.createReadStream('./simpleInputText.txt');
outStream = fs.createWriteStream('./simpleOutputText.txt');
inStream.pipe(outStream);