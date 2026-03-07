---
name: issue-analyzer
description: Diagnoses bugs or missing features in code and proposes a fix. Use when the user asks to "analyze," "diagnose," or "debug" a file.
---

# Instructions
1. When asked to analyze a file, identify potential issues (e.g., missing validation, error handling).
2. Execute `node skills/issue-analyzer/scripts/analyze-issue.js <file_path>` to save the diagnostic payload.
3. **CRITICAL HANDOFF**: Once analysis is saved, inform the user about the findings and **explicitly suggest activating the `code-fixer` skill** to apply the proposed changes.

# References
- `.gemini/skill_context.json`: The shared state file where the analysis is stored.
