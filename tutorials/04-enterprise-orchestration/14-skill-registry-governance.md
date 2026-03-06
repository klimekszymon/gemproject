# Task 14: Skill Registry Governance

In a team environment, "Skill Drift" (where different developers have different versions of the same skill) leads to inconsistent agent behavior. This task covers **Governance**: the process of versioning, deprecating, and synchronizing skills across an entire organization.

---

## Part 1: Educational - The Governance Model

### 1. Semantic Versioning for Skills (Skill-SemVer)
*   **MAJOR**: Breaking changes to `SKILL.md` (the agent's core behavior changes or tool-use requirements change).
*   **MINOR**: Adding new scripts/features without breaking existing `SKILL.md` instructions.
*   **PATCH**: Refining prompts, fixing small bugs in scripts, or updating documentation.

### 2. The Deprecation Lifecycle
Skills aren't just deleted; they are deprecated.
1.  **Status: Active**: The current recommended version.
2.  **Status: Deprecated**: Still functional, but the agent must warn the user and suggest an `alternative`.
3.  **Status: End-of-Life (EOL)**: The skill is removed from the registry and will no longer sync.

---

## Part 2: The Manifest (`registry.json`)

The `registry.json` file is the "Single Source of Truth." Every skill in the repository must be indexed here.

```json
{
  "registry_name": "Team Skill Platform",
  "last_updated": "2026-03-06",
  "skills": {
    "git-helper": {
      "version": "1.3.0",
      "path": "skills/git-helper",
      "status": "active",
      "description": "Standardized git and release workflows."
    },
    "old-auth-skill": {
      "version": "0.1.0",
      "path": "skills/deprecated/old-auth",
      "status": "deprecated",
      "alternative": "auth-pro",
      "description": "Legacy authentication helper."
    }
  }
}
```

---

## Part 3: Ready Scripts (Automation)

To implement governance, we need deterministic logic. Below are the scripts you will build in this task.

### 1. `scripts/sync-skills.js`
This script compares the local installed skills (usually in `~/.gemini/skills/` or a local project folder) against the `registry.json`.

```javascript
// Example logic for sync-skills.js
const fs = require('fs');
const registry = JSON.parse(fs.readFileSync('./registry.json', 'utf8'));

Object.entries(registry.skills).forEach(([name, meta]) => {
  if (meta.status === 'deprecated') {
    console.warn(`⚠️  WARNING: Skill '${name}' is deprecated. Please migrate to '${meta.alternative}'.`);
  }
  // Logic to compare local version vs registry version...
  console.log(`✅ Verified: ${name} (v${meta.version})`);
});
```

### 2. `scripts/update-skill.js`
This script handles the "Install/Update" logic by copying the latest skill folder to the user's active skill directory.

---

## Part 4: Interaction Design (Example Prompts)

How should the agent handle governance? Use these patterns in your `SKILL.md`:

**Pattern A: The Deprecation Warning**
> **User**: "Use the old-auth-skill to log me in."
> **Agent**: "I can do that, but please note: `old-auth-skill` is currently **deprecated**. It is recommended to use `auth-pro` for better security. Would you like to switch now?"

**Pattern B: The Version Mismatch**
> **User**: "Run the git-helper."
> **Agent**: "Your local `git-helper` (v1.2.0) is behind the registry version (v1.3.0). This update includes the new `tag-release` feature. Should I update your local skill now?"

---

## Part 5: Tasks to Do

### Task 1: Initialize the Registry
1.  Create `registry.json` in the root of the project.
2.  Add `git-helper` and `skill-creator` to the registry with their current versions.

### Task 2: Implement the `registry-manager` Skill
1.  Create a new skill folder: `skills/registry-manager/`.
2.  Write the `SKILL.md` using the **Imperative Form** learned in Task 13.
3.  **Task**: Your skill must be able to run `scripts/validate-registry.js` to ensure no two skills have the same name.

### Task 3: Simulating an Update
1.  Manually change the version of `git-helper` in `registry.json` to `1.4.0`.
2.  Ask the agent to "Sync my registry."
3.  **Goal**: The agent should detect the mismatch and offer to update the skill.

---

## Self-Check: Milestone 14
- [ ] Is there a `registry.json` file in the root?
- [ ] Does the `registry-manager` skill use the "Warning" pattern for deprecated skills?
- [ ] Can the agent explain *why* a skill should be updated based on the registry metadata?
