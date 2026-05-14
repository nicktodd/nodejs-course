---
description: "Use when reviewing, updating, or checking lab README files for accuracy, completeness, or outdated instructions. Covers lab format conventions, expected technology versions, and course style guidelines."
applyTo: "labs/**/README.md"
---

# Lab Instruction Review Guidelines

## Lab README Format

Every lab README should follow this structure:

1. **Objectives** - bulleted learning goals
2. **Prerequisites** - assumed knowledge or prior labs
3. **Numbered exercises** (Exercise 1, Exercise 2, ...)
   - Sub-tasks numbered as 1.1, 1.2, etc.
4. **Step-by-step requirements** written in imperative form ("Create a function...", "Add a route...")
5. **Code snippets** showing starter/sample TypeScript where helpful
6. **Shell commands** using `npm` syntax (not `yarn` or `pnpm` unless intentional)

## Technology Version Baselines

When reviewing lab instructions, flag anything that conflicts with these minimum versions:

| Technology | Minimum Version | Notes |
|------------|----------------|-------|
| TypeScript | `^5.0.0` | Strict mode should be enabled |
| `@types/node` | `^20.0.0` | Node 18 reached EOL in April 2025 |
| `ts-node` | `^10.9.0` | |
| `@playwright/test` | `^1.43.0` | |
| `fastify` | `^4.24.0` | |
| `vitest` | `^1.0.0` | |
| `zod` | `^3.22.0` | |
| `axios` | `^1.6.0` | |
| `@apollo/server` | `^4.9.0` | `apollo-server` (v3) is end-of-life; use `@apollo/server` |

## Review Checklist

When asked to review a lab README, check for:

- [ ] Outdated CLI commands (e.g., deprecated `ts-node` flags, changed `tsc --init` options)
- [ ] API references that no longer exist in the current library version
- [ ] Package names that have been renamed (e.g., `apollo-server` -> `@apollo/server`)
- [ ] Version numbers in `npm install` commands that fall below the baselines above
- [ ] Import syntax that changed between major versions (ES module vs CommonJS)
- [ ] Instructions referencing features removed in newer versions
- [ ] Missing steps that a student would encounter (e.g., `npm install` not mentioned before `npm run dev`)
- [ ] Tasks referencing files that do not exist in the lab starter folder

## Style Guidelines

Follow the repo-wide conventions in all lab content:

- No emojis in any text, headings, or instructions
- Use `SUCCESS:`, `ERROR:`, `TESTING:` prefixes in console output examples (not emoji equivalents)
- Standard Markdown formatting: headers, bullet points, numbered lists, fenced code blocks
- Shell commands in fenced code blocks with `bash` language tag
- TypeScript code in fenced code blocks with `typescript` language tag
- Imperative phrasing for tasks: "Create a file..." not "You should create a file..."

## Output Format When Flagging Issues

Produce a structured review using this format:

```
REVIEW: labs/<folder>/README.md

PASS:
- <items that look correct>

FLAG:
- Exercise X, Task Y.Z: <description of issue and suggested fix>

RECOMMENDATIONS:
- <general improvements that are not blocking but worth considering>
```
