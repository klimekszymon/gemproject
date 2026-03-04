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

    // 3. Update the Registry Index
    const { execSync } = require('child_process');
    execSync('node scripts/generate-registry-index.js');

} catch (error) {
    console.log(JSON.stringify({ error: error.message }));
}

