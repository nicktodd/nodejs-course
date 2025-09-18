// Method Decorator
// Decorators that enhance or modify method behavior

console.log("=== Decorator 6: Method Decorator ===\n");

// Simple method decorator that logs method calls
function logMethodCalls(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  
  descriptor.value = function(...args: any[]) {
    console.log(`[LOG] Calling method ${propertyKey} with arguments:`, args);
    const startTime = Date.now();
    
    const result = originalMethod.apply(this, args);
    
    const endTime = Date.now();
    console.log(`[LOG] Method ${propertyKey} completed in ${endTime - startTime}ms, result:`, result);
    
    return result;
  };
  
  return descriptor;
}

// Parameterized method decorator for performance monitoring
function monitor(options: { logArgs?: boolean; logResult?: boolean; logTime?: boolean } = {}) {
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    
    descriptor.value = function(...args: any[]) {
      if (options.logArgs) {
        console.log(`[MONITOR] ${propertyKey} called with:`, args);
      }
      
      const startTime = options.logTime ? Date.now() : 0;
      const result = originalMethod.apply(this, args);
      
      if (options.logTime) {
        const duration = Date.now() - startTime;
        console.log(`[MONITOR] ${propertyKey} executed in ${duration}ms`);
      }
      
      if (options.logResult) {
        console.log(`[MONITOR] ${propertyKey} returned:`, result);
      }
      
      return result;
    };
    
    return descriptor;
  };
}

// Caching method decorator
function cache(ttlSeconds: number = 60) {
  const methodCache = new Map<string, { value: any; expiry: number }>();
  
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    
    descriptor.value = function(...args: any[]) {
      const cacheKey = `${propertyKey}_${JSON.stringify(args)}`;
      const now = Date.now();
      
      // Check if cached result exists and is not expired
      const cached = methodCache.get(cacheKey);
      if (cached && now < cached.expiry) {
        console.log(`[CACHE] Cache hit for ${propertyKey}`);
        return cached.value;
      }
      
      // Execute original method
      console.log(`[CACHE] Cache miss for ${propertyKey}, executing method`);
      const result = originalMethod.apply(this, args);
      
      // Cache the result
      methodCache.set(cacheKey, {
        value: result,
        expiry: now + (ttlSeconds * 1000)
      });
      
      return result;
    };
    
    return descriptor;
  };
}

// Retry decorator for handling failures
function retry(maxAttempts: number = 3, delayMs: number = 1000) {
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    
    descriptor.value = async function(...args: any[]) {
      let lastError: Error = new Error('No attempts made');
      
      for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
          console.log(`[RETRY] Attempt ${attempt}/${maxAttempts} for ${propertyKey}`);
          const result = await originalMethod.apply(this, args);
          
          if (attempt > 1) {
            console.log(`[RETRY] ${propertyKey} succeeded on attempt ${attempt}`);
          }
          
          return result;
        } catch (error) {
          lastError = error as Error;
          console.log(`[RETRY] Attempt ${attempt} failed for ${propertyKey}:`, lastError.message);
          
          if (attempt < maxAttempts) {
            console.log(`[RETRY] Waiting ${delayMs}ms before retry...`);
            await new Promise(resolve => setTimeout(resolve, delayMs));
          }
        }
      }
      
      console.log(`[RETRY] All ${maxAttempts} attempts failed for ${propertyKey}`);
      throw lastError;
    };
    
    return descriptor;
  };
}

// Validation decorator
function validate(validator: (args: any[]) => boolean, errorMessage: string = 'Invalid arguments') {
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    
    descriptor.value = function(...args: any[]) {
      if (!validator(args)) {
        console.log(`[VALIDATE] Validation failed for ${propertyKey}: ${errorMessage}`);
        throw new Error(`Validation failed for ${propertyKey}: ${errorMessage}`);
      }
      
      console.log(`[VALIDATE] Validation passed for ${propertyKey}`);
      return originalMethod.apply(this, args);
    };
    
    return descriptor;
  };
}

// Test classes with method decorators
class MathService {
  @logMethodCalls
  add(a: number, b: number): number {
    return a + b;
  }
  
  @monitor({ logArgs: true, logResult: true, logTime: true })
  multiply(a: number, b: number): number {
    // Simulate some processing time
    const start = Date.now();
    while (Date.now() - start < 100) {
      // Busy wait for 100ms
    }
    return a * b;
  }
  
  @cache(5) // Cache for 5 seconds
  expensiveCalculation(n: number): number {
    console.log(`[CALC] Performing expensive calculation for ${n}`);
    // Simulate expensive operation
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
      result += Math.sqrt(n);
    }
    return Math.round(result);
  }
  
  @validate(
    (args) => args.length === 2 && typeof args[0] === 'number' && typeof args[1] === 'number' && args[1] !== 0,
    'Division requires two numbers and divisor cannot be zero'
  )
  divide(a: number, b: number): number {
    return a / b;
  }
}

class NetworkService {
  private failureCount = 0;
  
  @retry(3, 500)
  async fetchData(url: string): Promise<string> {
    // Simulate network failure for first few attempts
    this.failureCount++;
    
    if (this.failureCount < 3) {
      throw new Error(`Network timeout (attempt ${this.failureCount})`);
    }
    
    // Success on third attempt
    return `Data from ${url}`;
  }
  
  @cache(10)
  @monitor({ logArgs: true, logResult: true })
  processApiResponse(data: string): object {
    console.log(`[API] Processing response: ${data}`);
    return {
      processed: true,
      data: data.toUpperCase(),
      timestamp: new Date().toISOString()
    };
  }
}

// Test the decorated methods
console.log("\n--- Testing Method Decorators ---");

const mathService = new MathService();
const networkService = new NetworkService();

console.log("\n1. Testing @logMethodCalls:");
mathService.add(5, 3);

console.log("\n2. Testing @monitor:");
mathService.multiply(4, 7);

console.log("\n3. Testing @cache:");
mathService.expensiveCalculation(10);
mathService.expensiveCalculation(10); // Should be cached

console.log("\n4. Testing @validate (valid input):");
try {
  const divisionResult = mathService.divide(10, 2);
  console.log("Division result:", divisionResult);
} catch (error) {
  console.error("Division error:", (error as Error).message);
}

console.log("\n5. Testing @validate (invalid input):");
try {
  mathService.divide(10, 0);
} catch (error) {
  console.error("Expected validation error:", (error as Error).message);
}

console.log("\n6. Testing @retry:");
networkService.fetchData("https://api.example.com/data")
  .then(result => {
    console.log("Network fetch result:", result);
  })
  .catch(error => {
    console.error("Network fetch failed:", error.message);
  });

console.log("\n7. Testing multiple decorators:");
setTimeout(() => {
  const response = networkService.processApiResponse("hello world");
  console.log("API response:", response);
  
  // Test caching
  const cachedResponse = networkService.processApiResponse("hello world");
  console.log("Cached API response:", cachedResponse);
}, 2000);