# Task 4: Advanced Context Management (Progressive Disclosure)

As your skills grow, you might want to include hundreds of pages of documentation. If you put all of that into a single file, the agent will load all of it every time the skill is triggered, costing you money (tokens) and potentially confusing the agent with too much "noise."

In this task, you will learn the technique of **Progressive Disclosure**.

---

## Part 1: Educational - Context Efficiency

The Gemini CLI uses a "Retrieval Augmented Generation" (RAG) style approach for skills. Instead of reading every file in your project, it only reads the files that are most relevant to the current conversation.

### What is Progressive Disclosure?
It is the practice of breaking down large information into small, "atomic" files.
- **Bad**: One file called `all-api-documentation.md` (5,000 lines).
- **Good**: A folder called `references/` containing `auth-errors.md`, `user-endpoints.md`, `rate-limits.md`, etc.

### Why does this matter?
1.  **Cost**: You only pay for the tokens the agent actually reads.
2.  **Accuracy**: Small files have a higher "signal-to-noise" ratio, making it easier for the agent to find the exact rule it needs.
3.  **Speed**: Less text to process means faster responses.

---

## Part 2: Practical - Organizing Error Codes

Imagine your team has a massive list of error codes. Let's organize them using progressive disclosure.

### 1. Create the References Directory for Errors
```bash
mkdir -p skills/api-standards/references/errors
```

### 2. Create Atomic Reference Files
Create `skills/api-standards/references/errors/4xx.md`:
```markdown
# 4xx Client Errors
- 400 (Bad Request): The server cannot process the request due to client error.
- 401 (Unauthorized): Authentication is required.
- 403 (Forbidden): The server understands but refuses to authorize.
```

Create `skills/api-standards/references/errors/5xx.md`:
```markdown
# 5xx Server Errors
- 500 (Internal Server Error): Generic error message.
- 503 (Service Unavailable): Server is currently unable to handle the request.
```

### 3. Update `SKILL.md` to be "Context-Aware"
Update your `skills/api-standards/SKILL.md`. Notice how we instruct the agent to *locate* the right file first:

```markdown
---
name: api-standards-guide
description: "Expert guidance on Team API naming conventions, versioning, and error handling."
---

# Instructions
When asked about API standards or best practices:
1. Locate the relevant file in the `references/` directory tree.
2. If the user asks about specific error codes (e.g., "What does 403 mean?"), look specifically in the `references/errors/` sub-folder.
3. Provide precise rules for naming, versioning, or error handling.

# Tools & Scripts
... (keep your validate-endpoint logic here)
```

### 4. Update the Skill
```bash
gemini skills install ./skills/api-standards
```

---

## Self-Check: Milestone 4
- [ ] Try asking: *"What is the standard error for when a user isn't logged in?"*
- [ ] The agent should navigate to `references/errors/4xx.md` and tell you it's a `401 Unauthorized`.
- [ ] Verify that it **didn't** have to read the `naming.md` file to answer this question.

*Next Task: Task 5 - Packaging and Distribution.*
