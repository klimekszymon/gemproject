const fs = require('fs');
const path = require('path');

/**
 * update-index.js
 * 
 * Generates the skills/README.md based on the registry.json manifest.
 * This is the public face of the registry.
 */

const registryPath = path.join(__dirname, '../../../registry.json');
const outputFile = path.join(__dirname, '../../../skills/README.md');

if (!fs.existsSync(registryPath)) {
  console.error('❌ Error: registry.json not found.');
  process.exit(1);
}

const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));

let markdown = `# 🛠️ Team Skill Registry Index\n\n`;
markdown += `This is an auto-generated index of all available agent skills based on the official registry.\n\n`;
markdown += `| Skill Name | Version | Description | Install Command |\n`;
markdown += `| :--- | :--- | :--- | :--- |\n`;

// Sort skills alphabetically for the index
const sortedSkills = Object.entries(registry.skills).sort(([a], [b]) => a.localeCompare(b));

sortedSkills.forEach(([name, meta]) => {
    // Only show active and deprecated skills in the index
    if (meta.status === 'eol') return;

    const installCmd = `gemini skills install ./${meta.path}`;
    const statusNote = meta.status === 'deprecated' ? ' ⚠️ [DEPRECATED]' : '';
    
    markdown += `| **${name}** | v${meta.version} | ${meta.description}${statusNote} | \`${installCmd}\` |\n`;
});

markdown += `\n\n*Last updated: ${new Date().toUTCString()} (Registry v${registry.version || '1.0.0'})*`;

fs.writeFileSync(outputFile, markdown);
console.log(`✅ Registry index updated successfully in skills/README.md (${sortedSkills.length} skills indexed)`);
