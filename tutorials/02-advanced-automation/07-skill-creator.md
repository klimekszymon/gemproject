# Task 7: Advanced - Meta-Skills (The "Skill Creator")

In previous tasks, you manually created folders, `SKILL.md` files, and scripts. This is slow and prone to errors. A **Meta-Skill** is a skill that automates the creation or management of other skills.

---

## Part 1: Educational - Automation at Scale

When your team grows, you want every developer to be able to create a skill in seconds. To do this, we create a "Skill Creator" agent that:
1.  **Scaffolds**: Creates the folder structure (`scripts/`, `references/`).
2.  **Templates**: Generates a high-quality `SKILL.md` with the correct frontmatter.
3.  **Standardizes**: Ensures every skill follows the same naming and organization rules.

---

## Part 2: Practical - Building the "Skill Creator"

We will build a skill called `skill-creator` that automates the work you did in Tasks 2 and 3.

### 1. Create the Meta-Skill Directory
```bash
mkdir -p skills/skill-creator/scripts
```

### 2. Create the Scaffolding Script
This script will take a name and description and build the skill folder.

Create `skills/skill-creator/scripts/init-skill.js`:
```javascript
const fs = require('fs');
const path = require('path');

const name = process.argv[2];
const description = process.argv[3];

if (!name || !description) {
    console.log(JSON.stringify({ error: "Missing name or description" }));
    process.exit(1);
}

const skillDir = path.join('skills', name);
const skillMdPath = path.join(skillDir, 'SKILL.md');

try {
    // 1. Create Directories
    fs.mkdirSync(path.join(skillDir, 'scripts'), { recursive: true });
    fs.mkdirSync(path.join(skillDir, 'references'), { recursive: true });

    // 2. Create SKILL.md Template
    const template = `---
name: ${name}
description: "${description}"
---

# Instructions
You are the ${name} agent. Your goal is to...

# Tools & Scripts
(List your scripts here)
`;

    fs.writeFileSync(skillMdPath, template);

    console.log(JSON.stringify({ 
        success: true, 
        path: skillDir,
        message: `Skill '${name}' scaffolded successfully.`
    }));
} catch (error) {
    console.log(JSON.stringify({ error: error.message }));
}
```

### 3. Create the `SKILL.md`
The `skill-creator` needs to understand its role as an architect.

Create `skills/skill-creator/SKILL.md`:
```markdown
---
name: skill-creator
description: "A meta-skill that helps developers scaffold and build new AI Agent Skills."
---

# Instructions
You are an expert in AI Agent Skill architecture.
When the user says they want to create a new skill:
1. Ask for the **name** and a **short description** if they haven't provided them.
2. Execute the `init-skill.js` script using `node`.
3. Inform the user that the folders and `SKILL.md` have been created.
4. Suggest what should be put in the `instructions` section of the new `SKILL.md` based on the skill's purpose.
```

### 4. Link the Meta-Skill
```bash
gemini skills link ./skills/skill-creator
```

---

## Part 3: Testing the Meta-Skill

Now, let's use your meta-skill to create a *third* skill!
Try saying:
> "I want to create a new skill called `git-helper` that helps with common git commands."

The `skill-creator` should:
1.  Run the script.
2.  Create `skills/git-helper/`.
3.  Provide suggestions for how to write the `git-helper` instructions.

---

## Self-Check: Milestone 7
- [ ] Is the `skills/git-helper/` directory created?
- [ ] Does the generated `SKILL.md` have the correct name and description?
- [ ] Do you feel like an AI Agent Architect yet?

*Next Task: Task 8 - Registry Automation (Generating the Index).*
