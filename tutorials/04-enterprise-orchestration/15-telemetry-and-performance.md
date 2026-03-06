# Task 15: Telemetry & Skill Performance

As an AI Agent Skill ecosystem grows, it becomes critical to measure its impact. **Telemetry** is the automated collection of data about skill usage, success rates, and resource consumption (tokens). This data allows teams to justify the ROI of their skills and identify which ones need optimization.

---

## Part 1: Educational - Why Telemetry Matters

### 1. Skill ROI (Return on Investment)
How many turns did the `git-helper` skill save this week? By tracking activations, we can estimate time saved across the team.

### 2. Identifying Bottlenecks
If the `code-reviewer` skill is triggered but fails to produce a valid diff 40% of the time, the instructions in its `SKILL.md` or its underlying scripts need refinement.

### 3. Token Efficiency
Large skills with many `references/` can be expensive. Telemetry helps identify "heavy" skills that might benefit from better **Progressive Disclosure** (Task 04).

---

## Part 2: The Data Structure (`telemetry.json`)

To track performance, we need a standardized way to log events. A typical telemetry entry should look like this:

```json
{
  "timestamp": "2026-03-06T14:30:00Z",
  "skill_id": "git-helper",
  "action": "smart-commit",
  "status": "success",
  "metrics": {
    "turns_saved": 3,
    "tokens_used": 1250,
    "duration_ms": 4500
  },
  "user_feedback": "Perfectly captured the intent of my changes."
}
```

---

## Part 3: Ready Scripts (Automation)

The core of this task is building a script that can aggregate these logs into a meaningful report.

### 1. `scripts/collect-telemetry.js`
This script scans a log directory (or a mock API) and calculates performance metrics.

```javascript
// Example logic for collect-telemetry.js
const fs = require('fs');
const logs = JSON.parse(fs.readFileSync('./logs/session_telemetry.json', 'utf8'));

const stats = logs.reduce((acc, log) => {
  acc[log.skill_id] = acc[log.skill_id] || { count: 0, success: 0, tokens: 0 };
  acc[log.skill_id].count++;
  if (log.status === 'success') acc[log.skill_id].success++;
  acc[log.skill_id].tokens += log.metrics.tokens_used;
  return acc;
}, {});

console.table(stats);
```

---

## Part 4: Interaction Design (Example Prompts)

How do you interact with a telemetry system? The agent should be able to "audit" its own performance or report on the team's usage.

**Pattern A: The Performance Audit**
> **User**: "How is the `release-summarizer` skill performing?"
> **Agent**: "The `release-summarizer` has a **92% success rate** over the last 50 activations. However, it uses an average of **4,500 tokens** per run, which is 30% higher than other skills. Would you like me to analyze its `references/` for potential optimization?"

**Pattern B: The ROI Report**
> **User**: "Generate a skill usage report for this week."
> **Agent**: "This week, 12 different skills were activated 145 times. Estimated time saved: **14 hours**. The most used skill was `git-helper` (42 activations)."

---

## Part 5: Tasks to Do

### Task 1: Create the Telemetry Storage
1.  Create a directory: `logs/`.
2.  Create a file `logs/session_telemetry.json` with an array of 3-5 mock entries for `git-helper` and `code-reviewer`.

### Task 2: Implement the `telemetry-analyst` Skill
1.  Create a new skill folder: `skills/telemetry-analyst/`.
2.  Write the `SKILL.md`. It must be able to:
    *   Read from the `logs/` directory.
    *   Trigger `scripts/collect-telemetry.js`.
    *   Summarize the data into a human-readable "Health Report."

### Task 3: Analyzing "Heavy" Skills
1.  Add a log entry where a skill uses > 10,000 tokens.
2.  Ask the agent: "Identify any skills that are consuming excessive resources."
3.  **Goal**: The agent should flag the "heavy" skill and suggest a "Progressive Disclosure" refactor.

---

## Self-Check: Milestone 15
- [ ] Does `logs/session_telemetry.json` exist with valid JSON?
- [ ] Can the `telemetry-analyst` skill calculate a basic success rate?
- [ ] Does the agent provide actionable advice (e.g., "Refactor this skill") based on the telemetry data?
