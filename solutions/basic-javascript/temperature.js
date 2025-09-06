// Temperature Converter Solution

function fahrenheitToCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5/9;
}

function celsiusToFahrenheit(celsius) {
    return (celsius * 9/5) + 32;
}

// Test temperatures
const testFahrenheit1 = 32;
const testFahrenheit2 = 98.6;
const testCelsius1 = 0;
const testCelsius2 = 37;

// Format and display results
console.log('Temperature Converter');
console.log('--------------------');
console.log(`${testFahrenheit1}°F is ${fahrenheitToCelsius(testFahrenheit1).toFixed(2)}°C`);
console.log(`${testCelsius1}°C is ${celsiusToFahrenheit(testCelsius1).toFixed(2)}°F`);
console.log(`${testFahrenheit2}°F is ${fahrenheitToCelsius(testFahrenheit2).toFixed(2)}°C`);
console.log(`${testCelsius2}°C is ${celsiusToFahrenheit(testCelsius2).toFixed(2)}°F`);
