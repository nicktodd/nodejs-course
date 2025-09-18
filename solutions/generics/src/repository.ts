// Solution: Generic Repository Pattern
// Complete implementation with full type safety

console.log("=== Solution: Generic Repository Pattern ===");

// Generic Repository class that works with any entity type that has an 'id' property
class Repository<T extends { id: string }> {
  private items: T[] = [];

  // Add an item to the repository
  add(item: T): void {
    this.items.push(item);
  }

  // Find an item by its ID
  findById(id: string): T | undefined {
    return this.items.find(item => item.id === id);
  }

  // Get all items in the repository
  getAll(): T[] {
    return [...this.items]; // Return a copy to prevent external mutation
  }

  // Remove an item by ID and return success status
  remove(id: string): boolean {
    const index = this.items.findIndex(item => item.id === id);
    if (index !== -1) {
      this.items.splice(index, 1);
      return true;
    }
    return false;
  }

  // Update an existing item
  update(id: string, updates: Partial<Omit<T, 'id'>>): boolean {
    const item = this.findById(id);
    if (item) {
      Object.assign(item, updates);
      return true;
    }
    return false;
  }

  // Get the count of items
  count(): number {
    return this.items.length;
  }

  // Find items matching a predicate
  findWhere(predicate: (item: T) => boolean): T[] {
    return this.items.filter(predicate);
  }
}

// Entity interfaces
interface User {
  id: string;
  name: string;
  email: string;
  age?: number;
}

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  inStock?: boolean;
}

// Test the Repository implementation
const userRepo = new Repository<User>();
const productRepo = new Repository<Product>();

// Add some test data
console.log("Adding users...");
userRepo.add({ id: "1", name: "John Doe", email: "john@example.com", age: 30 });
userRepo.add({ id: "2", name: "Jane Smith", email: "jane@example.com", age: 25 });
userRepo.add({ id: "3", name: "Bob Johnson", email: "bob@example.com" });

console.log("Adding products...");
productRepo.add({ id: "1", name: "Laptop", price: 999, category: "Electronics", inStock: true });
productRepo.add({ id: "2", name: "Book", price: 29, category: "Education", inStock: true });
productRepo.add({ id: "3", name: "Chair", price: 199, category: "Furniture", inStock: false });

// Test repository methods
console.log("\n--- Repository Operations ---");
console.log(`Total users: ${userRepo.count()}`);
console.log(`Total products: ${productRepo.count()}`);

console.log("\nAll users:", userRepo.getAll());
console.log("\nUser with id 1:", userRepo.findById("1"));

console.log("\nAll products:", productRepo.getAll());

// Test filtering
console.log("\nProducts in Electronics category:", 
  productRepo.findWhere(p => p.category === "Electronics"));

console.log("\nProducts under $100:", 
  productRepo.findWhere(p => p.price < 100));

// Test update
console.log("\nUpdating user 1's age...");
userRepo.update("1", { age: 31 });
console.log("Updated user:", userRepo.findById("1"));

// Test removal
console.log("\nRemoving product with id 2...");
const removed = productRepo.remove("2");
console.log(`Removal successful: ${removed}`);
console.log(`Remaining products: ${productRepo.count()}`);
console.log("Remaining products:", productRepo.getAll().map(p => p.name));

console.log("\n--- End Repository Demo ---\n");