# Task 12: Secrets & Environmental Safety

In this lesson, you will learn how to build skills that interact with the outside world (APIs, Databases, Cloud Providers) without exposing sensitive credentials like API Keys or Tokens.

---

## Part 1: Educational - The "Injected Secret" Pattern

The only safe way to provide a secret to an AI agent's skill is through **Environment Variables**. 

### Why this is safer:
1.  **Non-Persistence**: Secrets live in the shell's memory, not in the project's files.
2.  **Team Compatibility**: Each developer uses their own token locally.
3.  **CI/CD Friendly**: GitHub Actions or Jenkins can inject these as "Secrets" during a build.

---

## Part 2: Practical - Building a Secure "Issue Notifier"

We will design a skill that posts a message to GitHub. It requires a `GITHUB_TOKEN`.

### 1. The Secure Script
Create `skills/github-notifier/scripts/post-issue.js`:

```javascript
const { execSync } = require('child_process');

// 1. Retrieve the secret from the environment
const token = process.env.GITHUB_TOKEN;

if (!token) {
    console.error("❌ ERROR: GITHUB_TOKEN is not set.");
    console.log("To fix this, run: export GITHUB_TOKEN='your_personal_access_token'");
    process.exit(1);
}

const issueTitle = process.argv[2] || "Automated Issue";
const issueBody = process.argv[3] || "Created by Gemini CLI Skill.";

try {
    // 2. Use the token in a command (e.g., using GitHub CLI 'gh')
    const cmd = `gh issue create --title "${issueTitle}" --body "${issueBody}"`;
    const result = execSync(cmd, { env: { ...process.env, GITHUB_TOKEN: token } });
    console.log(`✅ Issue created successfully: ${result.toString().trim()}`);
} catch (error) {
    console.error(`❌ Failed to create issue: ${error.message}`);
}
```

### 2. The `SKILL.md` Instructions
Your instructions must teach the agent how to handle the "missing secret" state.

**`skills/github-notifier/SKILL.md` (Snippet):**
```markdown
---
name: github-notifier
description: Posts issues to GitHub. Use when a bug is confirmed or a task needs tracking.
---

# Environment Setup
This skill requires a `GITHUB_TOKEN` environment variable. 

# Instructions
1. If the user asks to create an issue, first check if the `GITHUB_TOKEN` is available by running the script with no arguments.
2. If the script fails with "Missing Token," **ask the user to set the variable** in their terminal before proceeding.
3. Once set, execute `scripts/post-issue.js "<title>" "<body>"`.
```

---

## Part 3: Using `.env` Files (The Local Exception)

For local development, you can use a `.env` file, but you **MUST** add it to your `.gitignore`.

**`.env` Example:**
```text
GITHUB_TOKEN=ghp_example123456789
```

**`.gitignore` Example:**
```text
.env
*.skill
```

---

## Self-Check: Milestone 12
- [ ] Does your script exit with a clear error message if a secret is missing?
- [ ] Have you ensured no API keys are hardcoded in `SKILL.md` or `scripts/`?
- [ ] Did you add `.env` to your project's `.gitignore`?

**Next Task: Task 13 - Advanced Prompt Engineering for Skills.**
