# Task 13: Prompt Engineering for Skills

Writing instructions for an AI agent is a specialized form of engineering. In this final foundational task, we'll refine our `SKILL.md` style to ensure reliability and minimize hallucinations.

---

## Part 1: Educational - Mastering Instructions

A good `SKILL.md` is more like a **specification** than a conversation.

### Best Practices:
1.  **Imperative Form**: Use direct commands.
    - ❌ "You might want to check the lint errors."
    - ✅ "Run `npm run lint` and summarize the results."
2.  **Few-Shot Examples**: Show, don't just tell. If your skill formats output, provide a `## Example Output` section.
3.  **Negative Constraints**: Tell the agent what **not** to do.
    - ✅ "Never commit changes without explicitly asking the user first."
4.  **Selection Logic**: If your skill has multiple scripts, tell the agent *which* one to choose and *when*.

---

## Part 2: Practical - Using Few-Shot Samples

In your `SKILL.md`, add an "Examples" section:
```markdown
## Example Usage:
User: "Summarize this PR."
Agent: "Analyzing changes... Found 3 files modified. 1. `main.js` (refactored auth), 2. `auth.js` (new validation logic)..."
```

This acts as a "grounding" mechanism for the LLM, reducing the chance of irrelevant or overly verbose responses.

---

## Self-Check: Milestone 13
- [ ] Is your `SKILL.md` body less than 500 lines? (If not, move details to `references/`).
- [ ] Have you removed all "filler" words like "please" or "kindly"?
- [ ] Does your skill include an example of its intended output?

**Congratulations!** You have completed the Mastery Track.
