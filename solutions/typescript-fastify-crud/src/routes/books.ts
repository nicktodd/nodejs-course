import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { CreateBookRequest, UpdateBookRequest } from '../models/Book';
import { bookService } from '../services/bookService';

interface BookParams {
  id: string;
}

interface BookQueryParams {
  search?: string;
  limit?: string;
  offset?: string;
  sortBy?: string;
  order?: 'asc' | 'desc';
}

export async function bookRoutes(fastify: FastifyInstance) {
  // GET /books - Get all books with optional search, pagination, and sorting
  fastify.get<{ Querystring: BookQueryParams }>('/books', async (request: FastifyRequest<{ Querystring: BookQueryParams }>, reply: FastifyReply) => {
    try {
      const { search, limit, offset, sortBy, order } = request.query;

      let books = bookService.getAllBooks();
      let total = books.length;

      // Handle search
      if (search) {
        books = bookService.searchBooks(search);
        total = books.length;
      }

      // Handle sorting
      if (sortBy && ['title', 'author', 'publishedYear', 'genre', 'createdAt'].includes(sortBy)) {
        books = bookService.getBooksSorted(sortBy as any, order || 'asc');
      }

      // Handle pagination
      if (limit && offset) {
        const limitNum = parseInt(limit);
        const offsetNum = parseInt(offset);
        
        if (!isNaN(limitNum) && !isNaN(offsetNum) && limitNum > 0 && offsetNum >= 0) {
          const startIndex = offsetNum;
          const endIndex = offsetNum + limitNum;
          books = books.slice(startIndex, endIndex);
        }
      }

      return reply.code(200).send({
        success: true,
        data: books,
        message: `Found ${books.length} books${search ? ` matching "${search}"` : ''}`,
        pagination: limit && offset ? {
          total,
          limit: parseInt(limit),
          offset: parseInt(offset),
          hasNext: parseInt(offset) + parseInt(limit) < total
        } : undefined
      });
    } catch (error) {
      return reply.code(500).send({
        success: false,
        message: 'Internal server error while fetching books'
      });
    }
  });

  // GET /books/:id - Get book by ID
  fastify.get<{ Params: BookParams }>('/books/:id', async (request: FastifyRequest<{ Params: BookParams }>, reply: FastifyReply) => {
    try {
      const bookId = parseInt(request.params.id);
      
      if (isNaN(bookId)) {
        return reply.code(400).send({
          success: false,
          message: 'Invalid book ID. ID must be a number'
        });
      }

      const book = bookService.getBookById(bookId);
      
      if (!book) {
        return reply.code(404).send({
          success: false,
          message: `Book with ID ${bookId} not found`
        });
      }

      return reply.code(200).send({
        success: true,
        data: book,
        message: 'Book found successfully'
      });
    } catch (error) {
      return reply.code(500).send({
        success: false,
        message: 'Internal server error while fetching book'
      });
    }
  });

  // POST /books - Create a new book
  fastify.post<{ Body: CreateBookRequest }>('/books', async (request: FastifyRequest<{ Body: CreateBookRequest }>, reply: FastifyReply) => {
    try {
      const bookData = request.body;

      // Validate required fields
      const validationErrors = bookService.validateBookData(bookData);
      if (validationErrors.length > 0) {
        return reply.code(400).send({
          success: false,
          message: 'Validation failed',
          errors: validationErrors
        });
      }

      // Check if ISBN already exists
      if (bookService.isbnExists(bookData.isbn)) {
        return reply.code(409).send({
          success: false,
          message: 'Book with this ISBN already exists'
        });
      }

      const newBook = bookService.createBook(bookData);
      
      return reply.code(201).send({
        success: true,
        data: newBook,
        message: 'Book created successfully'
      });
    } catch (error) {
      return reply.code(500).send({
        success: false,
        message: 'Internal server error while creating book'
      });
    }
  });

  // PUT /books/:id - Update book by ID
  fastify.put<{ Params: BookParams; Body: UpdateBookRequest }>('/books/:id', async (request: FastifyRequest<{ Params: BookParams; Body: UpdateBookRequest }>, reply: FastifyReply) => {
    try {
      const bookId = parseInt(request.params.id);
      const bookData = request.body;

      if (isNaN(bookId)) {
        return reply.code(400).send({
          success: false,
          message: 'Invalid book ID. ID must be a number'
        });
      }

      // Check if book exists
      const existingBook = bookService.getBookById(bookId);
      if (!existingBook) {
        return reply.code(404).send({
          success: false,
          message: `Book with ID ${bookId} not found`
        });
      }

      // Validate the update data
      const validationErrors = bookService.validateBookData(bookData);
      if (validationErrors.length > 0) {
        return reply.code(400).send({
          success: false,
          message: 'Validation failed',
          errors: validationErrors
        });
      }

      // Check if ISBN already exists (excluding current book)
      if (bookData.isbn && bookService.isbnExists(bookData.isbn, bookId)) {
        return reply.code(409).send({
          success: false,
          message: 'Book with this ISBN already exists'
        });
      }

      const updatedBook = bookService.updateBook(bookId, bookData);
      
      return reply.code(200).send({
        success: true,
        data: updatedBook,
        message: 'Book updated successfully'
      });
    } catch (error) {
      return reply.code(500).send({
        success: false,
        message: 'Internal server error while updating book'
      });
    }
  });

  // DELETE /books/:id - Delete book by ID
  fastify.delete<{ Params: BookParams }>('/books/:id', async (request: FastifyRequest<{ Params: BookParams }>, reply: FastifyReply) => {
    try {
      const bookId = parseInt(request.params.id);

      if (isNaN(bookId)) {
        return reply.code(400).send({
          success: false,
          message: 'Invalid book ID. ID must be a number'
        });
      }

      const deleted = bookService.deleteBook(bookId);
      
      if (!deleted) {
        return reply.code(404).send({
          success: false,
          message: `Book with ID ${bookId} not found`
        });
      }

      return reply.code(200).send({
        success: true,
        message: 'Book deleted successfully'
      });
    } catch (error) {
      return reply.code(500).send({
        success: false,
        message: 'Internal server error while deleting book'
      });
    }
  });
}