---
description: "Check whether a solution folder is healthy: correct structure, defined scripts, and up-to-date dependencies. Produces a pass/fail report. Read-only - does not modify any files."
argument-hint: "Path to solution folder, e.g. solutions/typescript-fastify-crud"
agent: "agent"
---

# Solution Health Check

You are performing a **read-only** health check on a solution folder in this course repository. Do not modify any files. Produce a structured report at the end.

## Step 1: Identify the folder

Use the folder path provided as the argument. If none was given, ask the user which solution folder to check.

## Step 2: Read package.json

Read the `package.json` in the solution folder and check:

- Is there a `test` script defined under `scripts`?
- Is there a `start` or `dev` script defined under `scripts`?
- Collect all package names and version strings from both `dependencies` and `devDependencies`.

## Step 3: Check folder structure

Check whether the following exist inside the solution folder:

- A `src/` directory
- A `tests/` or `test/` directory
- A `tsconfig.json` file

## Step 4: Check TypeScript config

If `tsconfig.json` exists, read it and check whether `"strict": true` is set under `compilerOptions`.

## Step 5: Check dependency versions

Compare the versions found in `package.json` against these minimums. Only check packages that are actually present.

| Package | Minimum Version |
|---------|----------------|
| `typescript` | `5.0.0` |
| `@types/node` | `20.0.0` |
| `@playwright/test` | `1.43.0` |
| `fastify` | `4.24.0` |
| `vitest` | `1.0.0` |
| `zod` | `3.22.0` |
| `axios` | `1.6.0` |
| `@apollo/server` | `4.9.0` |

To compare: strip any leading `^` or `~` from the version string and compare major.minor numbers. A package passes if its declared major.minor is greater than or equal to the minimum.

## Step 6: Produce the report

Output the report using exactly this format:

```
SOLUTION HEALTH REPORT: <folder path>

STRUCTURE:
  src/ directory        : PASS / MISSING
  tests/ directory      : PASS / MISSING
  tsconfig.json         : PASS / MISSING
  strict mode           : PASS / MISSING / NOT CHECKED (no tsconfig)

SCRIPTS:
  test script           : PASS / MISSING
  start or dev script   : PASS / MISSING

DEPENDENCIES:
  <package>@<current>   : PASS (meets ^<minimum>) / FLAG (below minimum ^<minimum>)

SUMMARY:
  Status: PASS / NEEDS ATTENTION
  Issues found: <count>
  Details: <brief description of any flagged items, or "All checks passed">
```
