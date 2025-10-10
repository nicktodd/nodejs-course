import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { CreateUserRequest, UpdateUserRequest } from '../models/User';
import { userService } from '../services/userService';

interface UserParams {
  id: string;
}

export async function userRoutes(fastify: FastifyInstance) {
  // GET /users - Get all users
  fastify.get('/users', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const users = userService.getAllUsers();
      return reply.code(200).send({
        success: true,
        data: users,
        message: `Found ${users.length} users`
      });
    } catch (error) {
      return reply.code(500).send({
        success: false,
        message: 'Internal server error while fetching users'
      });
    }
  });

  // GET /users/:id - Get user by ID
  fastify.get<{ Params: UserParams }>('/users/:id', async (request: FastifyRequest<{ Params: UserParams }>, reply: FastifyReply) => {
    try {
      const userId = parseInt(request.params.id);
      
      if (isNaN(userId)) {
        return reply.code(400).send({
          success: false,
          message: 'Invalid user ID. ID must be a number'
        });
      }

      const user = userService.getUserById(userId);
      
      if (!user) {
        return reply.code(404).send({
          success: false,
          message: `User with ID ${userId} not found`
        });
      }

      return reply.code(200).send({
        success: true,
        data: user,
        message: 'User found successfully'
      });
    } catch (error) {
      return reply.code(500).send({
        success: false,
        message: 'Internal server error while fetching user'
      });
    }
  });

  // POST /users - Create a new user
  fastify.post<{ Body: CreateUserRequest }>('/users', async (request: FastifyRequest<{ Body: CreateUserRequest }>, reply: FastifyReply) => {
    try {
      const userData = request.body;

      // Validate required fields
      const validationErrors = userService.validateUserData(userData);
      if (validationErrors.length > 0) {
        return reply.code(400).send({
          success: false,
          message: 'Validation failed',
          errors: validationErrors
        });
      }

      // Check if email already exists
      if (userService.emailExists(userData.email)) {
        return reply.code(409).send({
          success: false,
          message: 'User with this email already exists'
        });
      }

      const newUser = userService.createUser(userData);
      
      return reply.code(201).send({
        success: true,
        data: newUser,
        message: 'User created successfully'
      });
    } catch (error) {
      return reply.code(500).send({
        success: false,
        message: 'Internal server error while creating user'
      });
    }
  });

  // PUT /users/:id - Update user by ID
  fastify.put<{ Params: UserParams; Body: UpdateUserRequest }>('/users/:id', async (request: FastifyRequest<{ Params: UserParams; Body: UpdateUserRequest }>, reply: FastifyReply) => {
    try {
      const userId = parseInt(request.params.id);
      const userData = request.body;

      if (isNaN(userId)) {
        return reply.code(400).send({
          success: false,
          message: 'Invalid user ID. ID must be a number'
        });
      }

      // Check if user exists
      const existingUser = userService.getUserById(userId);
      if (!existingUser) {
        return reply.code(404).send({
          success: false,
          message: `User with ID ${userId} not found`
        });
      }

      // Validate the update data
      const validationErrors = userService.validateUserData(userData);
      if (validationErrors.length > 0) {
        return reply.code(400).send({
          success: false,
          message: 'Validation failed',
          errors: validationErrors
        });
      }

      // Check if email already exists (excluding current user)
      if (userData.email && userService.emailExists(userData.email, userId)) {
        return reply.code(409).send({
          success: false,
          message: 'User with this email already exists'
        });
      }

      const updatedUser = userService.updateUser(userId, userData);
      
      return reply.code(200).send({
        success: true,
        data: updatedUser,
        message: 'User updated successfully'
      });
    } catch (error) {
      return reply.code(500).send({
        success: false,
        message: 'Internal server error while updating user'
      });
    }
  });

  // DELETE /users/:id - Delete user by ID
  fastify.delete<{ Params: UserParams }>('/users/:id', async (request: FastifyRequest<{ Params: UserParams }>, reply: FastifyReply) => {
    try {
      const userId = parseInt(request.params.id);

      if (isNaN(userId)) {
        return reply.code(400).send({
          success: false,
          message: 'Invalid user ID. ID must be a number'
        });
      }

      const deleted = userService.deleteUser(userId);
      
      if (!deleted) {
        return reply.code(404).send({
          success: false,
          message: `User with ID ${userId} not found`
        });
      }

      return reply.code(200).send({
        success: true,
        message: 'User deleted successfully'
      });
    } catch (error) {
      return reply.code(500).send({
        success: false,
        message: 'Internal server error while deleting user'
      });
    }
  });
}