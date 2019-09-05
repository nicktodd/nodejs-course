// without lambdas

function processItem (nextItem) {
    console.log(nextItem);

}

arrayOfItems = ["item1", "item2", "item3"];

arrayOfItems.forEach(processItem);


// now with lambdas
arrayOfItems.forEach((item) => console.log(item));


