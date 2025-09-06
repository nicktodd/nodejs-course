// Library Catalog System Solution

enum Category {
    Fiction,
    NonFiction,
    Programming,
    Science,
    Education
}

interface Author {
    name: string;
    birthYear: number;
    nationality: string;
}

interface Book {
    title: string;
    author: Author;
    ISBN: string;
    publishedDate: Date;
    categories: Category[];
}

interface LibraryMember {
    id: string;
    name: string;
    email: string;
    joinDate: Date;
}

class LibraryCatalog {
    private books: Book[] = [];
    private checkouts: Map<string, string> = new Map(); // ISBN -> MemberID
    private members: Map<string, LibraryMember> = new Map();

    addBook(book: Book): void {
        if (!this.validateISBN(book.ISBN)) {
            throw new Error('Invalid ISBN format');
        }

        if (this.books.some(b => b.ISBN === book.ISBN)) {
            throw new Error('Book with this ISBN already exists');
        }

        this.books.push(book);
    }

    searchByAuthor(authorName: string): Book[] {
        return this.books.filter(book => 
            book.author.name.toLowerCase().includes(authorName.toLowerCase())
        );
    }

    searchByCategory(category: Category): Book[] {
        return this.books.filter(book => 
            book.categories.includes(category)
        );
    }

    checkoutBook(isbn: string, memberId: string): boolean {
        if (!this.validateISBN(isbn)) {
            throw new Error('Invalid ISBN format');
        }

        if (!this.members.has(memberId)) {
            throw new Error('Member not found');
        }

        if (this.checkouts.has(isbn)) {
            return false; // Book already checked out
        }

        const book = this.books.find(b => b.ISBN === isbn);
        if (!book) {
            throw new Error('Book not found');
        }

        this.checkouts.set(isbn, memberId);
        return true;
    }

    returnBook(isbn: string): boolean {
        if (!this.validateISBN(isbn)) {
            throw new Error('Invalid ISBN format');
        }

        if (!this.checkouts.has(isbn)) {
            return false; // Book wasn't checked out
        }

        this.checkouts.delete(isbn);
        return true;
    }

    checkAvailability(isbn: string): boolean {
        if (!this.validateISBN(isbn)) {
            throw new Error('Invalid ISBN format');
        }

        return !this.checkouts.has(isbn);
    }

    registerMember(member: LibraryMember): void {
        if (this.members.has(member.id)) {
            throw new Error('Member ID already exists');
        }

        this.members.set(member.id, member);
    }

    private validateISBN(isbn: string): boolean {
        // Simple ISBN validation (can be made more robust)
        return /^\d{3}-\d{3}-\d{3}$/.test(isbn);
    }
}

// Test the implementation
try {
    const catalog = new LibraryCatalog();

    // Create and add a book
    const book: Book = {
        title: "TypeScript Essentials",
        author: {
            name: "John Doe",
            birthYear: 1980,
            nationality: "American"
        },
        ISBN: "123-456-789",
        publishedDate: new Date(2023, 0, 1),
        categories: [Category.Programming, Category.Education]
    };

    catalog.addBook(book);

    // Register a member
    const member: LibraryMember = {
        id: "M001",
        name: "Alice Smith",
        email: "alice@example.com",
        joinDate: new Date()
    };

    catalog.registerMember(member);

    // Test operations
    console.log('Search results:', catalog.searchByAuthor("John"));
    console.log('Available:', catalog.checkAvailability("123-456-789"));
    
    console.log('Checkout successful:', catalog.checkoutBook("123-456-789", "M001"));
    console.log('Available after checkout:', catalog.checkAvailability("123-456-789"));
    
    console.log('Return successful:', catalog.returnBook("123-456-789"));
    console.log('Available after return:', catalog.checkAvailability("123-456-789"));

} catch (error) {
    if (error instanceof Error) {
        console.error('Error:', error.message);
    }
}
