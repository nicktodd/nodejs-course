// Wrapped Constructor Decorators - ECMAScript 2022+ Syntax
// Modern decorators that completely wrap constructors with middleware-like functionality

console.log("=== Wrapped Constructor Decorators Demo ===\n");

// Modern decorator factory that wraps constructor with various middleware-like functionality
function wrapConstructor(options: {
  validateInputs?: boolean;
  trackInstances?: boolean;
  addSingletonBehavior?: boolean;
  interceptConstruction?: boolean;
  logConstructorArgs?: boolean;
  enableProfiling?: boolean;
}) {
  const instances = new Map<string, any>();
  let instanceCount = 0;
  
  return function(value: any, context: ClassDecoratorContext) {
    console.log(`Applying constructor wrapper to ${context.name} with options:`, options);
    
    const WrappedConstructor = class extends value {
      constructor(...args: any[]) {
        const startTime = options.enableProfiling ? performance.now() : 0;
        
        // Pre-construction validation and logging
        if (options.logConstructorArgs) {
          console.log(`[WRAP] Constructing ${context.name} with args:`, args);
        }
        
        if (options.validateInputs) {
          validateConstructorArgs(args, String(context.name));
        }
        
        if (options.interceptConstruction) {
          console.log(`[INTERCEPT] About to create ${context.name} instance #${instanceCount + 1}`);
        }
        
        // Singleton behavior check
        if (options.addSingletonBehavior) {
          const singletonKey = `${String(context.name)}_singleton`;
          const existingInstance = instances.get(singletonKey);
          
          if (existingInstance) {
            console.log(`[SINGLETON] Returning existing ${context.name} instance`);
            return existingInstance;
          }
        }
        
        // Call original constructor
        super(...args);
        
        // Post-construction processing
        instanceCount++;
        
        if (options.trackInstances) {
          const trackingKey = `${String(context.name)}_${instanceCount}`;
          instances.set(trackingKey, this);
          console.log(`[TRACK] Created ${context.name} instance #${instanceCount}`);
        }
        
        if (options.addSingletonBehavior) {
          const singletonKey = `${String(context.name)}_singleton`;
          instances.set(singletonKey, this);
        }
        
        // Add instance metadata
        (this as any).__instanceId = instanceCount;
        (this as any).__constructorArgs = [...args];
        (this as any).__createdAt = new Date();
        (this as any).__className = context.name;
        
        if (options.enableProfiling) {
          const endTime = performance.now();
          (this as any).__constructionTime = endTime - startTime;
          console.log(`[PROFILE] ${context.name} construction took ${(endTime - startTime).toFixed(2)}ms`);
        }
        
        if (options.interceptConstruction) {
          console.log(`[INTERCEPT] Successfully created ${context.name} instance #${instanceCount}`);
        }
      }
      
      // Add instance methods for metadata access
      getInstanceMetadata(): object {
        return {
          instanceId: (this as any).__instanceId,
          className: (this as any).__className,
          constructorArgs: (this as any).__constructorArgs,
          createdAt: (this as any).__createdAt,
          constructionTime: (this as any).__constructionTime,
          age: Date.now() - (this as any).__createdAt?.getTime()
        };
      }
    };
    
    // Copy static properties and methods from original constructor
    Object.setPrototypeOf(WrappedConstructor, value);
    Object.defineProperty(WrappedConstructor, 'name', { value: String(context.name) });
    
    // Add static management methods to the wrapped constructor
    (WrappedConstructor as any).getInstanceCount = () => {
      console.log(`[STATIC] Current instance count for ${context.name}: ${instanceCount}`);
      return instanceCount;
    };
    
    (WrappedConstructor as any).getAllInstances = () => {
      const allInstances = Array.from(instances.values()).filter(
        (instance: any) => instance.__className === context.name
      );
      console.log(`[STATIC] Retrieved ${allInstances.length} instances of ${context.name}`);
      return allInstances;
    };
    
    (WrappedConstructor as any).getInstanceById = (id: number) => {
      const instance = Array.from(instances.values()).find(
        (inst: any) => inst.__instanceId === id && inst.__className === context.name
      );
      console.log(`[STATIC] ${instance ? 'Found' : 'Not found'} instance #${id} of ${context.name}`);
      return instance;
    };
    
    (WrappedConstructor as any).clearInstances = () => {
      const className = String(context.name);
      let clearedCount = 0;
      
      for (const [key, instance] of instances.entries()) {
        if ((instance as any).__className === className) {
          instances.delete(key);
          clearedCount++;
        }
      }
      
      console.log(`[STATIC] Cleared ${clearedCount} instances of ${context.name}`);
      return clearedCount;
    };
    
    return WrappedConstructor;
  };
  
  // Enhanced validation helper function
  function validateConstructorArgs(args: any[], className: string): void {
    console.log(`[VALIDATE] Validating ${args.length} arguments for ${className}`);
    
    if (args.length === 0) {
      console.log(`[VALIDATE] No arguments to validate for ${className}`);
      return;
    }
    
    for (let i = 0; i < args.length; i++) {
      const arg = args[i];
      
      // Check for null/undefined
      if (arg === null || arg === undefined) {
        throw new Error(`[VALIDATE] Argument ${i} for ${className} cannot be null or undefined`);
      }
      
      // Check for empty strings
      if (typeof arg === 'string' && arg.trim() === '') {
        throw new Error(`[VALIDATE] String argument ${i} for ${className} cannot be empty`);
      }
      
      // Check for invalid numbers
      if (typeof arg === 'number' && (isNaN(arg) || !isFinite(arg))) {
        throw new Error(`[VALIDATE] Numeric argument ${i} for ${className} must be a valid finite number`);
      }
      
      // Check for negative numbers where inappropriate (like ports)
      if (typeof arg === 'number' && i === 1 && arg < 0) { // Assuming second arg might be a port
        throw new Error(`[VALIDATE] Port argument ${i} for ${className} cannot be negative`);
      }
    }
    
    console.log(`[VALIDATE] All ${args.length} arguments for ${className} are valid`);
  }
}

// Different wrapper configurations for various use cases
const basicWrapper = wrapConstructor({
  logConstructorArgs: true,
  trackInstances: true,
  enableProfiling: true
});

const validatingWrapper = wrapConstructor({
  validateInputs: true,
  logConstructorArgs: true,
  trackInstances: true,
  interceptConstruction: true,
  enableProfiling: true
});

const singletonWrapper = wrapConstructor({
  addSingletonBehavior: true,
  logConstructorArgs: true,
  trackInstances: true,
  interceptConstruction: true
});

const comprehensiveWrapper = wrapConstructor({
  validateInputs: true,
  trackInstances: true,
  addSingletonBehavior: false,
  interceptConstruction: true,
  logConstructorArgs: true,
  enableProfiling: true
});

// Apply modern wrappers to classes
@basicWrapper
class ApplicationLogger {
  private logHistory: string[] = [];
  
  constructor(public name: string, public level: string, public outputFormat: string = 'text') {
    console.log(`ApplicationLogger "${name}" created with level "${level}" and format "${outputFormat}"`);
  }
  
  log(message: string): void {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] [${this.level}] ${this.name}: ${message}`;
    this.logHistory.push(logEntry);
    console.log(logEntry);
  }
  
  getLogHistory(): string[] {
    return [...this.logHistory];
  }
  
  getLoggerInfo(): string {
    return `ApplicationLogger: ${this.name} (${this.level}) - ${this.logHistory.length} entries`;
  }
}

@validatingWrapper
class DatabaseManager {
  private connectionPool: string[] = [];
  
  constructor(public host: string, public port: number, public database: string, public maxConnections: number = 10) {
    console.log(`DatabaseManager established for ${host}:${port}/${database} (max: ${maxConnections})`);
    
    // Initialize connection pool
    for (let i = 0; i < maxConnections; i++) {
      this.connectionPool.push(`conn_${i}_${Date.now()}`);
    }
  }
  
  connect(): string {
    const connection = this.connectionPool.pop();
    if (!connection) {
      throw new Error('No available connections in pool');
    }
    return `Connected to ${this.host}:${this.port}/${this.database} using ${connection}`;
  }
  
  disconnect(connectionId: string): void {
    this.connectionPool.push(connectionId);
    console.log(`Returned connection ${connectionId} to pool`);
  }
  
  getConnectionInfo(): object {
    const metadata = (this as any).getInstanceMetadata?.() || {};
    return {
      host: this.host,
      port: this.port,
      database: this.database,
      availableConnections: this.connectionPool.length,
      maxConnections: this.maxConnections,
      ...metadata
    };
  }
}

@singletonWrapper
class SystemConfigManager {
  private configuration: Map<string, any> = new Map();
  
  constructor(public configFile: string, public environment: string = 'development') {
    console.log(`SystemConfigManager initialized with file: ${configFile} for environment: ${environment}`);
    
    // Load default configuration based on environment
    this.loadDefaultConfig(environment);
  }
  
  private loadDefaultConfig(env: string): void {
    const defaults = {
      development: { debug: true, logLevel: 'verbose', cacheSize: 100 },
      production: { debug: false, logLevel: 'error', cacheSize: 1000 },
      testing: { debug: true, logLevel: 'debug', cacheSize: 10 }
    };
    
    const config = defaults[env as keyof typeof defaults] || defaults.development;
    Object.entries(config).forEach(([key, value]) => {
      this.configuration.set(key, value);
    });
    
    console.log(`Loaded ${this.configuration.size} default config values for ${env}`);
  }
  
  get(key: string): any {
    return this.configuration.get(key);
  }
  
  set(key: string, newValue: any): void {
    const oldValue = this.configuration.get(key);
    this.configuration.set(key, newValue);
    console.log(`Config updated: ${key} = ${newValue} (was: ${oldValue})`);
  }
  
  getAllConfig(): object {
    return Object.fromEntries(this.configuration.entries());
  }
  
  getConfigFile(): string {
    return this.configFile;
  }
}

@comprehensiveWrapper
class APIServiceClient {
  private requestCount: number = 0;
  
  constructor(public baseUrl: string, public apiKey: string, public timeout: number = 5000, public retryAttempts: number = 3) {
    console.log(`APIServiceClient initialized for ${baseUrl} with timeout ${timeout}ms and ${retryAttempts} retry attempts`);
  }
  
  async makeRequest(endpoint: string, method: string = 'GET'): Promise<string> {
    this.requestCount++;
    console.log(`Making ${method} request #${this.requestCount} to ${this.baseUrl}${endpoint}`);
    
    // Simulate API request
    await new Promise(resolve => setTimeout(resolve, Math.random() * 100 + 50));
    
    return `${method} response from ${this.baseUrl}${endpoint} (request #${this.requestCount})`;
  }
  
  getClientStats(): object {
    const metadata = (this as any).getInstanceMetadata?.() || {};
    return {
      baseUrl: this.baseUrl,
      requestCount: this.requestCount,
      timeout: this.timeout,
      retryAttempts: this.retryAttempts,
      ...metadata
    };
  }
}

// Comprehensive testing and demonstration
console.log("\n--- Testing ApplicationLogger with Basic Wrapper ---");
const logger1 = new ApplicationLogger("Main", "INFO", "json");
const logger2 = new ApplicationLogger("Auth", "DEBUG");

logger1.log("Application started successfully");
logger1.log("User authentication initiated");
logger2.log("Authentication service connected");

console.log("Logger1 info:", logger1.getLoggerInfo());
console.log("Total logger instances:", (ApplicationLogger as any).getInstanceCount());

console.log("\n--- Testing DatabaseManager with Validation Wrapper ---");
try {
  const db1 = new DatabaseManager("localhost", 5432, "appdb", 20);
  console.log("DB1 connection:", db1.connect());
  console.log("DB1 info:", db1.getConnectionInfo());
  
  const db2 = new DatabaseManager("remote-server", 3306, "proddb", 50);
  console.log("DB2 connection:", db2.connect());
  
  console.log("Database instances:", (DatabaseManager as any).getInstanceCount());
  
} catch (error) {
  console.error("Database setup failed:", (error as Error).message);
}

console.log("\n--- Testing SystemConfigManager with Singleton Wrapper ---");
const config1 = new SystemConfigManager("app.config.json", "production");
const config2 = new SystemConfigManager("different.config.json", "development"); // Should return same instance

console.log("Config1 file:", config1.getConfigFile());
console.log("Config2 file:", config2.getConfigFile());
console.log("Same instance?", config1 === config2);

config1.set("newFeature", true);
console.log("Config2 newFeature:", config2.get("newFeature"));
console.log("All config:", config2.getAllConfig());

console.log("\n--- Testing APIServiceClient with Comprehensive Wrapper ---");
const apiClient = new APIServiceClient("https://api.example.com", "sk-abc123", 10000, 5);

(async () => {
  try {
    const response1 = await apiClient.makeRequest("/users", "GET");
    console.log("API Response 1:", response1);
    
    const response2 = await apiClient.makeRequest("/posts", "POST");
    console.log("API Response 2:", response2);
    
    console.log("API Client stats:", apiClient.getClientStats());
    console.log("API instances:", (APIServiceClient as any).getInstanceCount());
  } catch (error) {
    console.error("API client error:", error);
  }
})();

// Demonstrate validation failure
console.log("\n--- Testing Validation Failure ---");
try {
  const invalidDb = new DatabaseManager("", -1, "test", 0);
} catch (error) {
  console.error("Expected validation error:", (error as Error).message);
}

// Instance management demonstration
setTimeout(() => {
  console.log("\n--- Instance Management Demonstration ---");
  
  console.log("Logger instance #1 metadata:");
  const loggerInstance = (ApplicationLogger as any).getInstanceById(1);
  if (loggerInstance) {
    console.log(loggerInstance.getInstanceMetadata());
  }
  
  console.log("All API client instances:", (APIServiceClient as any).getAllInstances().length);
  
  console.log("\nWrapped constructor decorator concepts:");
  console.log("- Modern wrapper syntax: (options) => (value, context) => WrappedClass");
  console.log("- Complete constructor interception with pre/post processing");
  console.log("- Singleton pattern implementation through wrapper");
  console.log("- Instance tracking and management");
  console.log("- Validation middleware for constructor arguments");
  console.log("- Performance profiling and metadata injection");
  console.log("- Static method enhancement for class management");
  
}, 500);
