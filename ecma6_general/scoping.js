function sayHello(name) {
    console.log(name)
    anotherGlobalVariable = name;
    var thisOneIsLocal = name;

    for(var i=0; i<3; i++) {
        console.log(i)
    }
    console.log(i) // i is still visible!

    for(let j=0; j<3; j++) {
        console.log(j)
    }
    console.log(j) // j is not visible

}

globalNameVariable = "Nick"

sayHello(globalNameVariable)


console.log(anotherGlobalVariable)
//console.log(thisOneIsLocal) // will not work