// Parameter Decorator
// Decorators that add metadata or validation to method parameters

console.log("=== Decorator 8: Parameter Decorator ===\n");

// Store parameter metadata
const parameterMetadata = new Map<string, Map<string, Array<any>>>();

// Parameter decorator for required parameters
function required(target: any, propertyKey: string, parameterIndex: number) {
  console.log(`@required applied to parameter ${parameterIndex} of ${target.constructor.name}.${propertyKey}`);
  
  const existingMetadata = parameterMetadata.get(target.constructor.name) || new Map();
  const methodMetadata = existingMetadata.get(propertyKey) || [];
  
  methodMetadata[parameterIndex] = { type: 'required' };
  
  existingMetadata.set(propertyKey, methodMetadata);
  parameterMetadata.set(target.constructor.name, existingMetadata);
}

// Parameter decorator for type validation
function validateType(expectedType: string) {
  return function(target: any, propertyKey: string, parameterIndex: number) {
    console.log(`@validateType(${expectedType}) applied to parameter ${parameterIndex} of ${target.constructor.name}.${propertyKey}`);
    
    const existingMetadata = parameterMetadata.get(target.constructor.name) || new Map();
    const methodMetadata = existingMetadata.get(propertyKey) || [];
    
    methodMetadata[parameterIndex] = { type: 'validateType', expectedType };
    
    existingMetadata.set(propertyKey, methodMetadata);
    parameterMetadata.set(target.constructor.name, existingMetadata);
  };
}

// Parameter decorator for range validation
function range(min: number, max: number) {
  return function(target: any, propertyKey: string, parameterIndex: number) {
    console.log(`@range(${min}, ${max}) applied to parameter ${parameterIndex} of ${target.constructor.name}.${propertyKey}`);
    
    const existingMetadata = parameterMetadata.get(target.constructor.name) || new Map();
    const methodMetadata = existingMetadata.get(propertyKey) || [];
    
    methodMetadata[parameterIndex] = { type: 'range', min, max };
    
    existingMetadata.set(propertyKey, methodMetadata);
    parameterMetadata.set(target.constructor.name, existingMetadata);
  };
}

// Parameter decorator for custom validation
function validateParam(validator: (value: any) => boolean, errorMessage: string) {
  return function(target: any, propertyKey: string, parameterIndex: number) {
    console.log(`@validateParam applied to parameter ${parameterIndex} of ${target.constructor.name}.${propertyKey}`);
    
    const existingMetadata = parameterMetadata.get(target.constructor.name) || new Map();
    const methodMetadata = existingMetadata.get(propertyKey) || [];
    
    methodMetadata[parameterIndex] = { type: 'custom', validator, errorMessage };
    
    existingMetadata.set(propertyKey, methodMetadata);
    parameterMetadata.set(target.constructor.name, existingMetadata);
  };
}

// Parameter decorator for logging parameter values
function logParam(paramName?: string) {
  return function(target: any, propertyKey: string, parameterIndex: number) {
    const displayName = paramName || `param${parameterIndex}`;
    console.log(`@logParam(${displayName}) applied to parameter ${parameterIndex} of ${target.constructor.name}.${propertyKey}`);
    
    const existingMetadata = parameterMetadata.get(target.constructor.name) || new Map();
    const methodMetadata = existingMetadata.get(propertyKey) || [];
    
    methodMetadata[parameterIndex] = { type: 'log', paramName: displayName };
    
    existingMetadata.set(propertyKey, methodMetadata);
    parameterMetadata.set(target.constructor.name, existingMetadata);
  };
}

// Method decorator to validate parameters based on parameter metadata
function validateParameters(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  
  descriptor.value = function(...args: any[]) {
    const classMetadata = parameterMetadata.get(target.constructor.name);
    
    if (classMetadata) {
      const methodMetadata = classMetadata.get(propertyKey);
      
      if (methodMetadata) {
        for (let i = 0; i < methodMetadata.length; i++) {
          const paramMeta = methodMetadata[i];
          if (!paramMeta) continue;
          
          const value = args[i];
          
          // Handle different validation types
          switch (paramMeta.type) {
            case 'required':
              if (value === undefined || value === null) {
                throw new Error(`Parameter ${i} is required for method ${propertyKey}`);
              }
              break;
              
            case 'validateType':
              if (typeof value !== paramMeta.expectedType) {
                throw new Error(`Parameter ${i} expected type ${paramMeta.expectedType}, got ${typeof value}`);
              }
              break;
              
            case 'range':
              if (typeof value === 'number' && (value < paramMeta.min || value > paramMeta.max)) {
                throw new Error(`Parameter ${i} must be between ${paramMeta.min} and ${paramMeta.max}`);
              }
              break;
              
            case 'custom':
              if (!paramMeta.validator(value)) {
                throw new Error(`Parameter ${i} validation failed: ${paramMeta.errorMessage}`);
              }
              break;
              
            case 'log':
              console.log(`[PARAM] ${paramMeta.paramName} = `, value);
              break;
          }
        }
      }
    }
    
    return originalMethod.apply(this, args);
  };
  
  return descriptor;
}

// Test classes with parameter decorators
class UserService {
  @validateParameters
  createUser(
    @required 
    @validateType('string') 
    @logParam('username')
    name: string,
    
    @required 
    @validateType('string') 
    @validateParam(
      (email) => typeof email === 'string' && email.includes('@'),
      'Must be a valid email address'
    )
    @logParam('email')
    email: string,
    
    @range(18, 120) 
    @validateType('number')
    @logParam('age')
    age: number
  ): object {
    console.log(`Creating user: ${name}, ${email}, age ${age}`);
    return {
      id: Math.random().toString(36).substring(2, 9),
      name,
      email,
      age,
      createdAt: new Date()
    };
  }
  
  @validateParameters
  updateUserPassword(
    @required 
    @validateType('string')
    @logParam('userId')
    userId: string,
    
    @required
    @validateType('string')
    @validateParam(
      (pwd) => typeof pwd === 'string' && pwd.length >= 8,
      'Password must be at least 8 characters long'
    )
    @logParam('newPassword') 
    newPassword: string
  ): boolean {
    console.log(`Updating password for user ${userId}`);
    return true;
  }
}

class MathOperations {
  @validateParameters
  divide(
    @required 
    @validateType('number')
    @logParam('dividend')
    dividend: number,
    
    @required 
    @validateType('number')
    @validateParam(
      (divisor) => typeof divisor === 'number' && divisor !== 0,
      'Divisor cannot be zero'
    )
    @logParam('divisor')
    divisor: number
  ): number {
    const result = dividend / divisor;
    console.log(`Division result: ${dividend} / ${divisor} = ${result}`);
    return result;
  }
  
  @validateParameters
  calculateArea(
    @required 
    @range(0, 1000)
    @validateType('number')
    @logParam('width')
    width: number,
    
    @required 
    @range(0, 1000) 
    @validateType('number')
    @logParam('height')
    height: number
  ): number {
    const area = width * height;
    console.log(`Rectangle area: ${width} × ${height} = ${area}`);
    return area;
  }
}

// Test the parameter decorators
console.log("\n--- Testing Parameter Decorators ---");

const userService = new UserService();
const mathOps = new MathOperations();

console.log("\n1. Testing valid user creation:");
try {
  const user = userService.createUser("John Doe", "john@example.com", 30);
  console.log("Created user:", user);
} catch (error) {
  console.error("User creation error:", (error as Error).message);
}

console.log("\n2. Testing invalid email:");
try {
  userService.createUser("Jane Doe", "invalid-email", 25);
} catch (error) {
  console.error("Expected validation error:", (error as Error).message);
}

console.log("\n3. Testing missing required parameter:");
try {
  (userService as any).createUser("Bob", null, 35);
} catch (error) {
  console.error("Expected required parameter error:", (error as Error).message);
}

console.log("\n4. Testing type validation:");
try {
  (userService as any).createUser("Alice", "alice@example.com", "not-a-number");
} catch (error) {
  console.error("Expected type validation error:", (error as Error).message);
}

console.log("\n5. Testing range validation:");
try {
  userService.createUser("Charlie", "charlie@example.com", 150);
} catch (error) {
  console.error("Expected range validation error:", (error as Error).message);
}

console.log("\n6. Testing password update:");
try {
  const success = userService.updateUserPassword("user123", "newpassword123");
  console.log("Password update successful:", success);
} catch (error) {
  console.error("Password update error:", (error as Error).message);
}

console.log("\n7. Testing short password:");
try {
  userService.updateUserPassword("user123", "short");
} catch (error) {
  console.error("Expected password validation error:", (error as Error).message);
}

console.log("\n8. Testing math operations:");
try {
  const divisionResult = mathOps.divide(10, 2);
  console.log("Division successful, result:", divisionResult);
} catch (error) {
  console.error("Division error:", (error as Error).message);
}

console.log("\n9. Testing division by zero:");
try {
  mathOps.divide(10, 0);
} catch (error) {
  console.error("Expected division by zero error:", (error as Error).message);
}

console.log("\n10. Testing area calculation:");
try {
  const area = mathOps.calculateArea(5, 10);
  console.log("Area calculation successful, result:", area);
} catch (error) {
  console.error("Area calculation error:", (error as Error).message);
}

console.log("\n11. Testing out of range values:");
try {
  mathOps.calculateArea(5, 1500); // Height > 1000
} catch (error) {
  console.error("Expected range validation error:", (error as Error).message);
}

console.log("\n--- Parameter Metadata Summary ---");
console.log("Stored metadata for classes:");
parameterMetadata.forEach((classMeta, className) => {
  console.log(`\n${className}:`);
  classMeta.forEach((methodMeta, methodName) => {
    console.log(`  ${methodName}:`, methodMeta);
  });
});