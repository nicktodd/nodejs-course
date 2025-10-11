import { User, CreateUserRequest, UpdateUserRequest } from '../models/User';

class UserService {
  private users: User[] = [
    {
      id: 1,
      name: 'Alice Johnson',
      email: 'alice@example.com',
      age: 28,
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15')
    },
    {
      id: 2,
      name: 'Bob Smith',
      email: 'bob@example.com',
      age: 34,
      createdAt: new Date('2024-02-10'),
      updatedAt: new Date('2024-02-10')
    },
    {
      id: 3,
      name: 'Carol Davis',
      email: 'carol@example.com',
      age: 26,
      createdAt: new Date('2024-03-05'),
      updatedAt: new Date('2024-03-05')
    }
  ];
  private nextId = 4;

  getAllUsers(): User[] {
    return this.users;
  }

  getUserById(id: number): User | undefined {
    return this.users.find(user => user.id === id);
  }

  createUser(userData: CreateUserRequest): User {
    const newUser: User = {
      id: this.nextId++,
      name: userData.name,
      email: userData.email,
      age: userData.age,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.users.push(newUser);
    return newUser;
  }

  updateUser(id: number, userData: UpdateUserRequest): User | null {
    const userIndex = this.users.findIndex(user => user.id === id);
    
    if (userIndex === -1) {
      return null;
    }

    const existingUser = this.users[userIndex];
    const updatedUser: User = {
      ...existingUser,
      ...userData,
      id: existingUser.id, // Ensure ID doesn't change
      createdAt: existingUser.createdAt, // Preserve creation date
      updatedAt: new Date() // Update the modification date
    };

    this.users[userIndex] = updatedUser;
    return updatedUser;
  }

  deleteUser(id: number): boolean {
    const userIndex = this.users.findIndex(user => user.id === id);
    
    if (userIndex === -1) {
      return false;
    }

    this.users.splice(userIndex, 1);
    return true;
  }

  emailExists(email: string, excludeId?: number): boolean {
    return this.users.some(user => 
      user.email.toLowerCase() === email.toLowerCase() && 
      user.id !== excludeId
    );
  }
}

export const userService = new UserService();