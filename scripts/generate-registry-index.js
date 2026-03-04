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