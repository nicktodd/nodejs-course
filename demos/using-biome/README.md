# Using Biome Demo

This demo shows how to use [Biome](https://biomejs.dev/) as a linter and formatter for TypeScript and JavaScript projects. It mirrors the ESLint demo, but uses Biome for configuration and commands.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. (If Biome is not installed globally) Use `npx biome` for commands.

## Files
- `good.ts`: Example code that should pass Biome's recommended rules.
- `bad.ts`: Example code that should fail Biome's recommended rules.
- `biome.json`: Biome configuration file (enables recommended linting and formatting).
- `package.json`: Includes lint and format scripts.

## Usage

### Linting
Run Biome to check for code issues:
```bash
npm run lint
```
Or directly:
```bash
npx biome lint .
```

### Formatting
Run Biome to auto-format code:
```bash
npm run format
```
Or directly:
```bash
npx biome format .
```

## Example Output
- Run `npm run lint` to see errors in `bad.ts` (unused variables, missing types, indentation, quotes, etc.).
- Run `npm run lint` to see that `good.ts` passes with no errors.
- Run `npm run format` to auto-fix formatting issues (indentation, quotes, trailing spaces).

## Customization
- Edit `biome.json` to enable/disable specific rules or change formatting options.
- See [Biome documentation](https://biomejs.dev/docs/) for more details.

## Comparison to ESLint
- Biome is fast, all-in-one, and works out-of-the-box for TypeScript and JavaScript.
- No need for separate plugins or config files for most use cases.
- Try running both demos to compare output and workflow.
