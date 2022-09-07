export class Car {
    constructor(make,model) {
        this._make = make;
        this._model = model;
        this._speed = 0;
    }

    get make() {
        return this._make;
    }

    set make(newMake) {
        if (newMake) {
            this._make = newMake;
        }
    }

    static standardCar() {
        return new Car("Ford", "Focus");
    }


    accelerate() {
        this._speed++;
    }

}

class SportsCar extends Car {

    constructor(make,model,turboBoost) {
        super(make,model);
        this._turboBoost = turboBoost;
    }

    get turboBoost() {
        return this._turboBoost;
    }

    set turboBoost(boost) {
        this._turboBoost = boost;
    }

}
