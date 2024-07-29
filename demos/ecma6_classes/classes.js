class Car {

    static bogStandardCar() {
        return new Car("Ford", "Fiesta");
    }

    constructor(make, model) {
        this.make = make;
        this.model = model;
        this.speed = 0;
    }

    accelerate(){
        // must use the this keyword to access the property
        this.speed++;
    }

}

car = new Car("BMW", "5 series");
car.accelerate();

console.log(car.speed);

class SportsCar extends Car {

    constructor(make, model, turboBoost) {
        // call superclass constructor
        super(make,model);
        this.turboBoost = turboBoost;
    }

    // method overriding
    accelerate() {
        super.accelerate(); // call superclass method
        this.speed = this.speed * this.turboBoost;
    }
}

sportsCar = new SportsCar("Maserati", "4200", 4);
sportsCar.accelerate();
console.log(sportsCar.speed);



var ordinaryCar = Car.bogStandardCar();

class Dog {
    constructor(name) {
        this._name = name;
    }

    get name() {
        return this._name;
    }

    set name(newName){
        if (newName) {
            this._name = newName;
        }
    }
}

var doggie = new Dog("Fido");
console.log(doggie.name);