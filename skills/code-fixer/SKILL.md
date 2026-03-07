---
name: code-fixer
description: Executes code fixes based on a previously generated analysis plan. Use after an issue has been "analyzed" or "diagnosed" by `issue-analyzer`.
---

# Instructions
1. This skill **requires** a valid `.gemini/skill_context.json` file with `status: "ready"`.
2. Check the file `.gemini/skill_context.json` for details on the `proposed_fix`.
3. Execute `node skills/code-fixer/scripts/apply-fix.js` to perform the fix.
4. Inform the user of the final status and confirm if they'd like to run a build or tests.

# References
- `.gemini/skill_context.json`: The shared state file for task context and status.
