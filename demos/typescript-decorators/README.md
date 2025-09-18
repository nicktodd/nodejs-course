# TypeScript Decorators Demonstrations

This folder contains comprehensive examples of TypeScript decorators, covering all the main types and patterns.

## Files Overview

- `decorator1.ts` - Class decorator, simple
- `decorator2.ts` - Class decorator, parameterized  
- `decorator3.ts` - Class decorator, extends constructor
- `decorator4.ts` - Class decorator, extends constructor with params
- `decorator5.ts` - Class decorator, wraps constructor with params
- `decorator6.ts` - Method decorator
- `decorator7.ts` - Property decorator
- `decorator8.ts` - Parameter decorator

## Prerequisites

Make sure you have experimental decorators enabled in your TypeScript configuration:

```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

## Running the Examples

Each file can be run independently:

```bash
npx ts-node decorator1.ts
npx ts-node decorator2.ts
# ... and so on
```

Or run all examples with:

```bash
npx ts-node --experimentalDecorators *.ts
```

## Decorator Types Covered

1. **Class Decorators** - Modify or replace class constructors
2. **Method Decorators** - Enhance or modify method behavior
3. **Property Decorators** - Add metadata or modify property behavior
4. **Parameter Decorators** - Add metadata to method parameters

## Key Concepts Demonstrated

- Simple decorator functions
- Parameterized decorators (decorator factories)
- Constructor modification and wrapping
- Method interception and enhancement
- Property validation and transformation
- Parameter validation and metadata
- Decorator composition and ordering