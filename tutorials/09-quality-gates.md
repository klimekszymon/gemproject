# Task 9: CI/CD and Quality Gates

In a professional environment, you cannot trust that every developer will write a perfect `SKILL.md` or a bug-free script. In this task, you will build a "Quality Gate"—a script that validates skills and can be integrated into a CI/CD pipeline (like GitHub Actions).

---

## Part 1: Educational - What is a Quality Gate?

A **Quality Gate** is an automated check that a skill must pass before it is "merged" into the official registry.

### Why do we need this?
1.  **Instruction Quality**: Ensure the `SKILL.md` isn't empty and has the required frontmatter.
2.  **Script Safety**: Check that scripts don't contain hardcoded secrets or malicious code (basic linting).
3.  **Consistency**: Ensure the folder structure follows the `skills/<name>/scripts` and `skills/<name>/references` pattern.

---

## Part 2: Practical - Building the Skill Validator

We will create a script that "audits" a skill and returns a pass/fail report.

### 1. Create the Validator Script
Create `scripts/validate-skill.js`:
```javascript
const fs = require('fs');
const path = require('path');

const skillPath = process.argv[2];

if (!skillPath || !fs.existsSync(skillPath)) {
    console.error("❌ Please provide a valid path to a skill folder.");
    process.exit(1);
}

const skillMdPath = path.join(skillPath, 'SKILL.md');
const errors = [];

// Check 1: SKILL.md Existence
if (!fs.existsSync(skillMdPath)) {
    errors.push("Missing SKILL.md file.");
} else {
    const content = fs.readFileSync(skillMdPath, 'utf8');
    
    // Check 2: Frontmatter Meta
    if (!content.includes('name:') || !content.includes('description:')) {
        errors.push("SKILL.md is missing 'name' or 'description' in frontmatter.");
    }

    // Check 3: Instructions Section
    if (!content.includes('# Instructions')) {
        errors.push("SKILL.md is missing an '# Instructions' section.");
    }
}

// Check 4: Folder Structure
const scriptsDir = path.join(skillPath, 'scripts');
if (!fs.existsSync(scriptsDir)) {
    errors.push("Missing 'scripts/' directory.");
}

// Result
if (errors.length > 0) {
    console.log(`❌ Validation Failed for ${path.basename(skillPath)}:`);
    errors.forEach(err => console.log(`   - ${err}`));
    process.exit(1);
} else {
    console.log(`✅ ${path.basename(skillPath)} passed all quality checks.`);
    process.exit(0);
}
```

### 2. Run the Validator
Try validating your `api-standards` skill:
```bash
node scripts/validate-skill.js ./skills/api-standards
```

Now, try creating a "broken" skill (e.g., a folder with an empty `SKILL.md`) and see it fail.

---

## Part 3: Automated CI Integration

In a real registry, you would add a `package.json` with a test script:

```json
{
  "scripts": {
    "test:skills": "ls -d skills/*/ | xargs -I {} node scripts/validate-skill.js {}"
  }
}
```

Now, every time someone pushes a Pull Request, your CI server runs `npm run test:skills`. If any skill is missing instructions or a name, the build fails and the code cannot be merged.

---

## Self-Check: Milestone 9
- [ ] Does your `validate-skill.js` correctly identify a missing `SKILL.md`?
- [ ] Have all your existing skills (`handoff`, `skill-creator`, `git-helper`) passed the check?
- [ ] (Advanced) Could you add a check to ensure the `description` is under 200 characters?

*Next Task: Task 10 - Asset Management (Boilerplates and Templates).*
