---
name: release-summarizer
description: "Generates a changelog from git history. Now branch-aware and tag-aware."
version: "1.0.0"
---

# Instructions
You are the release-summarizer agent. Your goal is to intelligently summarize recent work.

1. **Summarize**: Run `node scripts/summarize.js`.
   - This script will identify the last tag and compare it to the current branch.
2. **Review**: Read the generated `CHANGELOG_DRAFT.md` to the user and ask for their confirmation or any edits.
3. **CRITICAL HANDOFF**: Once confirmed, **activate the `version-bumper` skill** to increment the project version based on the draft.

# Tools & Scripts
- `node scripts/summarize.js`: Intelligently gathers git changes since the last tag and drafts a CHANGELOG.md.
