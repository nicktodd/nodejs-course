import express, { Request, Response } from 'express';
import { books } from './book.data';
import { BookSchema, CreateBookSchema, UpdateBookSchema, Book } from './book.schema';

const app = express();
app.use(express.json());

// GET /books - Get all books
app.get('/books', (req: Request, res: Response) => {
  res.json(books);
});

// GET /books/:id - Get book by ID
app.get('/books/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const book = books.find(b => b.id === id);
  
  if (!book) {
    return res.status(404).json({ error: 'Book not found' });
  }
  
  res.json(book);
});

// POST /books - Create a new book
app.post('/books', (req: Request, res: Response) => {
  try {
    const validatedData = CreateBookSchema.parse(req.body);
    const newBook: Book = {
      ...validatedData,
      id: Math.max(...books.map(b => b.id)) + 1
    };
    
    books.push(newBook);
    res.status(201).json(newBook);
  } catch (err: any) {
    res.status(400).json({ 
      error: 'Validation failed',
      details: err.errors?.map((e: any) => ({
        field: e.path.join('.'),
        message: e.message
      })) || [{ field: 'unknown', message: err.message }]
    });
  }
});

// PUT /books/:id - Update a book
app.put('/books/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const bookIndex = books.findIndex(b => b.id === id);
  
  if (bookIndex === -1) {
    return res.status(404).json({ error: 'Book not found' });
  }
  
  try {
    const validatedData = UpdateBookSchema.parse(req.body);
    const updatedBook: Book = {
      ...books[bookIndex],
      ...validatedData
    };
    
    // Validate the complete updated book
    const finalBook = BookSchema.parse(updatedBook);
    books[bookIndex] = finalBook;
    
    res.json(finalBook);
  } catch (err: any) {
    res.status(400).json({ 
      error: 'Validation failed',
      details: err.errors?.map((e: any) => ({
        field: e.path.join('.'),
        message: e.message
      })) || [{ field: 'unknown', message: err.message }]
    });
  }
});

// DELETE /books/:id - Delete a book
app.delete('/books/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const bookIndex = books.findIndex(b => b.id === id);
  
  if (bookIndex === -1) {
    return res.status(404).json({ error: 'Book not found' });
  }
  
  books.splice(bookIndex, 1);
  res.status(204).send();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Book Management API running on port ${PORT}`);
  console.log(`Available endpoints:`);
  console.log(`  GET    /books        - Get all books`);
  console.log(`  GET    /books/:id    - Get book by ID`);
  console.log(`  POST   /books        - Create a new book`);
  console.log(`  PUT    /books/:id    - Update a book`);
  console.log(`  DELETE /books/:id    - Delete a book`);
});
