# TypeScript Generics Lab

## Overview
This lab will teach you how to use TypeScript generics effectively. You'll build on your knowledge of inheritance and interfaces to create type-safe, reusable code components.

## Prerequisites
- Completed the TypeScript Inheritance & Interfaces lab
- Understanding of TypeScript classes and interfaces
- Basic knowledge of TypeScript syntax

## Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Run the TypeScript compiler to check your work
```bash
npm run check
```

### 3. Run your code
```bash
npm run start
```

## Lab Exercises

### Exercise 1: Generic Repository Pattern

Create a generic Repository class that can work with any type of entity. This will help you understand how to write flexible, type-safe code.

**Task 1.1:** Create a generic `Repository<T>` class in `src/repository.ts`

The class should:
- Have a private array to store items of type `T`
- Implement an `add(item: T): void` method
- Implement a `findById(id: string): T | undefined` method (assume all entities have an `id` property)
- Implement a `getAll(): T[]` method
- Implement a `remove(id: string): boolean` method

**Task 1.2:** Create interfaces for your entities

Create these interfaces:
- `User` with properties: `id`, `name`, `email`
- `Product` with properties: `id`, `name`, `price`, `category`

**Task 1.3:** Test your repository

Create instances of `Repository<User>` and `Repository<Product>` and test all methods.

### Exercise 2: Generic Utility Functions

Create utility functions that work with any type.

**Task 2.1:** Create a generic `swap<T>` function in `src/utils.ts`
- Takes two parameters of type `T`
- Returns a tuple `[T, T]` with the parameters swapped

**Task 2.2:** Create a generic `findFirst<T>` function
- Takes an array of `T` and a predicate function `(item: T) => boolean`
- Returns the first item that matches the predicate, or `undefined`

**Task 2.3:** Create a generic `groupBy<T, K>` function
- Takes an array of `T` and a key function `(item: T) => K`
- Returns a `Map<K, T[]>` where items are grouped by the key

### Exercise 3: Generic Constraints

Learn how to restrict generic types using constraints.

**Task 3.1:** Create a `Comparable` interface in `src/comparable.ts`
```typescript
interface Comparable<T> {
  compareTo(other: T): number;
}
```

**Task 3.2:** Create a generic `sort<T>` function
- Constraint: `T extends Comparable<T>`
- Takes an array of `T` items
- Returns a sorted array using the `compareTo` method

**Task 3.3:** Implement the `Comparable` interface for a `Score` class
- Properties: `value: number`, `playerName: string`
- Compare by score value (higher scores first)

