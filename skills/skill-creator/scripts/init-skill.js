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
const assetsDir = path.join(__dirname, '../assets');

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

    // 3. Copy all assets
    if (fs.existsSync(assetsDir)) {
        const assetFiles = fs.readdirSync(assetsDir);
        assetFiles.forEach(file => {
            const src = path.join(assetsDir, file);
            const dest = path.join(skillDir, file.replace('.template', ''));
            fs.copyFileSync(src, dest);
        });
    }

    const RegistryManager = require('../../../index');

    // 4. Link and Index via RegistryManager
    const linkResult = RegistryManager.linkSkill(skillDir);
    RegistryManager.generateIndex();

    console.log(JSON.stringify({
        success: true,
        path: skillDir,
        message: `Skill '${name}' scaffolded and linked: ${linkResult.message}`
    }));

} catch (error) {
    console.log(JSON.stringify({ error: error.message }));
}

