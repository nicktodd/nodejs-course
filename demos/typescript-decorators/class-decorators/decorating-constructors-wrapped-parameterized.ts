// Class Decorator - Wraps Constructor with Parameters
// A decorator that completely wraps the constructor while preserving the original behavior

console.log("=== Decorator 5: Class Decorator that Wraps Constructor with Parameters ===\n");

// Decorator factory that wraps constructor with various middleware-like functionality
function wrapConstructor(options: {
  validateInputs?: boolean;
  trackInstances?: boolean;
  addSingletonBehavior?: boolean;
  interceptConstruction?: boolean;
  logConstructorArgs?: boolean;
}) {
  const instances = new Map<string, any>();
  let instanceCount = 0;
  
  return function<T extends { new(...args: any[]): {} }>(constructor: T): T {
    
    const WrappedConstructor = class extends constructor {
      constructor(...args: any[]) {
        // Pre-construction logic
        if (options.logConstructorArgs) {
          console.log(`[WRAP] Constructing ${constructor.name} with args:`, args);
        }
        
        if (options.validateInputs) {
          validateConstructorArgs(args, constructor.name);
        }
        
        if (options.interceptConstruction) {
          console.log(`[INTERCEPT] About to create ${constructor.name} instance #${instanceCount + 1}`);
        }
        
        // Check singleton behavior
        if (options.addSingletonBehavior) {
          const singletonKey = `${constructor.name}_singleton`;
          const existingInstance = instances.get(singletonKey);
          
          if (existingInstance) {
            console.log(`[SINGLETON] Returning existing ${constructor.name} instance`);
            return existingInstance;
          }
        }
        
        // Call original constructor
        super(...args);
        
        // Post-construction logic
        instanceCount++;
        
        if (options.trackInstances) {
          const trackingKey = `${constructor.name}_${instanceCount}`;
          instances.set(trackingKey, this);
          console.log(`[TRACK] Created ${constructor.name} instance #${instanceCount}`);
        }
        
        if (options.addSingletonBehavior) {
          const singletonKey = `${constructor.name}_singleton`;
          instances.set(singletonKey, this);
        }
        
        // Add instance metadata
        (this as any).__instanceId = instanceCount;
        (this as any).__constructorArgs = [...args];
        (this as any).__createdAt = new Date();
        
        if (options.interceptConstruction) {
          console.log(`[INTERCEPT] Successfully created ${constructor.name} instance #${instanceCount}`);
        }
      }
    };
    
    // Copy static properties and methods
    Object.setPrototypeOf(WrappedConstructor, constructor);
    Object.defineProperty(WrappedConstructor, 'name', { value: constructor.name });
    
    // Add static methods to the wrapped constructor
    (WrappedConstructor as any).getInstanceCount = () => instanceCount;
    (WrappedConstructor as any).getAllInstances = () => Array.from(instances.values());
    (WrappedConstructor as any).getInstanceById = (id: number) => 
      Array.from(instances.values()).find((instance: any) => instance.__instanceId === id);
    
    return WrappedConstructor as any;
  };
  
  // Validation helper function
  function validateConstructorArgs(args: any[], className: string): void {
    console.log(`[VALIDATE] Validating ${args.length} arguments for ${className}`);
    
    for (let i = 0; i < args.length; i++) {
      const arg = args[i];
      if (arg === null || arg === undefined) {
        throw new Error(`[VALIDATE] Argument ${i} for ${className} cannot be null or undefined`);
      }
      if (typeof arg === 'string' && arg.trim() === '') {
        throw new Error(`[VALIDATE] String argument ${i} for ${className} cannot be empty`);
      }
    }
    
    console.log(`[VALIDATE] All arguments for ${className} are valid`);
  }
}

// Different wrapper configurations
const basicWrapper = wrapConstructor({
  logConstructorArgs: true,
  trackInstances: true
});

const validatingWrapper = wrapConstructor({
  validateInputs: true,
  logConstructorArgs: true,
  trackInstances: true,
  interceptConstruction: true
});

const singletonWrapper = wrapConstructor({
  addSingletonBehavior: true,
  logConstructorArgs: true,
  trackInstances: true
});

// Apply wrappers to classes
@basicWrapper
class Logger {
  constructor(public name: string, public level: string) {
    console.log(`Logger "${name}" created with level "${level}"`);
  }
  
  log(message: string): void {
    console.log(`[${this.level}] ${this.name}: ${message}`);
  }
  
  getLoggerInfo(): string {
    return `Logger: ${this.name} (${this.level})`;
  }
}

@validatingWrapper
class DatabaseConnection {
  constructor(public host: string, public port: number, public database: string) {
    console.log(`Database connection established to ${host}:${port}/${database}`);
  }
  
  connect(): string {
    return `Connected to ${this.host}:${this.port}/${this.database}`;
  }
  
  getConnectionInfo(): object {
    return {
      host: this.host,
      port: this.port,
      database: this.database,
      instanceId: (this as any).__instanceId,
      createdAt: (this as any).__createdAt
    };
  }
}

@singletonWrapper
class ConfigManager {
  private config: Map<string, any> = new Map();
  
  constructor(public configFile: string) {
    console.log(`ConfigManager initialized with file: ${configFile}`);
    // Load default config
    this.config.set('env', 'development');
    this.config.set('debug', true);
  }
  
  get(key: string): any {
    return this.config.get(key);
  }
  
  set(key: string, value: any): void {
    this.config.set(key, value);
  }
  
  getConfigFile(): string {
    return this.configFile;
  }
}

// Test the wrapped classes
console.log("\n--- Testing Basic Wrapped Logger ---");
const logger1 = new Logger("App", "INFO");
const logger2 = new Logger("DB", "DEBUG");

logger1.log("Application started");
logger2.log("Database query executed");

console.log("Logger instance count:", (Logger as any).getInstanceCount());
console.log("All logger instances:", (Logger as any).getAllInstances().length);

console.log("\n--- Testing Validating Database Connection ---");
try {
  const db1 = new DatabaseConnection("localhost", 5432, "myapp");
  console.log("DB Connection:", db1.connect());
  console.log("DB Info:", db1.getConnectionInfo());
  
  const db2 = new DatabaseConnection("remote-host", 3306, "production");
  console.log("DB2 Connection:", db2.connect());
  
  console.log("DB instance count:", (DatabaseConnection as any).getInstanceCount());
} catch (error) {
  console.error("Database connection failed:", (error as Error).message);
}

console.log("\n--- Testing Singleton ConfigManager ---");
const config1 = new ConfigManager("app.config.json");
const config2 = new ConfigManager("different.config.json"); // Should return same instance

console.log("Config1 file:", config1.getConfigFile());
console.log("Config2 file:", config2.getConfigFile());
console.log("Are they the same instance?:", config1 === config2);

config1.set("theme", "dark");
console.log("Config2 theme (should be 'dark'):", config2.get("theme"));

console.log("Config instance count:", (ConfigManager as any).getInstanceCount());

// Try validation failure
console.log("\n--- Testing Validation Failure ---");
try {
  const invalidDb = new DatabaseConnection("", 0, "test");
} catch (error) {
  console.error("Expected validation error:", (error as Error).message);
}

// Show instance tracking
console.log("\n--- Instance Tracking Demonstration ---");
console.log("Logger instance #1:", (Logger as any).getInstanceById(1)?.getLoggerInfo());
console.log("Logger instance #2:", (Logger as any).getInstanceById(2)?.getLoggerInfo());
console.log("DB instance #1:", (DatabaseConnection as any).getInstanceById(1)?.getConnectionInfo());