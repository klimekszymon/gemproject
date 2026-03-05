# Task 13: Prompt Engineering for Skills

Writing instructions for an AI agent is a form of engineering. In this final foundational task, we'll refine our `SKILL.md` to ensure reliability, reduce "hallucinations," and optimize the agent's performance.

---

## Part 1: Educational - The 3 Pillars of Skill Engineering

1.  **Selection Logic**: Clear triggers for *which* script to run.
2.  **Few-Shot Samples**: Real-world examples of how to interact with the skill.
3.  **Negative Constraints**: Hard boundaries on what the agent MUST NOT do.

---

## Part 2: Practical - Transforming Instructions

Let's take a "vague" skill and turn it into a "professional" skill.

### 1. Before: The "Vague" Way
```markdown
# Instructions
Please help the user fix their code. You can use our linting script.
```
*Why this fails: The agent might not know when to run the script or what to do with the output.*

### 2. After: The "Professional" Way (Using Imperative Form)
```markdown
# Instructions
1. Run `scripts/lint.js` on the provided file path.
2. If errors are found, **categorize them** into "Critical" (syntax) and "Stylistic" (spacing).
3. **DO NOT** attempt to fix the files automatically without user approval.
4. If no errors are found, suggest a performance optimization using `references/performance-tips.md`.
```

---

## Part 3: Few-Shot Grounding (The "Show, Don't Tell" Method)

By adding an `## Example` section to your `SKILL.md`, you provide the agent with a "template" for success.

**`SKILL.md` (Snippet):**
```markdown
## Example Interaction:
**User**: "Check my API code."
**Agent**: "Running linting script... Found 2 Style issues (missing semicolons) and 0 Critical issues. Would you like me to fix these automatically?"
```

---

## Part 4: Advanced Multi-Script Selection Logic

If your skill folder has multiple scripts, use a **Decision Table** style in your instructions.

**`SKILL.md` (Snippet):**
```markdown
# Tool Selection
- If the file is a **.js** file: Execute `scripts/analyze-js.js`.
- If the file is a **.py** file: Execute `scripts/analyze-python.py`.
- If the task is **summarization**: Read `references/summary-template.md`.
```

---

## Self-Check: Milestone 13
- [ ] Have you replaced "Could you..." and "Please..." with direct commands like "Run...", "Categorize...", or "Execute..."?
- [ ] Does your skill include an example interaction to ground the agent?
- [ ] Did you move long explanations (>20 lines) to `references/` files?

**Congratulations!** You have completed the Mastery Track and the foundational Skill Platform Curriculum.
