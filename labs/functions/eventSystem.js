// Event System
// Implement your event system here

class EventEmitter {
    constructor() {
        this.listeners = new Map();
    }

    on(eventName, callback) {
        // Implement event listener registration
    }

    off(eventName, callback) {
        // Implement event listener removal
    }

    once(eventName, callback) {
        // Implement one-time event listener
    }

    emit(eventName, data) {
        // Implement event emission
    }
}

// Test your event system
console.log('Event System Demo');
console.log('---------------');

const emitter = new EventEmitter();

// Add your test cases here
