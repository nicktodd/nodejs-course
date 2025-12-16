// JSON Schemas for validation
export const userParamsSchema = {
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

export const createUserSchema = {
  type: 'object',
  required: ['name', 'email', 'age'],
  properties: userProperties
};

export const updateUserSchema = {
  type: 'object',
  properties: userProperties
};

export const userResponseSchema = {
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

export const usersResponseSchema = {
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

export const errorResponseSchema = {
  type: 'object',
  properties: {
    success: { type: 'boolean' },
    message: { type: 'string' }
  },
  required: ['success', 'message']
};