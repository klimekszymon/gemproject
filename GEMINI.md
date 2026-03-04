# Project Overview: AI Agent Skill Registry & Educational Platform Plan

This directory serves as the foundational planning hub for an AI Agent Skill Registry. The goal is to create a modular system for extending AI agent capabilities through specialized "Skills" and to provide an educational roadmap for team members to become skill developers.

## Directory Overview

The project is currently in its planning phase, focusing on:
1.  **Skill Definition**: Understanding the modular components of AI Agent Skills (SKILL.md, scripts, references, assets).
2.  **Learning Path**: A structured 3-phase plan to take team members from beginners to skill experts.
3.  **Repository Strategy**: A blueprint for a "Skill Registry" that includes tutorials, templates, and production-ready skills.

## Key Files

-   **`skill-for-team-platform.md`**: The primary document outlining the platform's vision. It covers:
    -   **Research**: The 7-step creation lifecycle for skills.
    -   **Learning Plan**: A day-by-day training schedule for Phase 1 (Foundations) through Phase 3 (Advanced Logic).
    -   **Repository Plan**: The proposed directory structure for the eventual `skill-registry/` implementation.

-   **`GEMINI.md`**: This instructional context file for Gemini CLI interactions.

## Usage

When interacting with this project, keep the following in mind:

-   **Educational Content**: Refer to the "Learning Plan" in `skill-for-team-platform.md` when asked about onboarding or training team members on AI Agent Skills.
-   **Implementation Blueprint**: Use the "Repository Development Plan" section as a guide for scaffolding the actual registry structure (e.g., creating `skills/`, `tutorials/`, and `templates/` folders).
-   **Skill Lifecycle**: Adhere to the 7-step lifecycle (Understand, Plan, Initialize, Edit, Package, Install, Iterate) when discussing the creation of new skills.
-   **Terminology**: 
    -   `SKILL.md`: The core instruction file for an agent skill.
    -   `Trigger`: The `description` field in a skill's metadata that tells the agent when to activate it.
    -   `Progressive Disclosure`: Using `references/` to manage context window efficiency.
