# Task 16: Inter-Skill Communication

As your AI Agent Skill ecosystem matures, you will find that complex tasks often require multiple specialized skills to work together. **Inter-Skill Communication** is the ability for one skill to pass data, state, or instructions to another. This "Chaining" transforms a collection of tools into a cohesive, automated workflow.

---

## Part 1: Educational - Why Chaining Matters

### 1. Modular Specialization
Instead of creating a single, massive skill that handles everything (e.g., "Full-Developer-Skill"), you can create smaller, more reliable skills. One skill focuses on **Analysis**, while another focuses on **Execution**.

### 2. Standardized Hand-offs
By defining a common data format for communication (e.g., `skill_context.json`), different skills can "talk" to each other even if they were developed at different times or by different teams.

### 3. Human-in-the-Loop Validation
Chaining allows the agent to pause between skills. For example:
- **Skill A (Issue Analyzer)**: Analyzes a bug and writes a "Fix Plan" to a file.
- **Agent**: Shows the plan to the user and asks for approval.
- **Skill B (Code Fixer)**: Reads the approved plan and applies the changes.

---

## Part 2: The Data Structure (`skill_context.json`)

To enable communication, we need a "shared state" file. This file acts as a temporary memory buffer between skill activations.

```json
{
  "workflow_id": "bug-fix-001",
  "source_skill": "issue-analyzer",
  "target_skill": "code-fixer",
  "timestamp": "2026-03-07T10:15:00Z",
  "payload": {
    "file_path": "src/utils/math.js",
    "bug_description": "Divide by zero error in calculateRatio()",
    "proposed_fix": "Add a check for divisor !== 0 before the operation.",
    "priority": "high"
  },
  "status": "pending_approval"
}
```

---

## Part 3: Ready Scripts (The "Messenger" Pattern)

In this pattern, Skill A writes the state, and Skill B reads it.

### 1. Skill A: `issue-analyzer/scripts/analyze-issue.js`
This script gathers information and writes the `skill_context.json` file.

```javascript
const fs = require('fs');

const context = {
  source_skill: "issue-analyzer",
  payload: {
    file_path: process.argv[2],
    bug_description: "Missing input validation",
    proposed_fix: "Add JSDoc and runtime type checks."
  },
  status: "ready"
};

fs.writeFileSync('.gemini/skill_context.json', JSON.stringify(context, null, 2));
console.log("Analysis complete. Context saved to .gemini/skill_context.json");
```

### 2. Skill B: `code-fixer/scripts/apply-fix.js`
This script reads the context and performs the requested action.

```javascript
const fs = require('fs');

if (!fs.existsSync('.gemini/skill_context.json')) {
  console.error("No skill context found!");
  process.exit(1);
}

const context = JSON.parse(fs.readFileSync('.gemini/skill_context.json', 'utf8'));

if (context.status === "ready") {
  console.log(`Applying fix to ${context.payload.file_path}: ${context.payload.proposed_fix}`);
  // Logic to modify the file would go here
  context.status = "completed";
  fs.writeFileSync('.gemini/skill_context.json', JSON.stringify(context, null, 2));
}
```

---

## Part 4: Interaction Design (Example Prompts)

Chaining requires the agent to understand the "relay" between skills.

**Pattern: The Automated Relay**
> **User**: "Analyze the error in `index.js` and fix it."
> **Agent**: 
> 1. "Activating `issue-analyzer` to diagnose `index.js`..."
> 2. "Analysis saved: The file is missing an export statement. Would you like me to trigger `code-fixer` now?"
> **User**: "Yes, go ahead."
> **Agent**: "Activating `code-fixer`. Fix applied successfully."

---

## Part 5: Tasks to Do

### Task 1: Initialize the Relay Skills
1.  Create two new skill folders: `skills/issue-analyzer/` and `skills/code-fixer/`.
2.  Write the `SKILL.md` for `issue-analyzer`. It should be triggered by "analyze a bug" or "diagnose an issue" and run the `analyze-issue.js` script.
3.  Write the `SKILL.md` for `code-fixer`. It should be triggered by "apply the fix" or "execute the plan" and run the `apply-fix.js` script.

### Task 2: Implement the Shared State
1.  Create the directory `.gemini/` if it doesn't exist.
2.  Write the two scripts (`analyze-issue.js` and `apply-fix.js`) as shown in Part 3.
3.  **Pro Tip**: Ensure both skills are aware of `.gemini/skill_context.json` in their `references/` or instructions.

### Task 3: Test the Chain
1.  Ask the agent: "Analyze the issue in `index.js`."
2.  Verify that `.gemini/skill_context.json` was created.
3.  Ask the agent: "Apply the fix based on the analysis."
4.  Verify that the context status changed to `completed`.

---

## Self-Check: Milestone 16
- [ ] Do both `issue-analyzer` and `code-fixer` skills exist?
- [ ] Does `issue-analyzer` successfully write a JSON payload to `.gemini/skill_context.json`?
- [ ] Can `code-fixer` read that payload and act on it?
- [ ] Does the agent seamlessly suggest the second skill after the first one finishes?
