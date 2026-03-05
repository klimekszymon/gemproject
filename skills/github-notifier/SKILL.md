---
name: github-notifier
description: "Posts issues to GitHub. Use when a bug is confirmed or a task needs tracking."
---

# Environment Setup
This skill requires a `GITHUB_TOKEN` environment variable. 

# Instructions
1. When asked to create an issue, first check if the `GITHUB_TOKEN` is available in the environment.
2. If it is missing, **stop and ask the user to set it** using `export GITHUB_TOKEN='...'`.
3. Once available, run `node scripts/post-issue.js "<title>" "<body>"` to create the issue.

# Tools & Scripts
- `node scripts/post-issue.js <title> <body>`: Uses the GitHub CLI or API to create an issue.
