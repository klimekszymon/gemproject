# Task 10: Asset Management (Boilerplates and Templates)

In this final foundational lesson, we explore the `assets/` directory. Unlike `references/` (which are read into context) or `scripts/` (which are executed), `assets/` are files intended to be **copied, modified, or served** as part of the agent's output.

---

## Part 1: Educational - What are Assets?

Assets are static or boilerplate files that the agent uses to "jumpstart" a project. They help maintain consistency and save tokens by avoiding the need for the agent to generate common code from scratch every time.

### Why use Assets?
1.  **Consistency**: Ensure every new project starts with the exact same license, config, or directory structure.
2.  **Richness**: Store binary files like images, icons, or PDF templates that an LLM cannot "write" but can "move."
3.  **Efficiency**: Copying a 500-line boilerplate file from `assets/` is faster and more reliable than the agent typing it out.

### Assets vs. References
- **References**: "Read this so you know how to do the job." (e.g., `naming-conventions.md`)
- **Assets**: "Use this file in the final result." (e.g., `MIT-LICENSE.txt` or `webpack.config.js`)

---

## Part 2: Practical - Adding Boilerplate to the `skill-creator`

We will update our existing `skill-creator` skill to include a standard `LICENSE` file as an asset, so every new skill it scaffolds automatically gets a license.

### 1. Create the Asset
Navigate to your `skill-creator` skill and create an `assets/` folder if it doesn't exist:
```bash
mkdir -p skills/skill-creator/assets
```

Create a generic license template at `skills/skill-creator/assets/LICENSE.template`:
```text
Copyright (c) 2026 Team Agent Registry

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files...
[Rest of MIT License]
```

### 2. Update the Scaffolding Script
Modify `skills/skill-creator/scripts/init-skill.js` to copy this asset when a new skill is created.

*Hint: Use `fs.copyFileSync` to move the template from the skill's asset folder to the new skill's destination.*

---

## Part 3: Referencing Assets in SKILL.md

When you write a skill that uses assets, you must tell the agent where they are.

**Example SKILL.md entry:**
```markdown
## Web App Scaffolding
When starting a new React project:
1. Copy all files from `assets/react-boilerplate/` to the root directory.
2. Update the `name` field in `package.json`.
```

By explicitly mentioning the path, the agent knows it has "physical" files it can work with using standard shell commands (`cp`, `mv`).

---

## Self-Check: Milestone 10
- [ ] Do you understand the difference between a `reference` and an `asset`?
- [ ] Does your `skill-creator` now have a dedicated `assets/` folder?
- [ ] Could you create a "Logo" skill that provides a brand-approved `.png` from its assets?

**Congratulations!** You have completed the foundational track for AI Agent Skill development. You are now ready to build production-grade, automated skill registries.
