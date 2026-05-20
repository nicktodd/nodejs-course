---
name: scaffold-lab
description: Scaffold a new lab exercise for this Node.js course. Use when asked to create a new lab, add a lab exercise, or set up a lab folder. Produces a lab README, a matching solution folder, and a package.json for both.
argument-hint: "[lab-name] e.g. typescript-generics"
---

# Scaffold Lab

You are scaffolding a new lab exercise for this Node.js course repository. Follow these steps precisely.

## Step 1: Determine the lab name

Use the argument provided by the user as the lab folder name (for example, `typescript-generics`). If no argument was given, ask the user for the lab name before proceeding.

The lab name must:
- Be lowercase with hyphens only
- Match the technology or topic being taught
- Not already exist under `labs/`

## Step 2: Create the lab folder structure

Create the following files:

```
labs/<lab-name>/
  README.md
  package.json

solutions/<lab-name>/
  README.md        (brief note: "See labs/<lab-name>/README.md for the full brief")
  package.json
  tsconfig.json
  src/
    index.ts       (empty placeholder)
```

## Step 3: Write the lab README

Use the [lab README template](./lab-readme-template.md) as the basis for `labs/<lab-name>/README.md`.

Replace every `{{PLACEHOLDER}}` with appropriate content for the topic. Follow these rules:

- Objectives must be written as outcomes: "By the end of this lab, you will be able to..."
- Exercises must be numbered starting from Exercise 1
- Sub-tasks must be numbered as 1.1, 1.2, etc.
- All instructions must use imperative form: "Create a function...", "Add a route..."
- Never use emojis anywhere in the file
- Shell commands must use `npm` syntax

## Step 4: Write the package.json files

Use the [package.json template](./package-template.json) for both the lab and solution folders.

Replace `{{LAB_NAME}}` with the actual lab name. Ensure both files include:
- `"test"` script using `vitest` or `jest` as appropriate for the topic
- `"start"` or `"dev"` script

Minimum dependency versions:
- TypeScript: `^5.0.0`
- `@types/node`: `^20.0.0`
- `ts-node`: `^10.9.0`

## Step 5: Write the tsconfig.json

The solution `tsconfig.json` must enable strict mode:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"]
}
```

## Step 6: Confirm

Report back to the user with:
- A list of all files created
- Any decisions made (for example, which test framework was chosen)
- Any placeholders still remaining in the README that the user needs to fill in
