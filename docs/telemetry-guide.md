# Telemetry & Performance Guide (Lesson 15)

This guide documents the `telemetry-analyst` skill, its implementation, and its role in maintaining a high-performance AI Agent Skill ecosystem.

## 1. The `telemetry-analyst` Skill

The `telemetry-analyst` skill provides automated insights into how specialized skills are performing across the team. It focuses on three core metrics: **Success Rate**, **Resource Efficiency (Tokens)**, and **ROI (Turns Saved)**.

### Core Components
- **Storage**: `logs/session_telemetry.json` (Standardized JSON log format).
- **Logic**: `skills/telemetry-analyst/scripts/collect-telemetry.js` (Aggregation engine).
- **Interface**: `skills/telemetry-analyst/SKILL.md` (Natural language triggers).

---

## 2. Usage Examples

### Example A: The Performance Audit
**Prompt**: "How is the git-helper skill performing?"
**Agent Response**:
> "The `git-helper` skill has a **50% success rate** over 2 activations. It is highly efficient, using an average of **875 tokens**. The recent failure was due to a network connection error, not a skill logic issue."

### Example B: The ROI Report
**Prompt**: "Generate a skill usage report for this session."
**Agent Response**:
> "This session, 3 different skills were activated 4 times, saving a total of **24 turns**. The `registry-manager` was the top performer, saving **17 turns** through bulk-linking automation."

### Example C: Identifying "Heavy" Skills
**Prompt**: "Identify any skills that are consuming excessive resources."
**Agent Response**:
> "I've identified `heavy-processor` as a **Heavy Skill**, consuming **15,000 tokens** per run. This exceeds our 10,000-token efficiency threshold. I recommend refactoring it to use **Progressive Disclosure**."

---

## 3. Advanced Enrichments (Mastery Level)

To further scale the telemetry system, consider implementing these "Mastery" modules:

### 1. Automated Health Checks
Integrate telemetry into the `session-closer-pro` skill. Before closing a session, the agent should automatically run a telemetry audit and alert the user if any skill's success rate has dropped below a critical threshold (e.g., 80%).

### 2. Dependency Efficiency Mapping
Correlate high token usage with specific `references/` or dependencies. If a skill like `git-helper` becomes "heavy," the analyst should be able to identify which specific documentation file in its context is causing the bloat.

### 3. "Auto-Optimizer" Hook
Create a script that can automatically propose a refactored `SKILL.md` structure for any skill flagged as "Heavy." It should suggest moving large instruction blocks into separate `references/` files to enforce **Progressive Disclosure**.

### 4. Quality Gate CI/CD
Implement a `validate-skill.js` check that prevents a skill from being added to `registry.json` unless it includes at least one example response that demonstrates telemetry-aware reporting.

---

## 4. Operational Best Practices
- **Non-Interactive Updates**: Always use the `update-skill.js` script with the `--consent` flag to avoid "Interactive Hell" during synchronization.
- **Log Rotation**: Periodically archive old `session_telemetry.json` files to keep the analyst script's performance high and token costs low.
