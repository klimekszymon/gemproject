# Task 11: Orchestration & Chaining (Multi-Skill Workflows)

In this lesson, you will learn how to design skills that **handoff** to each other. This is the secret to building "Agentic Teams" where each skill acts as a specialist in a larger pipeline.

---

## Part 1: Educational - The "Chain-of-Command" Pattern

The most reliable way to chain skills is the **Explicit Handoff**. You don't just hope the agent finds the next skill; you tell it exactly when and how to switch.

### The Logic of a Handoff
1.  **State Completion**: Skill A completes its specific task (e.g., writing a file).
2.  **Instructional Trigger**: Skill A's `SKILL.md` contains a rule: "If Task X is done, use Skill B to do Task Y."
3.  **Discovery**: Because Skill B is in the registry, the agent sees its description and activates it.

---

## Part 2: Practical - The "Release Pipeline" Scenario

We will design a handoff between two new skills: **`release-summarizer`** and **`version-bumper`**.

### 1. Skill A: `release-summarizer`
This skill creates a `CHANGELOG.md` from git logs.

**`skills/release-summarizer/SKILL.md` (Snippet):**
```markdown
---
name: release-summarizer
description: Generates a changelog from git history. Use when the user wants to prepare for a new release.
---

# Instructions
1. Run `git log --oneline -n 10` to get the latest changes.
2. Format these into a new file named `CHANGELOG_DRAFT.md`.
3. **CRITICAL HANDOFF**: Once `CHANGELOG_DRAFT.md` is created, **immediately activate the `version-bumper` skill** to increment the project version based on these changes.
```

### 2. Skill B: `version-bumper`
This skill reads the draft and updates `package.json`.

**`skills/version-bumper/SKILL.md` (Snippet):**
```markdown
---
name: version-bumper
description: Increments project version in package.json. Use after a changelog has been drafted.
---

# Instructions
1. Read `CHANGELOG_DRAFT.md` to determine if this is a 'patch', 'minor', or 'major' release.
2. Execute `scripts/bump.js <type>` to update the version.
3. Inform the user that the version is bumped and ready for a git tag.
```

---

## Part 3: The Script - Deterministic State Checking

In a chained workflow, your scripts should output "handoff-ready" text to help the agent transition.

**Example `skills/version-bumper/scripts/bump.js` (Snippet):**
```javascript
const fs = require('fs');
const type = process.argv[2]; // 'patch', 'minor', or 'major'

const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
let [major, minor, patch] = pkg.version.split('.').map(Number);

if (type === 'major') major++;
else if (type === 'minor') minor++;
else patch++;

pkg.version = `${major}.${minor}.${patch}`;
fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));

// This output tells the agent the job is done and what happened.
console.log(`✅ Version bumped to ${pkg.version}. Ready for Skill: git-helper to tag this release.`);
```

---

## Part 4: Design Challenge - Implement the Handoff

1.  Create the folders for `release-summarizer` and `version-bumper`.
2.  Implement the `SKILL.md` files as shown above.
3.  Trigger the flow by saying: *"Hey, summarize my recent changes for a new release."*
4.  Watch the agent generate the changelog (Skill A) and then automatically switch to bumping the version (Skill B).

---

## Self-Check: Milestone 11
- [ ] Do your `SKILL.md` instructions explicitly name the next skill to use?
- [ ] Does your first skill leave behind a "file-based state" (like `CHANGELOG_DRAFT.md`) for the second skill to pick up?
- [ ] Can the second skill be triggered *independently* if the user already has a draft?

**Next Task: Task 12 - Secrets and Environments.**
