const fs = require('fs');
const path = require('path');

/**
 * sync-skills.js
 * 
 * Compares local skill metadata against the central registry.json.
 * This ensures all team members are using the correct versions and
 * warns about deprecated skills.
 */

const registryPath = path.join(__dirname, '../../../registry.json');
const skillsDir = path.join(__dirname, '../../');

if (!fs.existsSync(registryPath)) {
  console.error('❌ Error: registry.json not found in root.');
  process.exit(1);
}

const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));

console.log(`🔍 Synchronizing with '${registry.registry_name}' (Last Updated: ${registry.last_updated})\n`);

let driftDetected = false;

Object.entries(registry.skills).forEach(([name, meta]) => {
  const localSkillPath = path.join(skillsDir, name, 'SKILL.md');

  // Check if skill exists locally
  if (!fs.existsSync(localSkillPath)) {
    console.log(`⚪ [Missing] ${name}: Found in registry but not installed locally.`);
    driftDetected = true;
    return;
  }

  // Read local version from front-matter (simplified for this tutorial)
  const localContent = fs.readFileSync(localSkillPath, 'utf8');
  const versionMatch = localContent.match(/version:\s*["']?([\d.]+)["']?/);
  const localVersion = versionMatch ? versionMatch[1] : '0.0.0';

  if (meta.status === 'deprecated') {
    console.warn(`⚠️  [Deprecated] ${name}: v${localVersion} (Local) is deprecated. Switch to: ${meta.alternative}`);
    driftDetected = true;
  } else if (localVersion !== meta.version) {
    console.warn(`❌ [Mismatch] ${name}: v${localVersion} (Local) vs v${meta.version} (Registry)`);
    driftDetected = true;
  } else {
    console.log(`✅ [In-Sync] ${name}: v${localVersion}`);
  }
});

if (!driftDetected) {
  console.log('\n🌟 All local skills are perfectly synchronized with the registry.');
} else {
  console.log('\n🚩 Drift detected. Use "update-skill.js <name>" to fix mismatches.');
}
