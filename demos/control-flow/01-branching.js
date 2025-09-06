// Demonstration of branching in JavaScript

// Basic if statement
const age = 20;
if (age >= 18) {
    console.log('Person is an adult');
}

// If-else statement
const temperature = 25;
if (temperature > 30) {
    console.log('It\'s hot outside!');
} else {
    console.log('Temperature is moderate');
}

// If-else if-else chain
const score = 85;
if (score >= 90) {
    console.log('Grade: A');
} else if (score >= 80) {
    console.log('Grade: B');
} else if (score >= 70) {
    console.log('Grade: C');
} else {
    console.log('Grade: F');
}

// Switch statement
const day = 'Monday';
switch (day) {
    case 'Monday':
        console.log('Start of work week');
        break;
    case 'Wednesday':
        console.log('Mid-week');
        break;
    case 'Friday':
        console.log('TGIF!');
        break;
    case 'Saturday':
    case 'Sunday':
        console.log('Weekend!');
        break;
    default:
        console.log('Regular work day');
}

// Ternary operator for simple conditions
const isRaining = true;
const activity = isRaining ? 'Stay inside' : 'Go outside';
console.log('Activity:', activity);

// Nested if statements
const hour = 14;
const isWeekend = false;

if (isWeekend) {
    if (hour < 12) {
        console.log('Weekend morning - sleep in');
    } else {
        console.log('Weekend afternoon - relax');
    }
} else {
    if (hour < 9) {
        console.log('Commute to work');
    } else if (hour < 17) {
        console.log('Working hours');
    } else {
        console.log('Head home');
    }
}

// Using logical operators for conditional branching
const hasTicket = true;
const hasId = true;

if (hasTicket && hasId) {
    console.log('Welcome to the show!');
} else if (hasTicket || hasId) {
    console.log('Additional verification needed');
} else {
    console.log('Access denied');
}
