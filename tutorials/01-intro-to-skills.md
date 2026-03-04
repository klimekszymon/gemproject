# Task 1: Foundations of AI Agent Skills

Welcome to the first task of the Team Platform Skill Registry. In this guide, you will learn the fundamental concepts of AI Agent Skills and how they interact with the terminal.

---

## Part 1: Educational - What is an Agent Skill?

An **Agent Skill** is a modular package that extends the capabilities of the Gemini CLI. Unlike general-purpose prompting, a skill provides specialized logic, domain-specific knowledge, and deterministic tools that are only loaded when needed.

### The Anatomy of a Skill
Every skill follows a standard structure:

1.  **`SKILL.md`**: The brain of the skill. It contains:
    -   **Frontmatter (YAML)**: Metadata like the skill's name and a `description`.
    -   **Instructions**: High-level behavioral guidelines for the agent.
2.  **`scripts/`**: A folder for executable code (Python, Node.js, Bash). This is where the "heavy lifting" happens.
3.  **`references/`**: Static documentation or data files. These are loaded into the agent's context only when the skill is active, saving tokens.
4.  **`assets/`**: Static files like templates or boilerplate code that the skill might use to generate outputs.

### The Trigger Mechanism
The agent decides to use a skill based on its **Description** in the `SKILL.md` frontmatter. If your request in the terminal matches the intent described in a skill's metadata, the agent "activates" that skill and follows its specific instructions.

---

## Part 2: Practical - Your First Interaction

To complete this task, you will explore the conceptual "Hello World" of skills.

### 1. Explore a Skill Folder
Look at the proposed structure for a basic skill:
```text
skills/hello-world/
├── SKILL.md
└── scripts/
    └── greet.js
```

### 2. Read the `SKILL.md`
If you were to open `SKILL.md`, it would look like this:
```markdown
---
name: greeter
description: "A skill that provides a personalized greeting to the user."
---

# Instructions
When the user asks for a greeting:
1. Call the `greet.js` script to get a timestamped message.
2. Present the message clearly to the user.
```

### 3. Triggering the Skill
In a real-world scenario, you would trigger this skill by simply saying:
> "Hey, can you give me a greeting?"

The agent sees the word "greeting," matches it to the `greeter` skill's description, and executes the `greet.js` script.

---

## Self-Check: Milestone 1
- [ ] Do I understand the difference between `SKILL.md` and `references/`?
- [ ] Can I identify what part of the skill acts as the "trigger"?
- [ ] Do I know where to put executable logic (e.g., a Python script)?

*Next Task: Task 2 - Scaffolding and Initializing your first Skill.*
