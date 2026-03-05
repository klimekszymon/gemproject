# Task 2: Initializing and Installing Your First Skill

Great work on Task 1! Now that you understand what an Agent Skill is, it's time to build and install one. In this task, you will create a "Knowledge Engine" skill from scratch and learn how to deploy it to your local environment.

---

## Part 1: Educational - The Lifecycle of a Skill

Creating a skill isn't just about writing code; it's a 3-step process of **Scaffolding**, **Packaging**, and **Installation**.

### 1. Scaffolding
Every skill needs a dedicated folder and a `SKILL.md` file. While you can do this manually with `mkdir`, standardized templates ensure consistency across the team.

### 2. Packaging (The `.skill` format)
Under the hood, an Agent Skill is just a folder structure. However, for distribution, it is often packaged into a `.skill` file (which is a standard ZIP archive) to make it easy to share and version.

### 3. Local Installation
To make a skill available to your Gemini CLI, you must "register" it. This is done using the `gemini skills install` command. Once installed, the CLI knows where to find the skill's instructions and scripts.

---

## Part 2: Practical - Your First "Knowledge Engine"

You are going to create a skill that provides info about the **Team API Standards**.

### 1. Create the Directory Structure
Create a new skill folder:
```bash
mkdir -p skills/api-standards/references
```

### 2. Create the `SKILL.md`
Create `skills/api-standards/SKILL.md` with the following content:
```markdown
---
name: api-standards-guide
description: "Expert guidance on Team API naming conventions, versioning, and error handling."
---

# Instructions
When asked about API standards or best practices:
1. Refer to the files in the `references/` folder.
2. Provide precise rules for naming, versioning, or error handling.
3. If a request is ambiguous, ask the user which part of the standards they need help with.
```

### 3. Add a Reference Document
Create `skills/api-standards/references/naming.md`:
```markdown
# API Naming Standards
1. Use camelCase for JSON properties.
2. Endpoints should be plural (e.g., `/users`, not `/user`).
3. Use kebab-case for URL paths.
```

### 4. Install the Skill
Run the installation command in your terminal:
```bash
gemini skills install ./skills/api-standards
```

---

## Self-Check: Milestone 2
- [ ] Did the `gemini skills install` command succeed?
- [ ] Try asking: *"What are the naming conventions for our APIs?"*
- [ ] Does the agent respond using the data from `naming.md`?

*Next Task: Task 3 - Adding Dynamic Scripts for Advanced Logic.*
