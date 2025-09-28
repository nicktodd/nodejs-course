# TypeScript Essentials Lab - Solutions

This directory contains the solutions for the TypeScript Essentials lab exercises.

## Exercise 1: Getting Started with TypeScript
- Solution: `basics.ts`
- Demonstrates basic TypeScript types and function declarations

## Exercise 2: Working with Complex Types
- Solution: `complex-types.ts`
- Demonstrates enums, tuples, and array operations

## Exercise 3: TypeScript Configuration and Strictness
- Solution: `config-project/` directory
- Contains `tsconfig.json` and `config-demo.ts`
- Demonstrates TypeScript configuration and strictness settings

## Exercise 4: JavaScript to TypeScript Conversion
- Solution: `conversion.ts` and original `conversion.js`
- Demonstrates converting JavaScript code to TypeScript

## Running the Solutions

1. Compile TypeScript files:
   ```bash
   tsc basics.ts
   tsc complex-types.ts
   tsc conversion.ts
   ```

2. For the config project:
   ```bash
   tsc -p config-project
   node config-project/dist/config-demo.js
   ```

3. Run the compiled JavaScript:
   ```bash
   node basics.js
   node complex-types.js
   node conversion.js
   ```
