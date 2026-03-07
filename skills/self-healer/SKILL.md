---
name: self-healer
description: Detects and proposes fixes for script execution errors. Use when another skill fails with a stack trace or a clear error message.
---

# Instructions
1. When a command fails, read the stack trace or error message (stderr).
2. Execute `node skills/self-healer/scripts/repair-script.js "<path_to_failing_file>" "<error_message>"` to analyze the failure.
3. Propose a specific code fix (e.g., variable declaration, missing import, syntax error) based on the file content and the reported error.
4. Ask the user for permission before applying any permanent code changes.

# References
- `tutorials/06-autonomous-evolution/19-self-healing-skills.md`: The official tutorial for this pattern.
