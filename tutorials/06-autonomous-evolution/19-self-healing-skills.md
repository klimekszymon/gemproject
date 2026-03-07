# Task 19: Self-Healing Skills

In this task, we enter the realm of **Autonomous Evolution**. You will learn how to build skills that can detect their own execution errors and proactively propose (or apply) fixes to their underlying scripts. This "Self-Healing" capability reduces maintenance overhead and makes your agent ecosystem more resilient.

---

## Part 1: Educational - The "Repair Loop"

Traditional software requires a human developer to read a stack trace, identify the bug, and write a fix. A **Self-Healing Skill** automates this cycle:

1.  **Detection**: The script fails and outputs an error message (stdout/stderr).
2.  **Diagnosis**: A "Healer" skill reads the error and the source code of the failing script.
3.  **Remediation**: The Healer proposes a `git diff` or a direct code change to fix the bug.
4.  **Verification**: The script is run again to confirm the fix works.

---

## Part 2: The Practical - The `self-healer` Skill

We will build a skill that specializes in fixing simple JavaScript errors. The `self-healer` will be triggered when another skill's script fails.

### 1. The Scenario
You have a script `skills/hello-world/scripts/greet.js` that has a `ReferenceError` (e.g., using an undefined variable). The `self-healer` will identify the missing variable and propose the fix.

---

## Part 3: Ready Scripts (The "Healer" Pattern)

### 1. `self-healer/scripts/repair-script.js`
This script takes an error message and the target file path, then "analyzes" (via the agent's internal logic) how to fix it.

```javascript
const fs = require('fs');
const path = require('path');

const targetFile = process.argv[2];
const errorMessage = process.argv[3];

if (!targetFile || !errorMessage) {
  console.error("❌ Error: Missing target file or error message.");
  process.exit(1);
}

console.log(`🩹 Attempting to heal ${targetFile}...`);
console.log(`❗ Reported Error: ${errorMessage}`);

const content = fs.readFileSync(targetFile, 'utf8');

// The agent's 'Instructions' in SKILL.md will handle the actual logic
// but this script provides the structured output for the fix.
console.log("\n--- PROPOSED FIX ---");
console.log(`File: ${targetFile}`);
console.log("Action: Locate the undefined variable and declare it.");
console.log("--------------------");

// In a real scenario, this script might generate a .patch file or a git diff.
```

---

## Part 4: Interaction Design (Example Prompts)

**Pattern: The Automated Repair**
> **User**: "Run the greet skill."
> **Agent**: 
> 1. "Executing `node skills/hello-world/scripts/greet.js`..."
> 2. "❌ Error: `ReferenceError: user is not defined at line 5`."
> 3. "Self-healing triggered. Activating `self-healer`..."
> 4. "I've analyzed `greet.js`. It looks like the variable `user` is missing. Would you like me to add `const user = 'Guest';` to the top of the file?"
> **User**: "Yes, fix it."

---

## Part 5: Tasks to Do

### Task 1: Initialize the `self-healer` Skill
1.  Create the skill folder: `skills/self-healer/`.
2.  Write the `SKILL.md`. It should be triggered by "fix an error," "repair a script," or when a command fails with a stack trace.
3.  Add the `repair-script.js` from Part 3.

### Task 2: Create a "Broken" Script
1.  Create `skills/hello-world/scripts/broken.js`:
    ```javascript
    // broken.js
    console.log("Hello, " + undefinedVariable); 
    ```

### Task 3: Test the Healing Loop
1.  Attempt to run the broken script: "Run the `broken.js` script."
2.  When it fails, ask the agent: "Use the `self-healer` skill to fix the error in `broken.js`."
3.  **Goal**: The agent should identify the `ReferenceError` and propose a valid fix.

---

## Self-Check: Milestone 19
- [ ] Can the `self-healer` skill read a stack trace and associate it with a specific file?
- [ ] Does the agent propose a code change that actually resolves the reported error?
- [ ] Does the agent offer to re-run the script after the fix is applied?
