# Task 11: Orchestration & Chaining (Multi-Skill Workflows)

In this lesson, you will learn how to design skills that **handoff** to each other, creating complex workflows that a single skill cannot (and should not) handle alone.

---

## Part 1: Educational - The Power of Modular Skills

Large, "monolithic" skills are hard to maintain and expensive for the context window. The best architects build **Micro-Skills** and teach them how to collaborate.

### Why Chain Skills?
1.  **Separation of Concerns**: A `git-helper` skill shouldn't also be a `code-reviewer`.
2.  **Context Efficiency**: Only load the specific logic needed for each stage of a task.
3.  **Recursion**: A skill can "trigger" another by explicitly mentioning its triggering description in its instructions.

---

## Part 2: Practical - Designing a Chained Handoff

Imagine a "Release Manager" workflow:
1.  **Skill A (Changelog)**: Generates a summary of changes from git logs.
2.  **Skill B (Versioner)**: Increments the version in `package.json`.
3.  **Skill C (Publisher)**: Creates a git tag and pushes to the registry.

### Instructions for Chaining:
In `SKILL.md` for Skill A, you might include:
> "Once the changelog is generated, **activate the `versioner` skill** to update the project metadata."

By explicitly naming the next skill, you guide the agent's internal reasoning (Chain-of-Thought) to look for the next specialized toolset.

---

## Self-Check: Milestone 11
- [ ] Can you identify a workflow in your current project that could be split into two linked skills?
- [ ] Do your instructions clearly state *when* to hand off and *which* skill to hand off to?

**Next Task: Task 12 - Secrets and Environments.**
