---
description: "Scan one or more solution folders for outdated dependencies and file GitHub Issues to track them. Uses the GitHub MCP server to create issues. Read-only with respect to source files."
argument-hint: "One or more solution folder paths to scan, e.g. solutions/typescript-fastify-crud solutions/playwright-core"
agent: "agent"
---

# File GitHub Issues for Outdated Dependencies

You will scan solution folders in this course repository for outdated dependencies and create GitHub Issues to track them. You do **not** modify any source files.

## Step 1: Identify folders to scan

Use the folder paths provided as arguments. If none were given, ask the user which solution folders to scan.

## Step 2: Identify the GitHub repository

Use the GitHub MCP tools to determine the owner and repository name for the current workspace. If you cannot determine it automatically, ask the user to provide `owner/repo`.

## Step 3: Scan each folder for outdated dependencies

For each folder, read its `package.json`. If no `package.json` exists in a folder, skip it and note this in the summary.

Check all packages in both `dependencies` and `devDependencies` against these minimums:

| Package | Minimum Version | Reason |
|---------|----------------|--------|
| `typescript` | `5.0.0` | TypeScript 4.x is end-of-life |
| `@types/node` | `20.0.0` | Node 18 reached EOL in April 2025 |
| `@playwright/test` | `1.43.0` | Earlier versions have known test runner issues |
| `fastify` | `4.24.0` | Security patches only available in 4.24+ |
| `vitest` | `1.0.0` | Vitest 0.x is end-of-life |
| `zod` | `3.22.0` | Type inference improvements in 3.22 |
| `axios` | `1.6.0` | Security fix release |
| `@apollo/server` | `4.9.0` | `apollo-server` 3.x is end-of-life; package renamed to `@apollo/server` |

A package is outdated if its declared version (after stripping `^` or `~`) has a major or minor version below the minimum.

## Step 4: Check for duplicate issues

Before creating any issue, use the GitHub MCP search tools to check whether an open issue with the same title already exists. Skip creation if a duplicate is found and note it in the summary.

## Step 5: Create a GitHub Issue for each outdated package

For each outdated package, create one issue using the GitHub MCP tools.

**Title format**: `Outdated dependency: <package> in <folder>`

**Body format**:

```
## Outdated Dependency Report

**Folder**: `<relative folder path>`
**Package**: `<package name>`
**Current version in package.json**: `<version as declared>`
**Recommended minimum**: `<minimum version>`

### Reason

<Copy the reason from the table above>

### Action Required

Update `package.json` to use at least `<package>@<minimum version>`, then run `npm install` and verify the solution still works correctly.
```

Apply `dependency` and `maintenance` labels if they exist in the repository. If they do not exist, omit labels rather than creating them.

## Step 6: Report summary

After processing all folders, produce this summary:

```
DEPENDENCY SCAN SUMMARY

Folders scanned  : <list>
Issues found     : <count>
Issues created   : <count>
Duplicates skipped: <count>

GitHub Issues created:
  - #<number>: <title>

No issues in:
  - <folders where all checked packages passed>

Skipped (no package.json):
  - <folders that were skipped>
```
