import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { CreateUserRequest, UpdateUserRequest } from '../models/User';
import { userService } from '../services/userService';

interface UserParams {
  id: string;
}

// JSON Schemas for validation
const userParamsSchema = {
  type: 'object',
  properties: {
    id: { type: 'string', pattern: '^[0-9]+$' }
  },
  required: ['id']
};

const userProperties = {
  name: { type: 'string', minLength: 2, maxLength: 50 },
  email: { type: 'string', format: 'email' },
  age: { type: 'integer', minimum: 1, maximum: 120 }
};

const createUserSchema = {
  type: 'object',
  required: ['name', 'email', 'age'],
  properties: userProperties
};

const updateUserSchema = {
  type: 'object',
  properties: userProperties
};

const userResponseSchema = {
  type: 'object',
  properties: {
    success: { type: 'boolean' },
    data: {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        name: { type: 'string' },
        email: { type: 'string' },
        age: { type: 'integer' },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' }
      },
      required: ['id', 'name', 'email', 'age', 'createdAt', 'updatedAt']
    },
    message: { type: 'string' }
  },
  required: ['success', 'data', 'message']
};

const usersResponseSchema = {
  type: 'object',
  properties: {
    success: { type: 'boolean' },
    data: {
      type: 'array',
      items: userResponseSchema.properties.data
    },
    message: { type: 'string' }
  },
  required: ['success', 'data', 'message']
};

export async function userRoutes(fastify: FastifyInstance) {
  // GET /users - Get all users
  fastify.get('/users', {
    schema: {
      response: {
        200: usersResponseSchema
      }
    }
  }, async (request: FastifyRequest, reply: FastifyReply) => {
    const users = userService.getAllUsers();
    return reply.code(200).send({
      success: true,
      data: users,
      message: `Found ${users.length} users`
    });
  });

  // GET /users/:id - Get user by ID
  fastify.get<{ Params: UserParams }>('/users/:id', {
    schema: {
      params: userParamsSchema,
      response: {
        200: userResponseSchema,
        404: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            message: { type: 'string' }
          },
          required: ['success', 'message']
        }
      }
    }
  }, async (request: FastifyRequest<{ Params: UserParams }>, reply: FastifyReply) => {
    const userId = parseInt(request.params.id);
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
  });

  // POST /users - Create a new user
  fastify.post<{ Body: CreateUserRequest }>('/users', {
    schema: { body: createUserSchema }
  }, async (request: FastifyRequest<{ Body: CreateUserRequest }>, reply: FastifyReply) => {
    const userData = request.body;
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
  });

  // PUT /users/:id - Update user by ID
  fastify.put<{ Params: UserParams; Body: UpdateUserRequest }>('/users/:id', {
    schema: { params: userParamsSchema, body: updateUserSchema }
  }, async (request: FastifyRequest<{ Params: UserParams; Body: UpdateUserRequest }>, reply: FastifyReply) => {
    const userId = parseInt(request.params.id);
    const userData = request.body;
    // Check if user exists
    const existingUser = userService.getUserById(userId);
    if (!existingUser) {
      return reply.code(404).send({
        success: false,
        message: `User with ID ${userId} not found`
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
  });

  // DELETE /users/:id - Delete user by ID
  fastify.delete<{ Params: UserParams }>('/users/:id', {
    schema: { params: userParamsSchema }
  }, async (request: FastifyRequest<{ Params: UserParams }>, reply: FastifyReply) => {
    const userId = parseInt(request.params.id);
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
  });
}