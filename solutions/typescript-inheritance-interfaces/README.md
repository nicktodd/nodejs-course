# TypeScript Inheritance and Interfaces - Solution

This folder contains the complete solution for the TypeScript inheritance and interfaces lab exercise.

## Solution Overview

The `banking-system.ts` file demonstrates:

### 1. Abstract Classes and Inheritance
- `Account` - Abstract base class with common properties and methods
- `SavingsAccount` - Extends Account with 3.5% interest and minimum balance
- `CurrentAccount` - Extends Account with 1% interest and overdraft facility

### 2. Method Overriding and Polymorphism
- Each account type implements `addInterest()` differently
- Polymorphic behavior when calling methods on an array of `Account[]`

### 3. Interface Implementation
- `Detailable` interface with `getDetails()` method
- Implemented by both account classes and `HomeInsurance` class
- Demonstrates interface polymorphism with mixed object types

### 4. Key Concepts Demonstrated
- Protected members accessible to subclasses
- Abstract methods that must be implemented
- Interface polymorphism across different class hierarchies
- Method overriding for specialized behavior

## Running the Solution

```bash
npm install
npm start
```

Or directly:
```bash
npx ts-node banking-system.ts
```

## Expected Output

The program will demonstrate:
1. Account creation and basic operations
2. Different interest rates for different account types
3. Minimum balance enforcement for savings accounts
4. Overdraft functionality for current accounts
5. Interface polymorphism with mixed object types
6. Final balance reporting

## Key Learning Points

- **Inheritance**: Code reuse through extending base classes
- **Abstract Classes**: Cannot be instantiated, provide common structure
- **Method Overriding**: Specialized behavior in subclasses
- **Polymorphism**: Same method calls, different behaviors
- **Interfaces**: Contracts that can be implemented by any class
- **Protected Access**: Members accessible to subclasses but not external code