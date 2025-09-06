// Event System Solution

class EventEmitter {
    constructor() {
        this.listeners = new Map();
    }

    validateEventName(eventName) {
        if (typeof eventName !== 'string' || eventName.trim() === '') {
            throw new Error('Event name must be a non-empty string');
        }
    }

    validateCallback(callback) {
        if (typeof callback !== 'function') {
            throw new Error('Callback must be a function');
        }
    }

    on(eventName, callback) {
        this.validateEventName(eventName);
        this.validateCallback(callback);

        if (!this.listeners.has(eventName)) {
            this.listeners.set(eventName, new Set());
        }
        this.listeners.get(eventName).add(callback);

        // Return unsubscribe function
        return () => this.off(eventName, callback);
    }

    off(eventName, callback) {
        this.validateEventName(eventName);
        this.validateCallback(callback);

        if (this.listeners.has(eventName)) {
            this.listeners.get(eventName).delete(callback);
            
            // Clean up empty event sets
            if (this.listeners.get(eventName).size === 0) {
                this.listeners.delete(eventName);
            }
        }
    }

    once(eventName, callback) {
        this.validateEventName(eventName);
        this.validateCallback(callback);

        const onceCallback = (...args) => {
            this.off(eventName, onceCallback);
            callback.apply(this, args);
        };

        return this.on(eventName, onceCallback);
    }

    emit(eventName, data) {
        this.validateEventName(eventName);

        if (this.listeners.has(eventName)) {
            this.listeners.get(eventName).forEach(callback => {
                try {
                    callback(data);
                } catch (error) {
                    console.error(`Error in event listener for ${eventName}:`, error);
                }
            });
        }
    }

    listenerCount(eventName) {
        this.validateEventName(eventName);
        return this.listeners.has(eventName) ? this.listeners.get(eventName).size : 0;
    }

    eventNames() {
        return Array.from(this.listeners.keys());
    }
}

// Test the event system
console.log('Event System Demo');
console.log('---------------');

const emitter = new EventEmitter();

// Test multiple listeners
console.log('\nTesting multiple listeners:');
const listener1 = data => console.log('Listener 1 received:', data);
const listener2 = data => console.log('Listener 2 received:', data);

console.log('Adding listeners...');
emitter.on('userLogin', listener1);
emitter.on('userLogin', listener2);

emitter.emit('userLogin', { user: 'John' });

// Test listener removal
console.log('\nTesting listener removal:');
console.log('Removing listener 1...');
emitter.off('userLogin', listener1);

emitter.emit('userLogin', { user: 'Jane' });

// Test once listener
console.log('\nTesting once listener:');
emitter.once('oneTime', data => console.log('One-time event received:', data));

emitter.emit('oneTime', { message: 'Hello' });
console.log('Emitting one-time event again (should not trigger):');
emitter.emit('oneTime', { message: 'Hello Again' });

// Test error handling
console.log('\nTesting error handling:');
try {
    emitter.on('', () => {});
} catch (error) {
    console.log('Error caught:', error.message);
}

try {
    emitter.on('event', 'not a function');
} catch (error) {
    console.log('Error caught:', error.message);
}

// Test event statistics
console.log('\nEvent Statistics:');
console.log('Active events:', emitter.eventNames());
console.log('Listeners for userLogin:', emitter.listenerCount('userLogin'));
