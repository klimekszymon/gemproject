# Task 12: Secrets & Environmental Safety

Skills that interact with external APIs (GitHub, AWS, Slack) need **secrets** (API Keys, Tokens). In this lesson, you'll learn how to handle these securely without ever baking them into your Skill's code.

---

## Part 1: Educational - The Golden Rule of Skills

**NEVER store a secret in a Skill file.**
- ❌ Do NOT put them in `SKILL.md`.
- ❌ Do NOT put them in `references/`.
- ❌ Do NOT hardcode them in `scripts/`.

### Why?
Skills are often shared across teams. If you package your `github-skill.skill` with your personal token, everyone who installs it has your identity.

---

## Part 2: Practical - Using Environment Variables

The correct way to handle secrets is through the host environment.

### 1. The Script Pattern
In your script (e.g., `scripts/post-to-slack.js`), use environment variables:
```javascript
const slackToken = process.env.SLACK_BOT_TOKEN;
if (!slackToken) {
    console.error("❌ Error: SLACK_BOT_TOKEN is not set in the environment.");
    process.exit(1);
}
// Proceed with API call...
```

### 2. Instructing the User
In your `SKILL.md`, you must tell the user how to provide the secret:
> "To use this skill, ensure the `SLACK_BOT_TOKEN` environment variable is set in your current terminal session before running."

---

## Self-Check: Milestone 12
- [ ] Have you audited your `scripts/` for hardcoded strings that should be env vars?
- [ ] Does your `SKILL.md` include an 'Environment Setup' section?
- [ ] Do you know how to use a `.env` file locally without committing it?

**Next Task: Task 13 - Advanced Prompt Engineering for Skills.**
