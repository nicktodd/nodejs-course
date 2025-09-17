# Using Zod Solutions

This directory contains the complete solutions for the Zod exercises.

## Structure

- `src/examples/` - Complete example implementations
  - `basic-validation.ts` - Basic Zod schema validation examples
  - `object-validation.ts` - Object schema validation examples
  - `api-validation.ts` - API request/response validation examples
- `src/data/` - Sample data used in examples
- `src/schemas.ts` - Reusable schema definitions
- `src/index.ts` - Main entry point
- `src/test.ts` - Test implementations

## Running Solutions

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run any TypeScript file:
   ```bash
   npx ts-node src/index.ts
   npx ts-node src/examples/basic-validation.ts
   ```

3. Or build and run:
   ```bash
   npm run build
   npm start
   ```