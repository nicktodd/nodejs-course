/**
 * TypeScript/Vitest Mocking Demo
 * Main entry point demonstrating the speaking clock functionality
 */
import { SpeakingClock } from './SpeakingClock.js';
import { Publisher } from './Publisher.js';
import { Subscriber } from './Subscriber.js';

console.log('=== TypeScript/Vitest Mocking Demo ===\n');

// Demonstrate the speaking clock
console.log('1. Speaking Clock Demo:');
SpeakingClock.getTime();

console.log('\n2. Getting current time as text:');
const timeText = SpeakingClock.getCurrentTimeAsText();
console.log(`Current time: ${timeText}`);

console.log('\n3. Publisher/Subscriber Demo:');
const publisher = new Publisher(Subscriber.receiveMessage);
publisher.publishMessage('Hello from TypeScript/Vitest!');

console.log('\n4. Message validation demo:');
console.log('Valid message:', Subscriber.validateMessage('Hello World'));
console.log('Invalid message (empty):', Subscriber.validateMessage(''));
console.log('Invalid message (whitespace):', Subscriber.validateMessage('   '));

console.log('\nDemo complete! Run tests with: npm test');