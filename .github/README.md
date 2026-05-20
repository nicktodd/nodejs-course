# .github Folder - GitHub Copilot Configuration

This folder contains GitHub Copilot configuration files that control how the AI assistant behaves in this repository. It is intentionally structured as a learning example of modern Copilot customisation.

---

## File and Folder Reference

### `copilot-instructions.md`

**What it is:** Repository-wide instructions that Copilot includes automatically in every conversation in this workspace.

**When Copilot reads it:** Always — no trigger needed. Any chat or inline suggestion in this repo will have these instructions in context.

**What to put here:** Project-wide conventions that should always apply, such as code style rules, naming conventions, technology choices, and tone guidelines.

**This repo uses it for:** Enforcing the no-emoji policy, TypeScript conventions, and reminding Copilot that this is an educational codebase.

> Note: The canonical location is `.github/copilot-instructions.md`. 

---

### `instructions/` folder

**What it is:** Scoped instruction files (`.instructions.md`) that Copilot applies automatically when working on files that match the `applyTo` pattern in the frontmatter.

**When Copilot reads it:** When the file being edited matches the `applyTo` glob pattern, or when manually referenced with `#` in the chat.

**Frontmatter fields:**

```yaml
---
description: "Human-readable explanation shown in the UI"
applyTo: "glob/pattern/**/*.md"
---
```

**What to put here:** Conventions that only apply to a subset of files — for example, formatting rules for lab READMEs, API handler conventions, or test file standards.

**This repo uses it for:** `lab-reviewer.instructions.md` — rules for reviewing and writing lab README files, applied automatically whenever a `labs/**/README.md` file is in context.

---

### `prompts/` folder

**What it is:** Reusable prompt files (`.prompt.md`) that act as saved, parameterised commands you can invoke from the Copilot Chat UI.

**When Copilot reads it:** When you select the prompt from the chat input using the `/` command or the paperclip attach menu.

**Frontmatter fields:**

```yaml
---
description: "What this prompt does"
argument-hint: "Description of the argument the prompt expects"
mode: "agent"    # "ask" (default), "edit", or "agent" for multi-step agentic tasks
tools:
  - read_file
  - run_in_terminal
  - mcp_github_create_issue   # MCP tools can be listed here too
---
```

**What to put here:** Multi-step workflows that you run repeatedly, such as auditing a folder, generating a report, or scaffolding a new lab. Think of these as reusable scripts written in natural language.

When `mode: "agent"` is set, the prompt runs with full tool access. You can restrict this by listing specific tools in the `tools` array — including any MCP server tools that are configured in your workspace. For example, the `file-dependency-issues` prompt in this repo uses GitHub MCP tools to create issues directly from the prompt.

**This repo uses it for:**
- `check-solution-health.prompt.md` — reads a solution folder and produces a pass/fail health report
- `file-dependency-issues.prompt.md` — scans solution folders for outdated dependencies and files GitHub Issues

---

### `agents/` folder

**What it is:** Custom agent files (`.agent.md`) that define a specialised persona and toolset for Copilot Chat. Custom agents were previously known as custom chat modes — `.chatmode.md` files in a `chatmodes/` folder. That format is now deprecated; the current format is `.agent.md` in `.github/agents/`.

**When Copilot reads it:** When you switch to that agent using the agent picker in the Copilot Chat panel.

**Frontmatter fields:**

```yaml
---
description: "What this agent does and when to use it"
tools:
  - read_file
  - create_file
  - run_in_terminal
  # list only the tools this agent should have access to
  # MCP tools can also be listed here, e.g. mcp_github_create_issue
---
```

**What to put here:** Specialised workflows where you want Copilot to behave as a focused assistant with a defined set of tools and responsibilities. Restricting the `tools` list keeps the agent focused and prevents unintended side effects. Agents also support `handoffs` — buttons that appear after a response to transition to another agent with pre-filled context.

**This repo uses it for:**
- `lab-author.agent.md` — a Lab Author assistant for creating and updating lab exercises, with write access to the workspace
- `solution-reviewer.agent.md` — a read-only auditor that checks solution folders for health and standards compliance

---

## How These Files Work Together

```
.github/
  copilot-instructions.md        <- Always active; sets global conventions
  instructions/
    lab-reviewer.instructions.md <- Auto-applied when editing labs/**/README.md
  prompts/
    check-solution-health.prompt.md    <- Run on demand to audit a solution folder
    file-dependency-issues.prompt.md   <- Run on demand to file GitHub Issues
  agents/
    lab-author.agent.md           <- Switch to this agent when writing/updating labs
    solution-reviewer.agent.md    <- Switch to this agent for read-only audits
  skills/
    scaffold-lab/
      SKILL.md                   <- Skill definition (name, description, instructions)
      lab-readme-template.md     <- Supporting resource referenced by the skill
      package-template.json      <- Supporting resource referenced by the skill
```

A typical workflow for a course maintainer might look like:

1. Run `/scaffold-lab <name>` to create the lab and solution folder structure using the **scaffold-lab skill**
2. Switch to the **Lab Author** agent to write and refine the lab README
3. The **lab-reviewer instructions** are applied automatically as you work on `labs/**/README.md` files
4. Run the **check-solution-health prompt** against the solution folder to verify it is ready
5. Run the **file-dependency-issues prompt** periodically to track outdated packages via GitHub Issues

---

### `skills/` folder

**What it is:** Agent skill directories, each containing a `SKILL.md` file that defines a reusable, on-demand capability. Skills are an open standard ([agentskills.io](https://agentskills.io)) and work across VS Code, GitHub Copilot CLI, and the Copilot cloud agent.

**When Copilot reads it:** On demand — either automatically when a user's request matches the skill's description, or manually when invoked as a `/skill-name` slash command.

**Frontmatter fields:**

```yaml
---
name: skill-name              # must match the parent directory name
description: "What this skill does and when to use it. Be specific."
argument-hint: "[optional hint shown in the chat input]"
---
```

**What to put here:** Specialised, reusable procedures that you want Copilot to follow consistently — things like scaffolding a component, running a debugging procedure, or generating structured reports. Unlike prompt files, skills can include supporting resources (scripts, templates, examples) in the same directory, and you reference them with relative Markdown links in the `SKILL.md` body.

**Skill types:**

| Type | Location | Who authors it |
|---|---|---|
| Project skill | `.github/skills/` | Repo maintainer — available to anyone who clones the repo |
| Personal skill | `~/.copilot/skills/` | Individual developer — private to their machine |
| Extension skill | Shipped inside a VS Code extension | Extension developer — installed via the marketplace |

**This repo uses it for:** `scaffold-lab` — scaffolds a new lab exercise including the README, solution folder, `package.json`, and `tsconfig.json`. Invoke it with `/scaffold-lab typescript-generics`.

---

## Further Reading

- [Customise AI in VS Code — overview](https://code.visualstudio.com/docs/copilot/customization/overview)
- [Custom instructions](https://code.visualstudio.com/docs/copilot/customization/custom-instructions)
- [Reusable prompt files](https://code.visualstudio.com/docs/copilot/customization/prompt-files)
- [Agent skills](https://code.visualstudio.com/docs/copilot/customization/agent-skills)
- [Custom agents](https://code.visualstudio.com/docs/copilot/customization/custom-agents) (previously "chat modes")
- [Agent Skills open standard](https://agentskills.io/)
