# Task 8: Registry Automation (Generating the Index)

As your Skill Registry grows from 3 skills to 30, it becomes impossible for team members to remember what's available. In this task, you will build an automation script that scans your `skills/` directory and generates a centralized `README.md` index.

---

## Part 1: Educational - The Discoverability Problem

A repository of folders is not a "Registry" until it has a searchable index. Automation is key because:
1.  **Manual Updates Fail**: Developers will forget to update the main README when they add a new skill.
2.  **Consistency**: An automated script ensures that every skill is described using its own metadata (`SKILL.md` frontmatter), preventing "documentation drift."
3.  **Scale**: Whether you have 5 skills or 500, the index is always up to date.

---

## Part 2: Practical - Building the Registry Indexer

We will create a script that reads all skills and generates a clean Markdown table.

### 1. Create the Global Scripts Directory
```bash
mkdir -p scripts
```

### 2. Create the Indexer Script
Create `scripts/generate-registry-index.js`:
```javascript
const fs = require('fs');
const path = require('path');

const skillsDir = path.join(__dirname, '../skills');
const outputFile = path.join(skillsDir, 'README.md');

function getSkillMeta(skillPath) {
    const skillMdPath = path.join(skillPath, 'SKILL.md');
    if (!fs.existsSync(skillMdPath)) return null;

    const content = fs.readFileSync(skillMdPath, 'utf8');
    const nameMatch = content.match(/name:\s*(.+)/);
    const descMatch = content.match(/description:\s*"(.+)"/);

    return {
        name: nameMatch ? nameMatch[1].trim() : path.basename(skillPath),
        description: descMatch ? descMatch[1].trim() : 'No description provided.'
    };
}

const skills = fs.readdirSync(skillsDir)
    .map(name => path.join(skillsDir, name))
    .filter(p => fs.statSync(p).isDirectory())
    .map(getSkillMeta)
    .filter(meta => meta !== null);

let markdown = `# 🛠️ Team Skill Registry Index\n\n`;
markdown += `This is an auto-generated index of all available agent skills.\n\n`;
markdown += `| Skill Name | Description | Install Command |\n`;
markdown += `| :--- | :--- | :--- |\n`;

skills.forEach(skill => {
    const installCmd = `gemini skills install ./skills/${skill.name}`;
    markdown += `| **${skill.name}** | ${skill.description} | \`${installCmd}\` |\n`;
});

markdown += `\n\n*Last updated: ${new Date().toUTCString()}*`;

fs.writeFileSync(outputFile, markdown);
console.log('✅ Registry index generated at skills/README.md');
```

### 3. Run the Indexer
Execute the script to see it in action:
```bash
node scripts/generate-registry-index.js
```

---

## Part 3: Integrating with the Meta-Skill

To make this truly powerful, we should update our `skill-creator` (from Task 7) to run this indexer every time a new skill is scaffolded.

### Update `skills/skill-creator/scripts/init-skill.js`:
Add these lines at the end of your `init-skill.js` (inside the `try` block):
```javascript
const { execSync } = require('child_process');
execSync('node scripts/generate-registry-index.js');
```

---

## Self-Check: Milestone 8
- [ ] Does `skills/README.md` exist?
- [ ] Does it list your `api-standards-guide`, `handoff-agent`, `skill-creator`, and `git-helper`?
- [ ] Create a new dummy skill using the `skill-creator` and verify that the README updates automatically!

*Next Task: Task 9 - CI/CD and Quality Gates.*
