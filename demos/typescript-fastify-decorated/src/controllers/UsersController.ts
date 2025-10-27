import { FastifyRequest, FastifyReply } from 'fastify';
import { Controller, GET, POST, PUT, DELETE, Inject } from 'fastify-decorators';
import { CreateUserRequest, UpdateUserRequest } from '../models/User';
import { UserService } from '../services/UserService';
import {
  userParamsSchema,
  createUserSchema,
  updateUserSchema,
  userResponseSchema,
  usersResponseSchema,
  errorResponseSchema
} from '../schemas/userSchemas';

interface UserParams {
  id: string;
}

@Controller('/users')
export class UsersController {
  @Inject(UserService)
  private userService!: UserService;

  @GET('/', {
    schema: {
      response: {
        200: usersResponseSchema
      }
    }
  })
  async getAllUsers(request: FastifyRequest, reply: FastifyReply) {
    const users = this.userService.getAllUsers();
    return reply.code(200).send({
      success: true,
      data: users,
      message: `Found ${users.length} users`
    });
  }

  @GET('/:id', {
    schema: {
      params: userParamsSchema,
      response: {
        200: userResponseSchema,
        404: errorResponseSchema
      }
    }
  })
  async getUserById(request: FastifyRequest<{ Params: UserParams }>, reply: FastifyReply) {
    const userId = parseInt(request.params.id);
    const user = this.userService.getUserById(userId);
    
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
  }

  @POST('/', {
    schema: { 
      body: createUserSchema,
      response: {
        201: userResponseSchema,
        409: errorResponseSchema
      }
    }
  })
  async createUser(request: FastifyRequest<{ Body: CreateUserRequest }>, reply: FastifyReply) {
    const userData = request.body;
    
    // Check if email already exists
    if (this.userService.emailExists(userData.email)) {
      return reply.code(409).send({
        success: false,
        message: 'User with this email already exists'
      });
    }
    
    const newUser = this.userService.createUser(userData);
    return reply.code(201).send({
      success: true,
      data: newUser,
      message: 'User created successfully'
    });
  }

  @PUT('/:id', {
    schema: { 
      params: userParamsSchema, 
      body: updateUserSchema,
      response: {
        200: userResponseSchema,
        404: errorResponseSchema,
        409: errorResponseSchema
      }
    }
  })
  async updateUser(request: FastifyRequest<{ Params: UserParams; Body: UpdateUserRequest }>, reply: FastifyReply) {
    const userId = parseInt(request.params.id);
    const userData = request.body;
    
    // Check if user exists
    const existingUser = this.userService.getUserById(userId);
    if (!existingUser) {
      return reply.code(404).send({
        success: false,
        message: `User with ID ${userId} not found`
      });
    }
    
    // Check if email already exists (excluding current user)
    if (userData.email && this.userService.emailExists(userData.email, userId)) {
      return reply.code(409).send({
        success: false,
        message: 'User with this email already exists'
      });
    }
    
    const updatedUser = this.userService.updateUser(userId, userData);
    return reply.code(200).send({
      success: true,
      data: updatedUser,
      message: 'User updated successfully'
    });
  }

  @DELETE('/:id', {
    schema: { 
      params: userParamsSchema,
      response: {
        200: errorResponseSchema,
        404: errorResponseSchema
      }
    }
  })
  async deleteUser(request: FastifyRequest<{ Params: UserParams }>, reply: FastifyReply) {
    const userId = parseInt(request.params.id);
    const deleted = this.userService.deleteUser(userId);
    
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
  }
}