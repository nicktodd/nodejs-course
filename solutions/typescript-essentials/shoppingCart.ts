// Shopping Cart System Solution

enum ProductCategory {
    Books,
    Electronics,
    Clothing,
    Food
}

interface Product {
    id: string;
    name: string;
    price: number;
    category: ProductCategory;
    stockQuantity?: number;
}

interface CartItem {
    product: Product;
    quantity: number;
}

class OutOfStockError extends Error {
    constructor(productId: string) {
        super(`Product ${productId} is out of stock`);
    }
}

class InvalidQuantityError extends Error {
    constructor(message: string) {
        super(message);
    }
}

class ShoppingCart {
    private items: CartItem[] = [];
    private readonly MAX_QUANTITY = 10;

    addItem(product: Product, quantity: number): void {
        if (!this.validateQuantity(quantity)) {
            throw new InvalidQuantityError(
                `Quantity must be between 1 and ${this.MAX_QUANTITY}`
            );
        }

        if (product.stockQuantity !== undefined && quantity > product.stockQuantity) {
            throw new OutOfStockError(product.id);
        }

        const existingItem = this.items.find(item => 
            item.product.id === product.id
        );

        if (existingItem) {
            const newQuantity = existingItem.quantity + quantity;
            if (!this.validateQuantity(newQuantity)) {
                throw new InvalidQuantityError(
                    `Cannot add ${quantity} items. Would exceed maximum quantity of ${this.MAX_QUANTITY}`
                );
            }
            existingItem.quantity = newQuantity;
        } else {
            this.items.push({ product, quantity });
        }
    }

    removeItem(productId: string): void {
        const index = this.items.findIndex(item => 
            item.product.id === productId
        );

        if (index !== -1) {
            this.items.splice(index, 1);
        }
    }

    updateQuantity(productId: string, quantity: number): void {
        if (!this.validateQuantity(quantity)) {
            throw new InvalidQuantityError(
                `Quantity must be between 1 and ${this.MAX_QUANTITY}`
            );
        }

        const item = this.items.find(item => 
            item.product.id === productId
        );

        if (!item) {
            throw new Error('Product not found in cart');
        }

        if (item.product.stockQuantity !== undefined && 
            quantity > item.product.stockQuantity) {
            throw new OutOfStockError(productId);
        }

        item.quantity = quantity;
    }

    getTotal(): number {
        return Number(this.items.reduce((total, item) => 
            total + (item.product.price * item.quantity), 0
        ).toFixed(2));
    }

    getItemCount(): number {
        return this.items.reduce((count, item) => 
            count + item.quantity, 0
        );
    }

    getItems(): ReadonlyArray<CartItem> {
        return this.items;
    }

    clear(): void {
        this.items = [];
    }

    private validateQuantity(quantity: number): boolean {
        return Number.isInteger(quantity) && 
               quantity > 0 && 
               quantity <= this.MAX_QUANTITY;
    }
}

// Test the implementation
try {
    const cart = new ShoppingCart();

    // Create some products
    const book: Product = {
        id: "B001",
        name: "TypeScript Book",
        price: 29.99,
        category: ProductCategory.Books,
        stockQuantity: 5
    };

    const laptop: Product = {
        id: "E001",
        name: "Laptop",
        price: 999.99,
        category: ProductCategory.Electronics,
        stockQuantity: 2
    };

    // Test operations
    cart.addItem(book, 2);
    console.log('Added 2 books');
    console.log('Cart total:', cart.getTotal());
    console.log('Item count:', cart.getItemCount());

    cart.addItem(laptop, 1);
    console.log('\nAdded 1 laptop');
    console.log('Cart total:', cart.getTotal());
    console.log('Item count:', cart.getItemCount());

    cart.updateQuantity("B001", 3);
    console.log('\nUpdated book quantity to 3');
    console.log('Cart total:', cart.getTotal());
    console.log('Item count:', cart.getItemCount());

    cart.removeItem("E001");
    console.log('\nRemoved laptop');
    console.log('Cart total:', cart.getTotal());
    console.log('Item count:', cart.getItemCount());

    // Test error cases
    try {
        cart.addItem(book, 15); // Exceeds maximum quantity
    } catch (error) {
        if (error instanceof Error) {
            console.log('\nExpected error:', error.message);
        }
    }

    try {
        cart.addItem(laptop, 3); // Exceeds stock quantity
    } catch (error) {
        if (error instanceof Error) {
            console.log('Expected error:', error.message);
        }
    }

} catch (error) {
    if (error instanceof Error) {
        console.error('Error:', error.message);
    }
}
