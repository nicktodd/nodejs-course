// Generic Utilities Demonstration

console.log("=== Generic Utilities Demo ===\n");

// 1. Generic Factory Function
function createInstance<T>(constructor: new (...args: any[]) => T, ...args: any[]): T {
  return new constructor(...args);
}

class Person {
  constructor(public name: string, public age: number) {}
  toString() {
    return `${this.name} (${this.age})`;
  }
}

class Product {
  constructor(public name: string, public price: number) {}
  toString() {
    return `${this.name} - $${this.price}`;
  }
}

const personInstance = createInstance(Person, "Alice", 30);
const productInstance = createInstance(Product, "Laptop", 999);

console.log("Generic Factory:");
console.log(`Person: ${personInstance}`);
console.log(`Product: ${productInstance}\n`);

// 2. Generic Merge Function
function merge<T, U>(obj1: T, obj2: U): T & U {
  return Object.assign({}, obj1, obj2);
}

const basic = { name: "John", age: 25 };
const contact = { email: "john@example.com", phone: "123-456-7890" };

const merged = merge(basic, contact);
console.log("Generic Merge:");
console.log("Merged object:", merged);
console.log("");

// 3. Generic Filter with Type Guards
function isOfType<T>(value: any, typeName: string): value is T {
  return typeof value === typeName;
}

function filterByType<T>(array: any[], typeName: string): T[] {
  return array.filter((item): item is T => isOfType<T>(item, typeName));
}

const mixedArray = [1, "hello", 2, "world", 3, true, "typescript"];
const stringValues = filterByType<string>(mixedArray, "string");
const numberValues = filterByType<number>(mixedArray, "number");

console.log("Generic Type Filtering:");
console.log("Strings:", stringValues);
console.log("Numbers:", numberValues);
console.log("");

// 4. Generic Event Emitter
interface EventMap {
  [key: string]: any[];
}

class EventEmitter<T extends EventMap> {
  private listeners: { [K in keyof T]?: Array<(...args: T[K]) => void> } = {};

  on<K extends keyof T>(event: K, listener: (...args: T[K]) => void): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event]!.push(listener);
  }

  emit<K extends keyof T>(event: K, ...args: T[K]): void {
    const eventListeners = this.listeners[event];
    if (eventListeners) {
      eventListeners.forEach(listener => listener(...args));
    }
  }

  off<K extends keyof T>(event: K, listener: (...args: T[K]) => void): void {
    const eventListeners = this.listeners[event];
    if (eventListeners) {
      const index = eventListeners.indexOf(listener);
      if (index > -1) {
        eventListeners.splice(index, 1);
      }
    }
  }
}

// Define event types
interface AppEvents {
  userLogin: [string, Date];
  userLogout: [string];
  dataUpdate: [{ id: number; data: any }];
}

const appEmitter = new EventEmitter<AppEvents>();

// Type-safe event handlers
appEmitter.on('userLogin', (username, loginTime) => {
  console.log(`User ${username} logged in at ${loginTime}`);
});

appEmitter.on('userLogout', (username) => {
  console.log(`User ${username} logged out`);
});

console.log("Generic Event Emitter:");
appEmitter.emit('userLogin', 'alice', new Date());
appEmitter.emit('userLogout', 'alice');
console.log("");

// 5. Generic Cache with TTL
class Cache<T> {
  private storage = new Map<string, { value: T; expiry: number }>();

  set(key: string, value: T, ttlSeconds: number = 300): void {
    const expiry = Date.now() + (ttlSeconds * 1000);
    this.storage.set(key, { value, expiry });
  }

  get(key: string): T | null {
    const item = this.storage.get(key);
    if (!item) {
      return null;
    }

    if (Date.now() > item.expiry) {
      this.storage.delete(key);
      return null;
    }

    return item.value;
  }

  has(key: string): boolean {
    return this.get(key) !== null;
  }

  clear(): void {
    this.storage.clear();
  }

  size(): number {
    // Clean expired items first
    const now = Date.now();
    for (const [key, item] of this.storage.entries()) {
      if (now > item.expiry) {
        this.storage.delete(key);
      }
    }
    return this.storage.size;
  }
}

const stringCache = new Cache<string>();
const numberCache = new Cache<number>();

stringCache.set("greeting", "Hello World", 5); // 5 seconds TTL
numberCache.set("answer", 42, 10); // 10 seconds TTL

console.log("Generic Cache:");
console.log(`Cached greeting: ${stringCache.get("greeting")}`);
console.log(`Cached answer: ${numberCache.get("answer")}`);
console.log(`Cache sizes - strings: ${stringCache.size()}, numbers: ${numberCache.size()}\n`);

// 6. Generic Result Type for Error Handling
type Result<T, E = Error> = 
  | { success: true; data: T }
  | { success: false; error: E };

function divide(a: number, b: number): Result<number, string> {
  if (b === 0) {
    return { success: false, error: "Division by zero" };
  }
  return { success: true, data: a / b };
}

function processResult<T>(result: Result<T>): void {
  if (result.success) {
    console.log(`Success: ${result.data}`);
  } else {
    console.log(`Error: ${result.error}`);
  }
}

console.log("Generic Result Type:");
processResult(divide(10, 2));
processResult(divide(10, 0));