// Exercise 1: Generic Repository Pattern
// Create your Repository<T> class and entity interfaces here

// TODO: Create a generic Repository<T> class


// TODO: Create User and Product interfaces  


// TODO: Test your repository with both entity types



console.log("Exercise 1: Generic Repository Pattern");
console.log("Complete the TODOs above to implement the Repository pattern");

// Uncomment the code below once you've implemented the Repository class:

/*


// Test your Repository implementation
const userRepo = new Repository<User>();
const productRepo = new Repository<Product>();

// Add some test data
userRepo.add({ id: "1", name: "John Doe", email: "john@example.com" });
userRepo.add({ id: "2", name: "Jane Smith", email: "jane@example.com" });

productRepo.add({ id: "1", name: "Laptop", price: 999, category: "Electronics" });
productRepo.add({ id: "2", name: "Book", price: 29, category: "Education" });

// Test the methods
console.log("All users:", userRepo.getAll());
console.log("User with id 1:", userRepo.findById("1"));
console.log("All products:", productRepo.getAll());
console.log("Removed product:", productRepo.remove("2"));
console.log("Remaining products:", productRepo.getAll());
*/