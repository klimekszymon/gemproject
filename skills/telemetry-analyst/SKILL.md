---
name: telemetry-analyst
description: "Analyzes AI Agent Skill performance and resource consumption to justify ROI."
version: "1.0.0"
---

# Telemetry Analyst Skill

Analyzes AI Agent Skill performance and resource consumption to justify ROI.

## Trigger
- "How is [skill] performing?"
- "Generate a skill usage report"
- "Audit skill performance"
- "Identify heavy or inefficient skills"

## Context & References
- Reads from `logs/session_telemetry.json`.
- Uses `skills/telemetry-analyst/scripts/collect-telemetry.js`.

## Workflow
1. **Fetch**: Execute `collect-telemetry.js` to get the latest stats.
2. **Audit**: 
    - **Efficiency**: Flag any skill where 'Avg Tokens' > 10,000 as a "Heavy Skill."
    - **ROI**: Report 'Total Turns Saved' as the primary ROI metric.
    - **Success**: Note any skill with < 80% 'Success %' as needing an instruction audit.
3. **Refactor**: If a skill is "Heavy," recommend a **Progressive Disclosure** refactor.

## Example Responses

**User**: "Generate a skill usage report."
**Agent**: "This week, skills saved the team **18 turns**. `git-helper` is the most reliable (100% success), while `heavy-processor` is consuming **15k tokens** per run. I recommend refactoring `heavy-processor` using **Progressive Disclosure** to reduce costs."
