# 🛠️ AI Agent Skill Registry & Learning Platform

This repository is a modular ecosystem for extending AI agent capabilities. It serves two purposes:
1.  **A Skill Registry**: A central library of specialized, team-approved agent skills (Git workflows, API standards, etc.).
2.  **A Learning Platform**: A multi-phase curriculum to train team members from Skill Beginners to Platform Architects.

---

## 🛤️ The Learning Path (Current Progress)

If you are here to learn how to build AI Agent Skills, follow our **Official Learning Path**:

👉 **[Start the Tutorials here](./tutorials/README.md)**

The curriculum is tiered for progressive mastery:
- **✅ Phase 1: Foundations**: Creation, Scripts, and Packaging.
- **✅ Phase 2: Advanced Automation**: Meta-Skills, Registry Automation, and CI/CD.
- **✅ Phase 3: Mastery Ops**: Orchestration, Security, and Prompt Engineering.
- **🚧 Phase 4: Enterprise Orchestration (In Progress)**: Scaling to a collaborative agent network.

---

## 🗃️ Available Skills (The Registry)

Browse our library of production-ready skills to see what your agents can do:

👉 **[View the Skill Registry](./skills/README.md)**

### Featured Skills:
- **`git-helper`**: Manages releases, conventional commits, and automated tagging.
- **`prompt-engineer-pro`**: Audits and refines instructions for other skills.
- **`skill-creator`**: A meta-skill that automatically scaffolds new skills following our team standards.

---

## 🏗️ Project Architecture

- **`/skills`**: The home for all individual skill packages.
- **`/tutorials`**: The tiered learning path (Foundations, Advanced, Mastery, Enterprise).
- **`/scripts`**: Automation for the registry (indexing, validation, and scaffolding).
- **`GEMINI.md`**: The primary instruction file for Gemini CLI agents interacting with this repo.

---

## ⚙️ Automation Tools

We maintain high standards through automated scripts:
- **`generate-registry-index.js`**: Rebuilds the registry README automatically.
- **`validate-skill.js`**: Audits a skill folder for naming, structure, and quality standards.

---

## 🤝 Roadmap & Contribution

We are actively expanding into **Phase 4-6**, covering everything from DevOps mastery to self-healing skills.

👉 **[View the Future Roadmap](./tutorials/FUTURE_BLOCKS.md)**

To add a new skill to the registry:
1.  Follow the **[Phase 1 Tutorials](./tutorials/01-foundations/01-intro-to-skills.md)**.
2.  Use the `skill-creator` to scaffold your folder.
3.  Ensure your skill passes the `validate-skill.js` quality gate.
4.  Submit a PR!
