# Task 6: Advanced - Session Closers and Task Wrapping

In this advanced lesson, we're taking inspiration from the concept of a **Session Closer**. A session closer is a specialized skill or command that runs at the end of your work session. It helps you "land the plane" by summarizing what you've done, cleaning up temporary files, and preparing a "to-do" list for your next session.

---

## Part 1: Educational - The Importance of Finality

When you work with an AI agent in the terminal, you often perform many small, iterative tasks. Without a "session closer," your context becomes cluttered, and you might forget where you left off.

### What is a Session Closer?
It's a "meta-skill" that focuses on the **lifecycle of a session**. Its job is to:
1.  **Summarize**: Provide a concise list of all changes made.
2.  **Validate**: Run a final "sanity check" (like a build or lint).
3.  **Handoff**: Generate a `TODO.md` or a message for your "future self" so you can resume quickly tomorrow.

---

## Part 2: Practical - Building the "Handoff" Skill

We will create a skill called `handoff` that generates a session summary.

### 1. Create the Skill Directory
```bash
mkdir -p skills/handoff/scripts
```

### 2. Create the Handoff Script
This script will look at the git status and recently modified files to generate a summary.

Create `skills/handoff/scripts/generate-summary.js`:
```javascript
const { execSync } = require('child_process');

try {
    // Get git status summary
    const gitStatus = execSync('git status --short').toString() || "No changes tracked by git.";
    
    // Get last 3 commit messages
    const lastCommits = execSync('git log -n 3 --oneline').toString() || "No recent commits.";

    const report = {
        timestamp: new Date().toISOString(),
        modifiedFiles: gitStatus.split('\n').filter(line => line.trim()),
        recentHistory: lastCommits.split('\n').filter(line => line.trim())
    };

    console.log(JSON.stringify(report, null, 2));
} catch (error) {
    console.log(JSON.stringify({ error: "Git not initialized or command failed" }));
}
```

### 3. Create the `SKILL.md`
The instructions for this skill are critical. It needs to know how to wrap up.

Create `skills/handoff/SKILL.md`:
```markdown
---
name: handoff-agent
description: "Wraps up the current session by summarizing work and suggesting next steps."
---

# Instructions
When the user says "wrap up," "close session," or "finish for today":
1. Execute the `generate-summary.js` script to see what has changed.
2. Review the current directory for any new tutorial files or scripts created.
3. Provide a structured "Session Handoff" report that includes:
    - **Achievements**: What was successfully completed.
    - **Pending**: What was left unfinished.
    - **Next Steps**: A specific task for the user to start with next time.
4. Ask the user if they want you to save this summary to a `SESSION_LOG.md` file.
```

---

## Part 3: Testing the Session Closer

Try it out! At the end of your "training day," say:
> "Alright, I'm done for today. Wrap up the session."

The agent should trigger the `handoff-agent`, analyze your work in the `gemproject` directory, and give you a clean summary of the tutorials you've created.

---

## Self-Check: Milestone 6
- [ ] Did the agent correctly identify the tutorials and skills you've built?
- [ ] Did it suggest a logical "next step"?
- [ ] (Optional) Did it create a `SESSION_LOG.md`?

*Next Task: Task 7 - Meta-Skills (The "Skill Creator" Skill).*
