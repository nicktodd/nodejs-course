// Class Decorator - Extends Constructor with Parameters
// A parameterized decorator that extends constructor with configurable options

console.log("=== Decorator 4: Class Decorator that Extends Constructor with Parameters ===\n");

// Decorator factory that creates a decorator to add configurable features
function addFeatures(options: {
  addLogging?: boolean;
  addCaching?: boolean;
  addMetrics?: boolean;
  cacheSize?: number;
  logLevel?: 'info' | 'debug' | 'error';
}) {
  return function<T extends { new(...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
      private cache: Map<string, any> = new Map();
      private callCount: number = 0;
      private createdAt: Date = new Date();
      
      constructor(...args: any[]) {
        super(...args);
        
        if (options.addLogging) {
          console.log(`[${options.logLevel?.toUpperCase() || 'INFO'}] ${constructor.name} instance created at ${this.createdAt.toISOString()}`);
        }
        
        if (options.addCaching) {
          console.log(`Caching enabled for ${constructor.name} (max size: ${options.cacheSize || 10})`);
        }
        
        if (options.addMetrics) {
          console.log(`Metrics tracking enabled for ${constructor.name}`);
        }
      }
      
      // Caching functionality
      cacheGet(key: string): any {
        if (!options.addCaching) return undefined;
        return this.cache.get(key);
      }
      
      cacheSet(key: string, value: any): void {
        if (!options.addCaching) return;
        
        const maxSize = options.cacheSize || 10;
        
        if (this.cache.size >= maxSize) {
          const firstKey = this.cache.keys().next().value;
          if (firstKey) {
            this.cache.delete(firstKey);
          }
        }
        
        this.cache.set(key, value);
        
        if (options.addLogging && options.logLevel === 'debug') {
          console.log(`[DEBUG] Cached ${key} for ${constructor.name}`);
        }
      }
      
      // Metrics functionality  
      incrementCallCount(): void {
        if (options.addMetrics) {
          this.callCount++;
          if (options.addLogging) {
            console.log(`[${options.logLevel?.toUpperCase() || 'INFO'}] Call count for ${constructor.name}: ${this.callCount}`);
          }
        }
      }
      
      getMetrics(): object {
        return {
          callCount: this.callCount,
          createdAt: this.createdAt,
          cacheSize: this.cache.size,
          uptime: Date.now() - this.createdAt.getTime()
        };
      }
      
      // Logging functionality
      log(message: string, level: 'info' | 'debug' | 'error' = 'info'): void {
        if (options.addLogging && 
            (options.logLevel === 'debug' || 
             options.logLevel === level || 
             level === 'error')) {
          console.log(`[${level.toUpperCase()}] ${constructor.name}: ${message}`);
        }
      }
    };
  };
}

// Different decorator configurations
const basicFeatures = addFeatures({
  addLogging: true,
  logLevel: 'info'
});

const cachingFeatures = addFeatures({
  addLogging: true,
  addCaching: true,
  logLevel: 'debug',
  cacheSize: 5
});

const fullFeatures = addFeatures({
  addLogging: true,
  addCaching: true,
  addMetrics: true,
  logLevel: 'info',
  cacheSize: 20
});

// Apply decorators to classes
@basicFeatures
class Calculator {
  constructor(public name: string) {
    console.log(`Calculator "${name}" initialized`);
  }
  
  add(a: number, b: number): number {
    (this as any).incrementCallCount?.();
    (this as any).log?.(`Adding ${a} + ${b}`);
    return a + b;
  }
  
  multiply(a: number, b: number): number {
    (this as any).incrementCallCount?.();
    (this as any).log?.(`Multiplying ${a} * ${b}`);
    return a * b;
  }
}

@cachingFeatures
class DataProcessor {
  constructor(public processorId: string) {
    console.log(`DataProcessor "${processorId}" initialized`);
  }
  
  processData(input: string): string {
    (this as any).incrementCallCount?.();
    
    // Check cache first
    const cached = (this as any).cacheGet?.(input);
    if (cached) {
      (this as any).log?.(`Cache hit for input: ${input}`);
      return cached;
    }
    
    // Simulate processing
    const result = `Processed: ${input.toUpperCase()}`;
    
    // Cache the result
    (this as any).cacheSet?.(input, result);
    (this as any).log?.(`Processed and cached: ${input}`);
    
    return result;
  }
}

@fullFeatures
class APIClient {
  constructor(public baseUrl: string, public apiKey: string) {
    console.log(`APIClient initialized for ${baseUrl}`);
  }
  
  async get(endpoint: string): Promise<string> {
    (this as any).incrementCallCount?.();
    
    const cacheKey = `GET:${endpoint}`;
    const cached = (this as any).cacheGet?.(cacheKey);
    
    if (cached) {
      (this as any).log?.(`Cache hit for GET ${endpoint}`);
      return cached;
    }
    
    // Simulate API call
    (this as any).log?.(`Making GET request to ${endpoint}`);
    const response = `Response from ${this.baseUrl}${endpoint}`;
    
    (this as any).cacheSet?.(cacheKey, response);
    return response;
  }
  
  getApiInfo(): string {
    (this as any).incrementCallCount?.();
    return `API: ${this.baseUrl} (Key: ${this.apiKey.substring(0, 8)}...)`;
  }
}

// Test the enhanced classes
console.log("\n--- Testing Calculator with Basic Features ---");
const calc = new Calculator("Scientific");
console.log("Addition result:", calc.add(5, 3));
console.log("Multiplication result:", calc.multiply(4, 7));
console.log("Calculator metrics:", (calc as any).getMetrics?.());

console.log("\n--- Testing DataProcessor with Caching Features ---");
const processor = new DataProcessor("PROC-001");
console.log("First processing:", processor.processData("hello"));
console.log("Second processing (cached):", processor.processData("hello"));
console.log("Third processing (new data):", processor.processData("world"));
console.log("Processor metrics:", (processor as any).getMetrics?.());

console.log("\n--- Testing APIClient with Full Features ---");
const apiClient = new APIClient("https://api.example.com", "secret123456789");
console.log("API info:", apiClient.getApiInfo());

// Test async method
apiClient.get("/users").then(response => {
  console.log("API Response:", response);
  
  // Make same request again to test caching
  return apiClient.get("/users");
}).then(response => {
  console.log("Cached API Response:", response);
  console.log("Final API metrics:", (apiClient as any).getMetrics?.());
});

// Demonstrate feature availability
console.log("\n--- Feature Availability Check ---");
console.log("Calculator has caching:", typeof (calc as any).cacheGet === 'function');
console.log("Calculator has metrics:", typeof (calc as any).getMetrics === 'function');
console.log("Processor has caching:", typeof (processor as any).cacheGet === 'function');
console.log("Processor has metrics:", typeof (processor as any).getMetrics === 'function');
console.log("APIClient has caching:", typeof (apiClient as any).cacheGet === 'function');
console.log("APIClient has metrics:", typeof (apiClient as any).getMetrics === 'function');