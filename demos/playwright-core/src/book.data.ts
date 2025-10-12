import { Book } from './book.schema';

export const books: Book[] = [
  {
    id: 1,
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    isbn: '978-0-06-112008-4',
    publicationYear: 1960,
    genre: 'Fiction',
    pages: 324,
    rating: 4.5,
    description: 'A gripping tale of racial inequality and childhood innocence in the American South.'
  },
  {
    id: 2,
    title: '1984',
    author: 'George Orwell',
    isbn: '978-0-452-28423-4',
    publicationYear: 1949,
    genre: 'Dystopian Fiction',
    pages: 328,
    rating: 4.8,
    description: 'A dystopian social science fiction novel and cautionary tale about totalitarianism.'
  },
  {
    id: 3,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    isbn: '978-0-7432-7356-5',
    publicationYear: 1925,
    genre: 'Fiction',
    pages: 180,
    rating: 4.2,
    description: 'A classic American novel set in the Jazz Age, exploring themes of wealth and moral decay.'
  },
  {
    id: 4,
    title: 'Dune',
    author: 'Frank Herbert',
    isbn: '978-0-441-17271-9',
    publicationYear: 1965,
    genre: 'Science Fiction',
    pages: 688,
    rating: 4.6,
    description: 'Epic science fiction novel set on the desert planet Arrakis.'
  },
  {
    id: 5,
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    isbn: '978-0-547-92822-7',
    publicationYear: 1937,
    genre: 'Fantasy',
    pages: 310,
    rating: 4.7,
    description: 'A fantasy adventure following Bilbo Baggins on an unexpected journey.'
  },
  {
    id: 6,
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    isbn: '978-0-14-143951-8',
    publicationYear: 1813,
    genre: 'Romance',
    pages: 432,
    rating: 4.3,
    description: 'A romantic novel about Elizabeth Bennet and Mr. Darcy in Regency England.'
  },
  {
    id: 7,
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    publicationYear: 1951,
    genre: 'Fiction',
    pages: 234,
    rating: 3.8,
    description: 'Coming-of-age story following teenager Holden Caulfield in New York City.'
  },
  {
    id: 8,
    title: 'Sapiens: A Brief History of Humankind',
    author: 'Yuval Noah Harari',
    isbn: '978-0-06-231609-7',
    publicationYear: 2011,
    genre: 'Non-Fiction',
    pages: 443,
    rating: 4.4,
    description: 'An exploration of how Homo sapiens conquered the world through cognitive, agricultural, and scientific revolutions.'
  }
];
