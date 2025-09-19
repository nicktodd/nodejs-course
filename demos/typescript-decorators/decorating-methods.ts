// Method Decorators - ECMAScript 2022+ Syntax
// Decorators that enhance or modify method behavior at runtime
// These use the new standardized decorator proposal, not the legacy experimental decorators

console.log("=== Method Decorators Demo ===\n");

/**
 * Simple Method Decorator - Logs method calls with timing
 * 
 * In ECMAScript decorators:
 * - 'value' is the original method function
 * - 'context' contains metadata like method name, class info, etc.
 * - Return a new function that replaces the original method
 */
function logMethodCalls(value: any, context: ClassMethodDecoratorContext) {
  return function (this: any, ...args: any[]) {
    console.log(`[LOG] Calling method ${context.name as string} with arguments:`, args);
    const startTime = Date.now();
    
    // Call the original method with proper 'this' context
    const result = value.apply(this, args);
    
    const endTime = Date.now();
    console.log(`[LOG] Method ${context.name as string} completed in ${endTime - startTime}ms, result:`, result);
    
    return result;
  };
}

/**
 * Parameterized Decorator Factory - Creates customizable monitoring decorators
 * 
 * This is a decorator factory pattern:
 * 1. The outer function takes configuration options
 * 2. Returns the actual decorator function
 * 3. The decorator function receives value and context
 * 4. Returns the replacement method
 */
function monitor(options: { logArgs?: boolean; logResult?: boolean; logTime?: boolean } = {}) {
  return function (value: any, context: ClassMethodDecoratorContext) {
    return function (this: any, ...args: any[]) {
      if (options.logArgs) {
        console.log(`[MONITOR] ${context.name as string} called with:`, args);
      }
      
      const startTime = options.logTime ? Date.now() : 0;
      const result = value.apply(this, args);
      
      if (options.logTime) {
        const duration = Date.now() - startTime;
        console.log(`[MONITOR] ${context.name as string} executed in ${duration}ms`);
      }
      
      if (options.logResult) {
        console.log(`[MONITOR] ${context.name as string} returned:`, result);
      }
      
      return result;
    };
  };
}

/**
 * Caching Decorator - Memoizes method results with TTL (Time To Live)
 * 
 * Features:
 * - Creates a Map to store cached results per method
 * - Uses method name + serialized arguments as cache key
 * - Respects TTL (time-to-live) for cache expiration
 * - Logs cache hits and misses for debugging
 */
function cache(ttlSeconds: number = 60) {
  const methodCache = new Map<string, { value: any; expiry: number }>();
  
  return function (value: any, context: ClassMethodDecoratorContext) {
    return function (this: any, ...args: any[]) {
      const cacheKey = `${context.name as string}_${JSON.stringify(args)}`;
      const now = Date.now();
      
      // Check if cached result exists and is not expired
      const cached = methodCache.get(cacheKey);
      if (cached && now < cached.expiry) {
        console.log(`[CACHE] Cache hit for ${context.name as string}`);
        return cached.value;
      }
      
      // Execute original method and cache result
      console.log(`[CACHE] Cache miss for ${context.name as string}, executing method`);
      const result = value.apply(this, args);
      
      methodCache.set(cacheKey, {
        value: result,
        expiry: now + (ttlSeconds * 1000)
      });
      
      return result;
    };
  };
}

/**
 * Retry Decorator - Automatically retries failed method calls
 * 
 * Features:
 * - Configurable number of retry attempts
 * - Configurable delay between retries
 * - Works with both sync and async methods
 * - Logs each attempt and final success/failure
 */
function retry(maxAttempts: number = 3, delayMs: number = 1000) {
  return function (value: any, context: ClassMethodDecoratorContext) {
    return async function (this: any, ...args: any[]) {
      let lastError: Error = new Error('No attempts made');
      
      for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
          console.log(`[RETRY] Attempt ${attempt}/${maxAttempts} for ${context.name as string}`);
          
          // Call original method (await handles both sync and async)
          const result = await value.apply(this, args);
          
          if (attempt > 1) {
            console.log(`[RETRY] ${context.name as string} succeeded on attempt ${attempt}`);
          }
          
          return result;
        } catch (error) {
          lastError = error as Error;
          console.log(`[RETRY] Attempt ${attempt} failed for ${context.name as string}:`, lastError.message);
          
          // Wait before retry (except on last attempt)
          if (attempt < maxAttempts) {
            console.log(`[RETRY] Waiting ${delayMs}ms before retry...`);
            await new Promise(resolve => setTimeout(resolve, delayMs));
          }
        }
      }
      
      console.log(`[RETRY] All ${maxAttempts} attempts failed for ${context.name as string}`);
      throw lastError;
    };
  };
}

/**
 * Validation Decorator - Validates method arguments before execution
 * 
 * Features:
 * - Custom validation function
 * - Custom error messages
 * - Prevents method execution if validation fails
 * - Useful for input sanitization and business rule enforcement
 */
function validate(validator: (args: any[]) => boolean, errorMessage: string = 'Invalid arguments') {
  return function (value: any, context: ClassMethodDecoratorContext) {
    return function (this: any, ...args: any[]) {
      if (!validator(args)) {
        console.log(`[VALIDATE] Validation failed for ${context.name as string}: ${errorMessage}`);
        throw new Error(`Validation failed for ${context.name as string}: ${errorMessage}`);
      }
      
      console.log(`[VALIDATE] Validation passed for ${context.name as string}`);
      return value.apply(this, args);
    };
  };
}

// =====================================================
// DEMO CLASSES - Show decorators in action
// =====================================================

/**
 * MathService - Demonstrates various method decorators
 * 
 * Each method shows different decorator patterns:
 * - Simple decorators (@logMethodCalls)
 * - Parameterized decorators (@monitor with options)
 * - Caching for expensive operations (@cache)
 * - Input validation (@validate with custom rules)
 */
class MathService {
  
  /**
   * Simple addition with method call logging
   * @logMethodCalls - logs every call with arguments, timing, and results
   */
  @logMethodCalls
  add(a: number, b: number): number {
    return a + b;
  }

  /**
   * Multiplication with comprehensive monitoring
   * @monitor - logs arguments, results, and execution time
   * Simulates processing delay to show timing features
   */
  @monitor({ logArgs: true, logResult: true, logTime: true })
  multiply(a: number, b: number): number {
    // Simulate some processing time to show monitoring
    const start = Date.now();
    while (Date.now() - start < 100) {
      // Busy wait for 100ms
    }
    return a * b;
  }

  /**
   * Expensive calculation with caching (5 second TTL)
   * @cache - memoizes results to avoid repeated expensive computations
   * Try calling with same argument twice to see cache in action
   */
  @cache(5)
  expensiveCalculation(n: number): number {
    console.log(`[CALC] Performing expensive calculation for ${n}`);
    
    // Simulate expensive operation with lots of calculations
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
      result += Math.sqrt(n);
    }
    return Math.round(result);
  }

  /**
   * Division with input validation
   * @validate - ensures proper arguments and prevents division by zero
   * Custom validation function checks argument types and divisor != 0
   */
  @validate(
    (args: any[]) => args.length === 2 && typeof args[0] === 'number' && typeof args[1] === 'number' && args[1] !== 0,
    'Division requires two numbers and divisor cannot be zero'
  )
  divide(a: number, b: number): number {
    return a / b;
  }
}

/**
 * NetworkService - Demonstrates async decorators and decorator stacking
 * 
 * Shows how decorators work with:
 * - Async methods
 * - Multiple decorators on same method (decorator stacking)
 * - Error handling and retry logic
 */
class NetworkService {
  private failureCount = 0;

  /**
   * Simulated network call with retry logic
   * @retry - automatically retries failed calls up to 3 times with 500ms delay
   * Simulates network failures for first few attempts
   */
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

  /**
   * API response processing with multiple decorators (decorator stacking)
   * @cache - caches processed responses for 10 seconds
   * @monitor - logs arguments and results for debugging
   * 
   * Note: Decorators are applied in reverse order (bottom to top):
   * 1. @monitor wraps the original method
   * 2. @cache wraps the monitored method
   */
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

// =====================================================
// DEMO EXECUTION - Test all decorator functionality
// =====================================================

console.log("\n--- Testing Method Decorators ---");

const mathService = new MathService();
const networkService = new NetworkService();

console.log("\n1. Testing @logMethodCalls (simple decorator):");
console.log("   - Logs method calls with timing information");
mathService.add(5, 3);

console.log("\n2. Testing @monitor (parameterized decorator):");
console.log("   - Configurable logging of args, results, and timing");
mathService.multiply(4, 7);

console.log("\n3. Testing @cache (caching decorator):");
console.log("   - First call executes and caches result");
mathService.expensiveCalculation(10);
console.log("   - Second call returns cached result (faster)");
mathService.expensiveCalculation(10);

console.log("\n4. Testing @validate with valid input:");
console.log("   - Validation passes, method executes normally");
try {
  const divisionResult = mathService.divide(10, 2);
  console.log("   Division result:", divisionResult);
} catch (error: any) {
  console.error("   Division error:", error.message);
}

console.log("\n5. Testing @validate with invalid input (division by zero):");
console.log("   - Validation fails, method throws error before execution");
try {
  mathService.divide(10, 0);
} catch (error: any) {
  console.error("   Expected validation error:", error.message);
}

console.log("\n6. Testing @retry (async decorator with error handling):");
console.log("   - Automatically retries failed network calls");
networkService.fetchData("https://api.example.com/data")
  .then((result: any) => {
    console.log("   Network fetch result:", result);
  })
  .catch((error: any) => {
    console.error("   Network fetch failed:", error.message);
  });

console.log("\n7. Testing decorator stacking (@cache + @monitor):");
console.log("   - Multiple decorators applied to same method");
console.log("   - Decorators execute in reverse order (bottom to top)");
setTimeout(() => {
  console.log("\n   First call (cache miss):");
  const response = networkService.processApiResponse("hello world");
  console.log("   API response:", response);
  
  console.log("\n   Second call (cache hit):");
  const cachedResponse = networkService.processApiResponse("hello world");
  console.log("   Cached API response:", cachedResponse);
}, 2000);

// =====================================================
// DECORATOR CONCEPTS SUMMARY
// =====================================================

console.log(`
========================================
DECORATOR CONCEPTS SUMMARY:
========================================

1. BASIC DECORATOR SYNTAX:
   @decoratorName
   methodName() { ... }

2. PARAMETERIZED DECORATORS:
   @decoratorName(param1, param2)
   methodName() { ... }

3. DECORATOR STACKING:
   @decorator1
   @decorator2
   methodName() { ... }
   // Applied bottom-to-top: decorator2(decorator1(method))

4. DECORATOR FUNCTION SIGNATURE:
   function myDecorator(value, context) {
     // value = original method
     // context = metadata (name, kind, etc.)
     return function(...args) {
       // replacement method
       return value.apply(this, args);
     };
   }

5. COMMON USE CASES:
   - Logging and monitoring
   - Caching and memoization
   - Input validation
   - Error handling and retries
   - Authentication and authorization
   - Performance profiling
   - Dependency injection

6. BEST PRACTICES:
   - Keep decorators focused on single responsibility
   - Use TypeScript for better type safety
   - Document decorator behavior clearly
   - Test decorated methods thoroughly
   - Consider performance impact of decorator overhead
`);