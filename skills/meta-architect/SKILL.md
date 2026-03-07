---
name: meta-architect
description: Autonomously scaffolds new curriculum tracks and domain specialized skill sets based on user prompts. Use when the user wants to expand the learning path or add a new domain.
---

# Instructions
1. When asked to architect a new domain track (e.g., "Build a track for Python Data Science"), first propose a 3-5 task structure to the user.
2. Once the structure is approved, execute `node skills/meta-architect/scripts/scaffold-track.js "<Track Name>"` to initialize the directory and README.
3. For each task in the new track, generate a comprehensive tutorial file (e.g., `21-data-cleaning.md`) with Educational, Practical, and Task sections.
4. Update the main `tutorials/README.md` to include the newly created track.

# References
- `tutorials/README.md`: The central curriculum index.
- `tutorials/FUTURE_BLOCKS.md`: The roadmap for new track ideas.
