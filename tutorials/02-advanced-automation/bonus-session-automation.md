# Bonus Task: Session State & Automation (Persistent Context)

In this bonus lesson, you will learn how to automate the end of your work session. Instead of relying on a "chat history," you will treat your project—code, research, and AI instructions—as a living repository.

---

## Part 1: Educational - The "Persistent Context" Strategy

The goal is to eliminate the "Blank Page" effect. By saving the project's state into a versioned Markdown file (like `docs/ai_context.md`), you ensure that any AI model (Gemini, Claude, or ChatGPT) immediately "knows" the current state of the application.

### Comparison: Task 6 vs. Bonus Lesson

| Feature | Task 6: Session Closers | Bonus: Session State & Automation |
| :--- | :--- | :--- |
| **Interface** | **Interactive Skill**: You trigger an agent and talk through the summary. | **Automated Script**: A single terminal command (`end-session.sh`) does the work. |
| **Persistence** | **Optional**: The agent *asks* if you want to save to a file. | **Mandatory**: The file is updated first as the "Source of Truth." |
| **Git Integration** | **Manual/Light**: Summarizes recent commits but doesn't manage them. | **Deep**: AI generates the commit message and performs the `git commit` for you. |
| **Model Portability**| **Low**: History often stays in the specific AI's chat window. | **High**: State is saved to disk, so you can switch between Gemini and Claude seamlessly. |

---

## Part 2: Practical - Building the "Closer-Pro" Workflow

### 1. The Context File Structure (`docs/ai_context.md`)
Instead of just a "log," we create a **System of Record**. Create `docs/ai_context.md` (or use your existing `SESSION_LOG.md`) with this structure:

```markdown
# Project Context: [Project Name]

## Last Session Summary
- **Date**: 2026-03-05
- **Status**: Finished UI refactor of the Header component.
- **Decisions**: Switched from CSS-in-JS to Vanilla CSS for performance.

## Next Steps (TODO)
- [ ] Implement the Mobile Navigation Menu.
- [ ] Connect the search bar to the API.

## Architecture Notes
- Using Nuxt 3 with Pinia for state management.
- API endpoints are located in `/server/api`.
```

### 2. The Refined "Session Closer" Script
Create `scripts/end-session.sh`. This script is more robust—it ensures directories exist and uses a specialized prompt for higher accuracy.

```bash
#!/bin/bash

# 1. Ensure documentation directory exists
mkdir -p docs

# 2. Stage changes
echo "🔍 Analyzing changes..."
git add .
DIFF=$(git diff --cached)

if [ -z "$DIFF" ]; then
  echo "Brak zmian do zapisu."
  exit 0
fi

# 3. Use AI to generate the specialized context update
echo "🤖 AI is updating the persistent context..."

# We ask for a specific Markdown format for the log
SUMMARY=$(gemini "Analyze this git diff: $DIFF. Write a 3-bullet-point summary in English of what was achieved. Format as Markdown bullets.")
NEXT_STEPS=$(gemini "Based on these changes: $DIFF, what are the next 2 logical steps for this project? Format as Markdown checkboxes.")

# 4. Update the Persistent File
DATE=$(date +"%Y-%m-%d %H:%M")
{
  echo -e "\n---"
  echo -e "### Session: $DATE"
  echo -e "#### Achievements:"
  echo -e "$SUMMARY"
  echo -e "#### Next Steps:"
  echo -e "$NEXT_STEPS"
} >> docs/ai_context.md

# 5. Commit with AI-generated message
COMMIT_MSG=$(gemini "Generate a concise conventional commit message for these changes: $DIFF")
git commit -m "$COMMIT_MSG"

echo "✅ Session persisted to docs/ai_context.md and committed as: $COMMIT_MSG"
```

### 3. The New Meta-Skill: `session-closer-pro`
Create a new skill that triggers this script and performs a final "sanity check."

**`skills/session-closer-pro/SKILL.md`:**
```markdown
---
name: session-closer-pro
description: Professional session termination and context persistence. Use when the user wants to "save and exit" or "wrap up for today."
---

# Instructions
1. **Sanity Check**: Run `npm run lint` or `npm test` to ensure the session ends on a "passing" state.
2. **Execute Automation**: Run `scripts/end-session.sh`.
3. **Verify Persistence**: Read the last 10 lines of `docs/ai_context.md` to ensure the summary was written.
4. **Final Handoff**: Give the user a clear "cliffhanger" based on the "Next Steps" generated in the script.
```

---

## Part 3: The "Resume" Workflow

The real power of this bonus lesson is the **Start of Session**. Next time you open the terminal, your first command should be:

> "Read `docs/ai_context.md`. What is our status and what is our first task for today?"

---

## Self-Check: Bonus Milestone
- [ ] Does your `end-session.sh` handle the `docs/` folder creation?
- [ ] Does the AI correctly identify "Next Steps" that actually make sense for your code?
- [ ] Have you tried starting a fresh session by asking the agent to read the context file?
