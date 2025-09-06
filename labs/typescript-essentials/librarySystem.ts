// Library Catalog System
// Implement your types and classes here

enum Category {
    Fiction,
    NonFiction,
    Programming,
    Science,
    Education
}

interface Author {
    // Define author properties
}

interface Book {
    // Define book properties
}

interface LibraryMember {
    // Define library member properties
}

class LibraryCatalog {
    private books: Book[] = [];
    private checkouts: Map<string, string> = new Map(); // ISBN -> MemberID

    addBook(book: Book): void {
        // Implement book addition
    }

    searchByAuthor(authorName: string): Book[] {
        // Implement author search
        return [];
    }

    searchByCategory(category: Category): Book[] {
        // Implement category search
        return [];
    }

    checkoutBook(isbn: string, memberId: string): boolean {
        // Implement checkout logic
        return false;
    }

    returnBook(isbn: string): boolean {
        // Implement return logic
        return false;
    }

    checkAvailability(isbn: string): boolean {
        // Implement availability check
        return false;
    }
}

// Test your implementation
const catalog = new LibraryCatalog();

// Add your test cases here
