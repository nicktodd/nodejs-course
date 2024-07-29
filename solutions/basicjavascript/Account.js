class Account {
    // this is a constructor

    static getInterestRate() {
        return 0.1;
    }

    constructor(name, balance) {
        this._name = name;
        this._balance = balance;
    }

    // getter method for the name
    get name() {
        return this._name;
    }
    // setter method for the name
    set name(newName) {
        if (newName) {
            this._name = newName;
        }
    }

    // this is a method
    addInterest() {
        (this._balance *= Account.getInterestRate()) + this._balance;
    }
}

let myAccount = new Account("Nick", 10000);
myAccount.name = "false";
console.log(myAccount.name);
console.log(Account.getInterestRate());