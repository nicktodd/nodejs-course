class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    sleep() {
        console.log("Zzzzzz");
    }
}
let person = new Person("Fred", 30);
console.log(person);