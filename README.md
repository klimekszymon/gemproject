# 🛠️ AI Agent Skill Registry & Learning Platform

This repository is a modular ecosystem for extending AI agent capabilities. It serves two purposes:
1.  **A Skill Registry**: A central library of specialized, team-approved agent skills (Git workflows, API standards, etc.).
2.  **A Learning Platform**: A 3-phase curriculum to train team members from Skill Beginners to Platform Architects.

---

## 🛤️ Getting Started as a Learner

If you are here to learn how to build AI Agent Skills, start with the **Official Learning Path**:

👉 **[Start the Tutorials here](./tutorials/README.md)**

The curriculum is split into:
- **01: Foundations**: Creation, Scripts, and Packaging.
- **02: Advanced Automation**: Meta-Skills, Registry Automation, and CI/CD.
- **03: Mastery Ops**: Orchestration, Security, and Prompt Engineering.

---

## 🗃️ Available Skills (The Registry)

Browse our library of production-ready skills to see what your agents can do:

👉 **[View the Skill Registry](./skills/README.md)**

### Featured Skills:
- **`skill-creator`**: A meta-skill that automatically scaffolds new skills following our team standards.
- **`git-brutal-review`**: Provides honest, high-signal feedback on technical decisions.
- **`logo-provider`**: Distributes brand-approved assets and official team graphics.

---

## 🏗️ Project Architecture

- **`/skills`**: The home for all individual skill packages.
- **`/tutorials`**: The tiered learning path (Foundations, Advanced, Mastery).
- **`/scripts`**: Automation for the registry (indexing, validation, and scaffolding).
- **`GEMINI.md`**: The primary instruction file for Gemini CLI agents interacting with this repo.

---

## ⚙️ Automation Tools

We maintain high standards through automated scripts:
- **`generate-registry-index.js`**: Rebuilds the registry README automatically.
- **`validate-skill.js`**: Audits a skill folder for naming, structure, and quality standards.

---

## 🤝 Contributing

To add a new skill to the registry:
1.  Follow the **[Phase 1 Tutorials](./tutorials/01-foundations/01-intro-to-skills.md)**.
2.  Use the `skill-creator` to scaffold your folder.
3.  Ensure your skill passes the `validate-skill.js` quality gate.
4.  Submit a PR!
