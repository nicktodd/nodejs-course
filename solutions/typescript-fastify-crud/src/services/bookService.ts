import { Book, CreateBookRequest, UpdateBookRequest } from '../models/Book';

class BookService {
  private books: Book[] = [
    {
      id: 1,
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      isbn: '978-0-06-112008-4',
      publishedYear: 1960,
      genre: 'Fiction',
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15')
    },
    {
      id: 2,
      title: '1984',
      author: 'George Orwell',
      isbn: '978-0-452-28423-4',
      publishedYear: 1949,
      genre: 'Dystopian Fiction',
      createdAt: new Date('2024-02-10'),
      updatedAt: new Date('2024-02-10')
    },
    {
      id: 3,
      title: 'Pride and Prejudice',
      author: 'Jane Austen',
      isbn: '978-0-14-143951-8',
      publishedYear: 1813,
      genre: 'Romance',
      createdAt: new Date('2024-03-05'),
      updatedAt: new Date('2024-03-05')
    },
    {
      id: 4,
      title: 'The Catcher in the Rye',
      author: 'J.D. Salinger',
      isbn: '978-0-316-76948-0',
      publishedYear: 1951,
      genre: 'Fiction',
      createdAt: new Date('2024-04-01'),
      updatedAt: new Date('2024-04-01')
    }
  ];
  private nextId = 5;

  getAllBooks(): Book[] {
    return this.books;
  }

  getBookById(id: number): Book | undefined {
    return this.books.find(book => book.id === id);
  }

  createBook(bookData: CreateBookRequest): Book {
    const newBook: Book = {
      id: this.nextId++,
      title: bookData.title,
      author: bookData.author,
      isbn: bookData.isbn,
      publishedYear: bookData.publishedYear,
      genre: bookData.genre,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.books.push(newBook);
    return newBook;
  }

  updateBook(id: number, bookData: UpdateBookRequest): Book | null {
    const bookIndex = this.books.findIndex(book => book.id === id);
    
    if (bookIndex === -1) {
      return null;
    }

    const existingBook = this.books[bookIndex];
    const updatedBook: Book = {
      ...existingBook,
      ...bookData,
      id: existingBook.id, // Ensure ID doesn't change
      createdAt: existingBook.createdAt, // Preserve creation date
      updatedAt: new Date() // Update the modification date
    };

    this.books[bookIndex] = updatedBook;
    return updatedBook;
  }

  deleteBook(id: number): boolean {
    const bookIndex = this.books.findIndex(book => book.id === id);
    
    if (bookIndex === -1) {
      return false;
    }

    this.books.splice(bookIndex, 1);
    return true;
  }

  validateBookData(bookData: CreateBookRequest | UpdateBookRequest): string[] {
    const errors: string[] = [];
    const currentYear = new Date().getFullYear();

    if ('title' in bookData) {
      if (!bookData.title || bookData.title.trim().length === 0) {
        errors.push('Title is required and cannot be empty');
      } else if (bookData.title.length < 1 || bookData.title.length > 200) {
        errors.push('Title must be between 1 and 200 characters');
      }
    }

    if ('author' in bookData) {
      if (!bookData.author || bookData.author.trim().length === 0) {
        errors.push('Author is required and cannot be empty');
      } else if (bookData.author.length < 1 || bookData.author.length > 100) {
        errors.push('Author must be between 1 and 100 characters');
      }
    }

    if ('isbn' in bookData) {
      if (!bookData.isbn || bookData.isbn.trim().length === 0) {
        errors.push('ISBN is required and cannot be empty');
      } else if (!this.isValidISBN(bookData.isbn)) {
        errors.push('ISBN format is invalid (must be valid ISBN-10 or ISBN-13)');
      }
    }

    if ('publishedYear' in bookData) {
      if (bookData.publishedYear === undefined || bookData.publishedYear === null) {
        errors.push('Published year is required');
      } else if (!Number.isInteger(bookData.publishedYear) || bookData.publishedYear < 1000 || bookData.publishedYear > currentYear) {
        errors.push(`Published year must be a valid integer between 1000 and ${currentYear}`);
      }
    }

    if ('genre' in bookData) {
      if (!bookData.genre || bookData.genre.trim().length === 0) {
        errors.push('Genre is required and cannot be empty');
      } else if (bookData.genre.length < 1 || bookData.genre.length > 50) {
        errors.push('Genre must be between 1 and 50 characters');
      }
    }

    return errors;
  }

  private isValidISBN(isbn: string): boolean {
    // Remove hyphens and spaces
    const cleanISBN = isbn.replace(/[-\s]/g, '');
    
    // Check ISBN-10
    if (cleanISBN.length === 10) {
      return this.validateISBN10(cleanISBN);
    }
    
    // Check ISBN-13
    if (cleanISBN.length === 13) {
      return this.validateISBN13(cleanISBN);
    }
    
    return false;
  }

  private validateISBN10(isbn: string): boolean {
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      const digit = parseInt(isbn[i]);
      if (isNaN(digit)) return false;
      sum += digit * (10 - i);
    }
    
    const checkDigit = isbn[9];
    const calculatedCheckDigit = (11 - (sum % 11)) % 11;
    
    return checkDigit === (calculatedCheckDigit === 10 ? 'X' : calculatedCheckDigit.toString());
  }

  private validateISBN13(isbn: string): boolean {
    let sum = 0;
    for (let i = 0; i < 12; i++) {
      const digit = parseInt(isbn[i]);
      if (isNaN(digit)) return false;
      sum += digit * (i % 2 === 0 ? 1 : 3);
    }
    
    const checkDigit = parseInt(isbn[12]);
    const calculatedCheckDigit = (10 - (sum % 10)) % 10;
    
    return checkDigit === calculatedCheckDigit;
  }

  isbnExists(isbn: string, excludeId?: number): boolean {
    const cleanISBN = isbn.replace(/[-\s]/g, '');
    return this.books.some(book => 
      book.isbn.replace(/[-\s]/g, '') === cleanISBN && 
      book.id !== excludeId
    );
  }

  // Bonus features
  searchBooks(query: string): Book[] {
    const lowerQuery = query.toLowerCase();
    return this.books.filter(book =>
      book.title.toLowerCase().includes(lowerQuery) ||
      book.author.toLowerCase().includes(lowerQuery) ||
      book.genre.toLowerCase().includes(lowerQuery)
    );
  }

  getBooksPaginated(limit: number, offset: number): { books: Book[], total: number } {
    const start = offset;
    const end = offset + limit;
    return {
      books: this.books.slice(start, end),
      total: this.books.length
    };
  }

  getBooksSorted(sortBy: keyof Book, order: 'asc' | 'desc' = 'asc'): Book[] {
    return [...this.books].sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      // Handle date sorting
      if (aValue instanceof Date && bValue instanceof Date) {
        aValue = aValue.getTime() as any;
        bValue = bValue.getTime() as any;
      }

      if (aValue < bValue) return order === 'asc' ? -1 : 1;
      if (aValue > bValue) return order === 'asc' ? 1 : -1;
      return 0;
    });
  }
}

export const bookService = new BookService();