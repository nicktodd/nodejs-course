// Type-Safe Event System

// Define event types
interface EventMap {
    'user:login': { userId: string; timestamp: Date };
    'user:logout': { userId: string; timestamp: Date };
    'data:update': { id: string; newValue: any; oldValue: any };
    'system:error': { code: number; message: string };
}

// Event handler type
type EventHandler<T> = (data: T) => void | Promise<void>;

// Type guard for checking if a string is a valid event name
function isValidEventName(eventName: string): eventName is keyof EventMap {
    return Object.prototype.hasOwnProperty.call(events, eventName);
}

// EventEmitter class with strong typing
class TypedEventEmitter {
    private handlers: Map<keyof EventMap, EventHandler<any>[]> = new Map();

    // Register an event handler
    on<E extends keyof EventMap>(event: E, handler: EventHandler<EventMap[E]>): void {
        if (!this.handlers.has(event)) {
            this.handlers.set(event, []);
        }
        this.handlers.get(event)!.push(handler);
    }

    // Remove an event handler
    off<E extends keyof EventMap>(event: E, handler: EventHandler<EventMap[E]>): void {
        if (!this.handlers.has(event)) return;
        
        const handlers = this.handlers.get(event)!;
        const index = handlers.indexOf(handler);
        if (index !== -1) {
            handlers.splice(index, 1);
        }
    }

    // Emit an event
    async emit<E extends keyof EventMap>(event: E, data: EventMap[E]): Promise<void> {
        if (!this.handlers.has(event)) return;

        const handlers = this.handlers.get(event)!;
        for (const handler of handlers) {
            try {
                await Promise.resolve(handler(data));
            } catch (error) {
                console.error(`Error in event handler for ${String(event)}:`, error);
            }
        }
    }

    // One-time event handler
    once<E extends keyof EventMap>(event: E, handler: EventHandler<EventMap[E]>): void {
        const onceHandler: EventHandler<EventMap[E]> = async (data) => {
            try {
                await Promise.resolve(handler(data));
                this.off(event, onceHandler);
            } catch (error) {
                console.error(`Error in one-time event handler for ${String(event)}:`, error);
            }
        };
        this.on(event, onceHandler);
    }
}

// Demo implementation
async function eventSystemDemo() {
    const emitter = new TypedEventEmitter();

    // Set up handlers
    emitter.on('user:login', async ({ userId, timestamp }) => {
        console.log(`User ${userId} logged in at ${timestamp}`);
    });

    emitter.once('system:error', ({ code, message }) => {
        console.error(`System error ${code}: ${message}`);
    });

    emitter.on('data:update', async ({ id, newValue, oldValue }) => {
        console.log(`Data ${id} updated from ${oldValue} to ${newValue}`);
    });

    // Emit some events
    await emitter.emit('user:login', {
        userId: 'user123',
        timestamp: new Date()
    });

    await emitter.emit('data:update', {
        id: 'doc1',
        newValue: { status: 'active' },
        oldValue: { status: 'draft' }
    });

    await emitter.emit('system:error', {
        code: 500,
        message: 'Internal server error'
    });

    // This error event won't trigger the handler again since it was registered with once()
    await emitter.emit('system:error', {
        code: 404,
        message: 'Not found'
    });
}

eventSystemDemo().catch(console.error);
