// Shopping Cart System
// Implement your types and classes here

enum ProductCategory {
    Books,
    Electronics,
    Clothing,
    Food
}

interface Product {
    // Define product properties
}

interface CartItem {
    // Define cart item properties
}

class ShoppingCart {
    private items: CartItem[] = [];

    addItem(product: Product, quantity: number): void {
        // Implement add item
    }

    removeItem(productId: string): void {
        // Implement remove item
    }

    updateQuantity(productId: string, quantity: number): void {
        // Implement quantity update
    }

    getTotal(): number {
        // Implement total calculation
        return 0;
    }

    getItemCount(): number {
        // Implement item count
        return 0;
    }

    private validateQuantity(quantity: number): boolean {
        // Implement quantity validation
        return false;
    }
}

// Test your implementation
const cart = new ShoppingCart();

// Add your test cases here
