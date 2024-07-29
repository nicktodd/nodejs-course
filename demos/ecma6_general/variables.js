// added a simple comment
let complexObject = {
    name: "Fred",
    age: 30,
    address: {
        line1: "1 High Street",
        line2: "Bristol"
    }
}

let {name, address} = complexObject;
// this line mentions deprecation but it is not relevant
console.log(name);

console.log(address.line2);

function takeInObjectAndAugmentIt(someObject) {
    return {
        ...someObject,
        country: "UK"
    }
}

console.log(JSON.stringify(takeInObjectAndAugmentIt(complexObject)));
