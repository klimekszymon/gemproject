# AI Agent Skill Registry & Educational Platform Plan

This document outlines the research, learning path, and development strategy for creating a team-based AI agent skill registry.

---

## 1. Research: Understanding AI Agent Skills

AI Agent Skills are modular packages that extend an agent's capabilities with specialized knowledge, workflows, and tools. They act as "onboarding guides" for specific domains.

### Core Components of a Skill
- **`SKILL.md`**: The heart of the skill. Contains metadata (name/description) and instructions.
- **`scripts/`**: Executable code (Node.js, Python, Bash) for deterministic tasks.
- **`references/`**: Documentation, schemas, or policies loaded into context only when needed.
- **`assets/`**: Static files like templates, icons, or boilerplate code used in outputs.

### The 7-Step Creation Lifecycle
1. **Understand**: Identify concrete use cases and triggers.
2. **Plan**: Determine required scripts, references, and assets.
3. **Initialize**: Scaffold the skill directory using standard tools.
4. **Edit**: Implement logic and write high-quality instructions in `SKILL.md`.
5. **Package**: Validate and compress the skill into a `.skill` file (ZIP format).
6. **Install**: Deploy to workspace or user scope.
7. **Iterate**: Refine based on real-world performance.

---

## 2. Learning Plan: From Scratch to Skill Expert

This plan is designed to take a team member from zero to a competent skill developer.

### Phase 1: Foundations (Day 1)
- [ ] **What are Skills?**: Read the high-level overview of how skills extend agent logic without bloating the core model.
- [ ] **Anatomy Tour**: Explore an existing skill folder to see how `SKILL.md` interacts with the `scripts/` folder.
- [ ] **The Trigger Mechanism**: Learn how the `description` field in frontmatter acts as the primary trigger.

### Phase 2: Hands-on Basics (Day 2)
- [ ] **Hello World Skill**: Use the `init_skill.cjs` tool to create a basic "Greeting" skill.
- [ ] **Manual Installation**: Package the skill and install it locally using `gemini skills install`.
- [ ] **First Interaction**: Trigger the skill in a chat and observe how the agent uses the `SKILL.md` instructions.

### Phase 3: Advanced Logic (Day 3-5)
- [ ] **Scripting for Agents**: Write a Python or Node.js script that performs a specific task (e.g., parsing a JSON file) and learn how to make its output "agent-friendly."
- [ ] **Progressive Disclosure**: Learn to split large documentation into `references/` files to save context tokens.
- [ ] **Best Practices**: Study the "Imperative Form" for instructions and "Single-line" description constraints.

---

## 3. Repository Development Plan (Educational Purpose)

The goal is to create a "Skill Registry" repo that serves as both a library of reusable tools and a learning hub.

### Repository Structure
```text
skill-registry/
├── tutorials/               # Step-by-step guides (Markdown)
├── templates/               # Boilerplate for different skill types (script-heavy vs reference-heavy)
├── skills/                  # The registry of production-ready skills
│   ├── git-workflow/        # Standardized team git processes
│   ├── code-reviewer/       # Logic for project-specific linting/styling
│   └── architecture-guide/  # Reference-heavy skill for system design
└── scripts/                 # Automation for the registry (validation, packaging)
```

### Development Milestones
1. **Scaffolding (Milestone 1)**: Set up the folder structure and create the first "Team Standards" skill.
2. **Registry Automation (Milestone 2)**: Create a script that scans the `skills/` directory and generates a `README.md` index of all available skills.
3. **CI/CD Integration (Milestone 3)**: Implement a GitHub Action (or similar) that runs `validate_skill.cjs` on every Pull Request to ensure quality.
4. **Educational Content (Milestone 4)**: Populate the `tutorials/` folder with "How-to" guides based on the Learning Plan in Section 2.

### Success Metrics
- **Discoverability**: Can a new team member find a skill for their task in < 30 seconds?
- **Contribution**: Is the process of adding a new skill documented well enough for a junior dev to follow?
- **Utility**: Does the skill actually reduce the number of turns required to complete common tasks?
