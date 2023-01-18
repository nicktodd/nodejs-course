let make = "Peugeot";
let model = "505";
let speed = 50
let gear = 0;

console.log(`The make is ${make} and the model is ${model}.`);

if (speed < 10) {
    gear = 1;
}
else if (speed < 20) {
    gear = 2;
}
else if (speed < 30) {
    gear = 3;
}
else if (speed < 40) {
    gear = 4;
}
else if (speed >= 40) {
    gear = 5;
}
else if (speed <0) {
    gear = -1;
}

let numberOfYears = 0;
for (let year = 1900; year < 2000; year++) {
    if (year % 4 == 0) {
        console.log(year + " is a leap year");
        numberOfYears++;
    }
    if (numberOfYears == 5) {
        break;
    }
}


