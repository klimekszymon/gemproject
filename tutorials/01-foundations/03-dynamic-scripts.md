# Task 3: Adding Dynamic Scripts for Advanced Logic

In Task 2, you built a Knowledge Engine that provides static information. In this task, you will learn how to make your skill "do things" by adding a script that validates user input against your standards.

---

## Part 1: Educational - Deterministic vs. Probabilistic

AI agents are **probabilistic**—they guess the next best word based on patterns. However, software engineering often requires **deterministic** logic—actions that must happen exactly the same way every time (like calculating a checksum, linting code, or checking a string format).

### The `scripts/` Folder
This is where you store your deterministic logic. The agent can "call" these scripts using standard CLI tools (like `node`, `python3`, or `bash`). 

**Best Practices for Agent Scripts:**
1.  **JSON Output**: Prefer returning data in JSON format so the agent can easily parse it.
2.  **No Chitchat**: Scripts should return raw data, not conversational text. Let the agent handle the conversation.
3.  **Focused Scope**: One script should do one thing well.

---

## Part 2: Practical - Building an API Validator

You will create a script that checks if a suggested endpoint name follows the "plural kebab-case" standard from Task 2.

### 1. Create the Scripts Directory
```bash
mkdir -p skills/api-standards/scripts
```

### 2. Create the Validator Script
Create `skills/api-standards/scripts/validate-endpoint.js`:
```javascript
const endpoint = process.argv[2];

if (!endpoint) {
    console.log(JSON.stringify({ error: "No endpoint provided" }));
    process.exit(1);
}

// Simple check: Must be plural-ish (ends in s) and use kebab-case
const isKebab = /^[a-z0-9-]+$/.test(endpoint);
const isPlural = endpoint.endsWith('s');

const result = {
    endpoint: endpoint,
    valid: isKebab && isPlural,
    checks: {
        isKebabCase: isKebab,
        isPlural: isPlural
    }
};

console.log(JSON.stringify(result));
```

### 3. Update `SKILL.md` to Use the Script
Modify `skills/api-standards/SKILL.md` to include instructions for using the new tool:
```markdown
---
name: api-standards-guide
description: "Expert guidance on Team API naming conventions, versioning, and error handling."
---

# Instructions
When asked about API standards or best practices:
1. Refer to the files in the `references/` folder.
2. Provide precise rules for naming, versioning, or error handling.

# Tools & Scripts
When a user suggests a new API endpoint name:
1. Execute the `validate-endpoint.js` script using `node`.
2. Pass the suggested endpoint as the first argument.
3. Review the JSON result and tell the user if their suggestion is valid.
```

### 4. Re-install/Update the Skill
Since you modified the skill, you need to tell the CLI:
```bash
gemini skills install ./skills/api-standards
```

---

## Self-Check: Milestone 3
- [ ] Try asking: *"I want to create an endpoint called `user-profile`. Is that standard?"*
- [ ] The agent should call your script, see that it isn't plural (`user-profiles` would be better), and give you feedback.

*Next Task: Task 4 - Advanced Context Management (Progressive Disclosure).*
