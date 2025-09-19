// Parameterized Constructor Decorators - ECMAScript 2022+ Syntax
// Modern decorator factories that extend constructors with configurable options

console.log("=== Parameterized Constructor Decorators Demo ===\n");

// Modern decorator factory that creates configurable feature decorators
function addFeatures(options: {
  addLogging?: boolean;
  addCaching?: boolean;
  addMetrics?: boolean;
  cacheSize?: number;
  logLevel?: 'info' | 'debug' | 'error';
  enableDebug?: boolean;
}) {
  return function(value: any, context: ClassDecoratorContext) {
    console.log(`Applying features to class ${context.name} with options:`, options);
    
    return class extends value {
      private cache: Map<string, any> = new Map();
      private callCount: number = 0;
      private createdAt: Date = new Date();
      private featureOptions = options;
      
      constructor(...args: any[]) {
        super(...args);
        
        if (options.addLogging) {
          console.log(`[${options.logLevel?.toUpperCase() || 'INFO'}] ${context.name} instance created at ${this.createdAt.toISOString()}`);
          if (options.enableDebug) {
            console.log(`[DEBUG] ${context.name} constructor args:`, args);
          }
        }
        
        if (options.addCaching) {
          console.log(`[FEATURE] Caching enabled for ${context.name} (max size: ${options.cacheSize || 10})`);
        }
        
        if (options.addMetrics) {
          console.log(`[FEATURE] Metrics tracking enabled for ${context.name}`);
        }
      }
      
      // Enhanced caching functionality
      cacheGet(key: string): any {
        if (!options.addCaching) {
          return undefined;
        }
        
        const result = this.cache.get(key);
        if (result && options.addLogging && options.enableDebug) {
          console.log(`[CACHE] Hit for key: ${key}`);
        }
        return result;
      }
      
      cacheSet(key: string, newValue: any): void {
        if (!options.addCaching) return;
        
        const maxSize = options.cacheSize || 10;
        
        // Implement LRU eviction
        if (this.cache.size >= maxSize) {
          const firstKey = this.cache.keys().next().value;
          if (firstKey) {
            this.cache.delete(firstKey);
            if (options.addLogging && options.enableDebug) {
              console.log(`[CACHE] Evicted key: ${firstKey}`);
            }
          }
        }
        
        this.cache.set(key, newValue);
        
        if (options.addLogging && options.logLevel === 'debug') {
          console.log(`[CACHE] Set key: ${key} for ${context.name}`);
        }
      }
      
      // Enhanced metrics functionality
      incrementCallCount(methodName?: string): void {
        if (options.addMetrics) {
          this.callCount++;
          if (options.addLogging && methodName) {
            console.log(`[METRICS] ${context.name}.${methodName}() called (total: ${this.callCount})`);
          }
        }
      }
      
      getMetrics(): object {
        return {
          className: context.name,
          callCount: this.callCount,
          createdAt: this.createdAt,
          cacheSize: this.cache.size,
          uptime: Date.now() - this.createdAt.getTime(),
          features: {
            logging: !!options.addLogging,
            caching: !!options.addCaching,
            metrics: !!options.addMetrics,
            debug: !!options.enableDebug
          }
        };
      }
      
      // Enhanced logging functionality
      log(message: string, level: 'info' | 'debug' | 'error' = 'info'): void {
        if (!options.addLogging) return;
        
        const shouldLog = options.logLevel === 'debug' || 
                         options.logLevel === level || 
                         level === 'error' ||
                         (options.enableDebug && level === 'debug');
        
        if (shouldLog) {
          const timestamp = new Date().toISOString();
          console.log(`[${level.toUpperCase()}] ${timestamp} ${context.name}: ${message}`);
        }
      }
    };
  };
}

// Decorator configurations with different feature sets
const basicFeatures = addFeatures({
  addLogging: true,
  logLevel: 'info'
});

const cachingFeatures = addFeatures({
  addLogging: true,
  addCaching: true,
  logLevel: 'debug',
  cacheSize: 5,
  enableDebug: true
});

const fullFeatures = addFeatures({
  addLogging: true,
  addCaching: true,
  addMetrics: true,
  logLevel: 'info',
  cacheSize: 20,
  enableDebug: false
});

// Apply modern decorators to classes
@basicFeatures
class EnhancedCalculator {
  constructor(public name: string, public precision: number = 2) {
    console.log(`EnhancedCalculator "${name}" initialized with precision ${precision}`);
  }
  
  add(a: number, b: number): number {
    (this as any).incrementCallCount?.('add');
    (this as any).log?.(`Adding ${a} + ${b} = ${a + b}`);
    return Number((a + b).toFixed(this.precision));
  }
  
  multiply(a: number, b: number): number {
    (this as any).incrementCallCount?.('multiply');
    (this as any).log?.(`Multiplying ${a} * ${b} = ${a * b}`);
    return Number((a * b).toFixed(this.precision));
  }
  
  power(base: number, exponent: number): number {
    (this as any).incrementCallCount?.('power');
    const result = Math.pow(base, exponent);
    (this as any).log?.(`Power ${base}^${exponent} = ${result}`);
    return Number(result.toFixed(this.precision));
  }
}

@cachingFeatures  
class SmartProcessor {
  constructor(public processorId: string, public maxConcurrency: number = 5) {
    console.log(`SmartProcessor "${processorId}" initialized`);
  }
  
  process(input: string, operation: string = 'uppercase'): string {
    (this as any).incrementCallCount?.('process');
    
    const cacheKey = `${operation}:${input}`;
    const cached = (this as any).cacheGet?.(cacheKey);
    
    if (cached) {
      (this as any).log?.(`Cache hit for operation ${operation} on input: ${input}`, 'debug');
      return cached;
    }
    
    // Simulate different processing operations
    let result: string;
    switch (operation) {
      case 'uppercase':
        result = input.toUpperCase();
        break;
      case 'lowercase':
        result = input.toLowerCase();
        break;
      case 'reverse':
        result = input.split('').reverse().join('');
        break;
      default:
        result = `Processed: ${input}`;
    }
    
    (this as any).cacheSet?.(cacheKey, result);
    (this as any).log?.(`Processed "${input}" using ${operation} -> "${result}"`);
    
    return result;
  }
}

@fullFeatures
class ServiceClient {
  constructor(public serviceUrl: string, public apiKey: string) {
    console.log(`ServiceClient initialized for ${serviceUrl}`);
  }
  
  async callService(endpoint: string): Promise<string> {
    (this as any).incrementCallCount?.('callService');
    
    const cacheKey = `CALL:${endpoint}`;
    const cached = (this as any).cacheGet?.(cacheKey);
    
    if (cached) {
      (this as any).log?.(`Cache hit for service call ${endpoint}`);
      return cached;
    }
    
    // Simulate service call
    (this as any).log?.(`Making service call to ${endpoint}`);
    const response = `Service response from ${this.serviceUrl}${endpoint}`;
    
    (this as any).cacheSet?.(cacheKey, response);
    return response;
  }
  
  getServiceInfo(): string {
    (this as any).incrementCallCount?.('getServiceInfo');
    return `Service: ${this.serviceUrl} (Key: ${this.apiKey.substring(0, 8)}...)`;
  }
}

// Demo and test the enhanced classes
console.log("\n--- Testing EnhancedCalculator with Basic Features ---");
const calculator = new EnhancedCalculator("Scientific", 3);
console.log("Addition:", calculator.add(5.234, 3.789));
console.log("Power:", calculator.power(2, 8));
console.log("Calculator metrics:", (calculator as any).getMetrics?.());

console.log("\n--- Testing SmartProcessor with Caching Features ---");
const processor = new SmartProcessor("PROC-001");
console.log("Process 1:", processor.process("Hello World", "uppercase"));
console.log("Process 2 (cached):", processor.process("Hello World", "uppercase"));
console.log("Process 3:", processor.process("Hello World", "reverse"));
console.log("Processor metrics:", (processor as any).getMetrics?.());

console.log("\n--- Testing ServiceClient with Full Features ---");
const serviceClient = new ServiceClient("https://api.service.com", "secret123456789");
console.log("Service info:", serviceClient.getServiceInfo());

serviceClient.callService("/data").then(response => {
  console.log("Service Response:", response);
  
  return serviceClient.callService("/data"); // Should be cached
}).then(response => {
  console.log("Cached Service Response:", response);
  console.log("Final Service metrics:", (serviceClient as any).getMetrics?.());
});

console.log("\nParameterized decorator concepts:");
console.log("- Modern factory syntax: (options) => (value, context) => ExtendedClass");
console.log("- Configurable behavior through options object");
console.log("- Multiple decorator composition with different configurations");
console.log("- Context.name provides class identity in decorators");
console.log("- Feature flags enable/disable functionality");
