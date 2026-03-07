const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * update-skill.js
 * 
 * Targetedly updates or installs a specific skill from the workspace
 * to the agent's internal skill directory.
 */

const skillName = process.argv[2];

if (!skillName) {
  console.error('❌ Error: Please provide a skill name (e.g., node update-skill.js telemetry-analyst)');
  process.exit(1);
}

const skillPath = path.join(__dirname, '../../../skills', skillName);

if (!fs.existsSync(skillPath)) {
  console.error(`❌ Error: Skill directory not found at ${skillPath}`);
  process.exit(1);
}

if (!fs.existsSync(path.join(skillPath, 'SKILL.md'))) {
  console.error(`❌ Error: No SKILL.md found in ${skillPath}`);
  process.exit(1);
}

console.log(`🚀 Updating skill: ${skillName}...`);

try {
  // Execute the link command non-interactively
  const output = execSync(`gemini skills link "${skillPath}" --scope workspace --consent`, { encoding: 'utf8' });
  console.log(output);
  console.log(`✅ Successfully updated ${skillName}!`);
} catch (error) {
  console.error(`❌ Failed to update ${skillName}:`, error.message);
  process.exit(1);
}
