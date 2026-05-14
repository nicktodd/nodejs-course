# Copilot Tooling Demos

This folder contains examples of how GitHub Copilot features can be used to help maintain this course repository. There are three demos, each illustrating a different Copilot primitive.

---

## Demo 1: Skill (File Instructions) — Lab Instruction Reviewer

**File**: [.github/instructions/lab-reviewer.instructions.md](.github/instructions/lab-reviewer.instructions.md)

### What it does

This is a **file instruction** — a skill that Copilot loads automatically whenever a lab `README.md` is in context. It teaches Copilot:

- The expected format of a lab README (numbered exercises, prerequisites, imperative phrasing)
- The minimum library versions this course currently targets
- The no-emoji, `SUCCESS:`/`ERROR:` console log style conventions

### How to run the demo

1. Open any lab README, for example `labs/playwright-core/README.md`
2. Open GitHub Copilot Chat
3. Ask: `Review this lab README for accuracy against current library versions`

Copilot will produce a structured `PASS` / `FLAG` / `RECOMMENDATIONS` report without any extra context-setting from you.

### Why this is useful

When library versions change (e.g. Playwright releases a new major version), a single update to the instruction file updates the knowledge Copilot uses when reviewing all lab files.

---

## Demo 2: Agent Prompt — Solution Health Checker

**File**: [.github/prompts/check-solution-health.prompt.md](.github/prompts/check-solution-health.prompt.md)

### What it does

This is a **reusable agent prompt** that checks whether a solution folder is in good health. It reads the folder's files (read-only) and produces a structured report covering:

- Folder structure (`src/`, `tests/`, `tsconfig.json`)
- TypeScript strict mode
- Defined npm scripts (`test`, `start`/`dev`)
- Dependency versions against course minimums

### How to run the demo

1. Open GitHub Copilot Chat in agent mode
2. Type `/check-solution-health` and press Enter (or open the prompt file and click the play button)
3. When prompted, provide a solution folder path, for example: `solutions/typescript-fastify-crud`

Copilot will read the relevant files and produce a `SOLUTION HEALTH REPORT`.

### Why this is useful

Before a course delivery, an instructor can quickly check every solution folder to catch missing test scripts, outdated dependencies, or missing TypeScript strict mode — without opening each project manually.

---

## Demo 3: Agent Prompt with GitHub MCP — File Dependency Issues

**File**: [.github/prompts/file-dependency-issues.prompt.md](.github/prompts/file-dependency-issues.prompt.md)

### What it does

This is an **agent prompt that uses the GitHub MCP server** to take action beyond just reading files. It:

1. Scans one or more solution `package.json` files for outdated dependencies
2. Searches existing GitHub Issues to avoid duplicates
3. Creates a GitHub Issue for each outdated package it finds

### Prerequisites

The GitHub MCP server must be configured in your VS Code Copilot setup. If it is not yet configured, see the [GitHub MCP server documentation](https://github.com/github/github-mcp-server).

### How to run the demo

1. Open GitHub Copilot Chat in agent mode
2. Type `/file-dependency-issues solutions/typescript-fastify-crud solutions/playwright-core`
3. Copilot will scan both folders, check for open duplicate issues, and create GitHub Issues for anything outdated

### Why this is useful

This demonstrates how Copilot can move beyond answering questions and actually interact with external systems (GitHub) to do real maintenance work. The same pattern could be extended to file issues for missing tests, broken links in lab instructions, or any other automated quality check.

---

## Summary

| Demo | File | Copilot Feature | Triggered by |
|------|------|----------------|-------------|
| Lab Instruction Reviewer | `.github/instructions/lab-reviewer.instructions.md` | File Instructions (Skill) | Opening a lab README.md |
| Solution Health Checker | `.github/prompts/check-solution-health.prompt.md` | Agent Prompt | `/check-solution-health` |
| File Dependency Issues | `.github/prompts/file-dependency-issues.prompt.md` | Agent Prompt + GitHub MCP | `/file-dependency-issues` |
