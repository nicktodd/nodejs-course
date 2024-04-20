function* generatorFunction(){
    console.log('this is the first time i have been executed');
    yield null;
    console.log('this is the second');
    }

    var generator = generatorFunction();

    console.log('activating once');
    generator.next();
    console.log('activating second time');
    generator.next();
    
