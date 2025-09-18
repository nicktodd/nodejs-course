// Advanced Generics Demonstration

console.log("=== Advanced Generics Demo ===\n");

// 1. Conditional Types
type IsArray<T> = T extends any[] ? true : false;

type Test1 = IsArray<string>;   // false
type Test2 = IsArray<number[]>; // true
type Test3 = IsArray<string[]>; // true

// Practical conditional type
type ApiResponse<T> = T extends string 
  ? { message: T } 
  : { data: T };

function createResponse<T>(input: T): ApiResponse<T> {
  if (typeof input === 'string') {
    return { message: input } as ApiResponse<T>;
  }
  return { data: input } as ApiResponse<T>;
}

const stringResponse = createResponse("Hello");
const numberResponse = createResponse(42);

console.log("Conditional Types:");
console.log("String response:", stringResponse);
console.log("Number response:", numberResponse);
console.log("");

// 2. Mapped Types
type ReadOnly<T> = {
  readonly [K in keyof T]: T[K];
};

type Optional<T> = {
  [K in keyof T]?: T[K];
};

interface User {
  id: number;
  name: string;
  email: string;
}

type ReadOnlyUser = ReadOnly<User>;
type PartialUser = Optional<User>;

const readOnlyUser: ReadOnlyUser = {
  id: 1,
  name: "John",
  email: "john@example.com"
};

// readOnlyUser.name = "Jane"; // Error: Cannot assign to 'name' because it is read-only

const partialUser: PartialUser = {
  name: "Jane" // id and email are optional
};

console.log("Mapped Types:");
console.log("ReadOnly user:", readOnlyUser);
console.log("Partial user:", partialUser);
console.log("");

// 3. Template Literal Types
type EventName<T extends string> = `on${Capitalize<T>}`;
type HttpMethod = "get" | "post" | "put" | "delete";
type ApiEndpoint<T extends HttpMethod> = `/${T}User`;

type UserEvents = EventName<'click' | 'hover' | 'focus'>;
type UserApiEndpoints = ApiEndpoint<HttpMethod>;

// Example usage
const eventHandlers: Record<UserEvents, () => void> = {
  onClick: () => console.log("Clicked"),
  onHover: () => console.log("Hovered"),
  onFocus: () => console.log("Focused")
};

console.log("Template Literal Types:");
console.log("Available events:", Object.keys(eventHandlers));
console.log("");

// 4. Utility Types in Action
interface ProductItem {
  id: number;
  name: string;
  price: number;
  description: string;
  inStock: boolean;
}

// Pick specific properties
type ProductSummary = Pick<ProductItem, 'id' | 'name' | 'price'>;

// Omit specific properties
type ProductInput = Omit<ProductItem, 'id'>;

// Make all properties required (opposite of Partial)
type RequiredProduct = Required<Partial<ProductItem>>;

function createProductSummary(product: ProductItem): ProductSummary {
  return {
    id: product.id,
    name: product.name,
    price: product.price
  };
}

const fullProduct: ProductItem = {
  id: 1,
  name: "Laptop",
  price: 999,
  description: "High-performance laptop",
  inStock: true
};

const summary = createProductSummary(fullProduct);

console.log("Utility Types:");
console.log("Product summary:", summary);
console.log("");

// 5. Generic Higher-Order Functions
function memoize<TArgs extends any[], TReturn>(
  fn: (...args: TArgs) => TReturn
): (...args: TArgs) => TReturn {
  const cache = new Map<string, TReturn>();
  
  return (...args: TArgs): TReturn => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      console.log(`Cache hit for ${key}`);
      return cache.get(key)!;
    }
    
    console.log(`Computing result for ${key}`);
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

// Expensive function to memoize
const expensiveCalculation = memoize((a: number, b: number): number => {
  // Simulate expensive computation
  let result = 0;
  for (let i = 0; i < 1000000; i++) {
    result += a * b;
  }
  return result;
});

console.log("Generic Memoization:");
console.log("First call:", expensiveCalculation(5, 3));
console.log("Second call (cached):", expensiveCalculation(5, 3));
console.log("");

// 6. Variance and Generic Relationships
interface SimpleContainer<T> {
  value: T;
}

// Covariance example
class Creature {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

class Canine extends Creature {
  breed: string;
  constructor(name: string, breed: string) {
    super(name);
    this.breed = breed;
  }
}

function processCreatureContainer(container: SimpleContainer<Creature>): void {
  console.log(`Processing: ${container.value.name}`);
}

const canineContainer: SimpleContainer<Canine> = { value: new Canine("Rex", "Labrador") };
// This works due to covariance in TypeScript
processCreatureContainer(canineContainer);

// 7. Recursive Generic Types
type JsonValue = 
  | string 
  | number 
  | boolean 
  | null 
  | JsonValue[] 
  | { [key: string]: JsonValue };

interface TreeNode<T> {
  value: T;
  children?: TreeNode<T>[];
}

function printTree<T>(node: TreeNode<T>, depth = 0): void {
  const indent = "  ".repeat(depth);
  console.log(`${indent}${node.value}`);
  
  if (node.children) {
    node.children.forEach(child => printTree(child, depth + 1));
  }
}

const numberTree: TreeNode<number> = {
  value: 1,
  children: [
    { value: 2, children: [{ value: 4 }, { value: 5 }] },
    { value: 3, children: [{ value: 6 }] }
  ]
};

console.log("Recursive Generic Types:");
console.log("Number tree:");
printTree(numberTree);