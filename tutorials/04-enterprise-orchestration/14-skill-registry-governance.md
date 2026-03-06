# Task 14: Skill Registry Governance

In this task, we'll learn how to manage a growing skill library. We'll explore versioning, deprecation policies, and how to keep a distributed team's local skills in sync with a central registry.

---

## Part 1: Educational - The Governance Model

1.  **Semantic Versioning for Skills**: Just like software, skills should have versions. Major (breaking instruction changes), Minor (new scripts), and Patch (refinements).
2.  **Deprecation Policy**: How do we tell users to stop using an old, insecure, or inefficient skill?
3.  **Registry Sync**: Ensuring every developer has the latest "official" version of a skill in their `~/.gemini/skills/` directory.

---

## Part 2: Practical - Building a `registry-sync.js`

We'll create a script that:
-   Reads a `registry.json` manifest.
-   Checks the local `.gemini/skills` versions.
-   Prompts the user to update if a mismatch is found.

### Example Manifest Structure (`registry.json`):
```json
{
  "skills": {
    "git-helper": {
      "version": "1.3.0",
      "path": "skills/git-helper",
      "status": "active"
    },
    "old-auth-skill": {
      "version": "0.1.0",
      "path": "skills/deprecated/old-auth",
      "status": "deprecated",
      "alternative": "new-auth-pro"
    }
  }
}
```

---

## Part 3: Skill Implementation - The `registry-manager`

### **`SKILL.md` (Snippet):**
```markdown
# Instructions
1. Run `scripts/sync.js` to compare local skills with the central registry.
2. If a skill is marked as `deprecated`, warn the user and suggest the `alternative`.
3. If a local version is behind, offer to run `scripts/update-skill.js <name>`.
```

---

## Self-Check: Milestone 14
- [ ] Do you have a central `registry.json` file in the root?
- [ ] Does your `git-helper` skill have a version field in its metadata?
- [ ] Can your sync script identify a version mismatch?
