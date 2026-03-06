const fs = require('fs');
const path = require('path');

/**
 * validate-registry.js
 * 
 * Audits the registry.json for structural integrity.
 * Ensures all paths exist and versions are present.
 */

const registryPath = path.join(__dirname, '../../../registry.json');
const rootDir = path.join(__dirname, '../../../');

if (!fs.existsSync(registryPath)) {
  console.error('❌ Error: registry.json not found.');
  process.exit(1);
}

const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
let errors = 0;

console.log(`🛡️  Auditing Registry Integrity...\n`);

Object.entries(registry.skills).forEach(([name, meta]) => {
  // 1. Check Path
  const fullPath = path.join(rootDir, meta.path);
  if (!fs.existsSync(fullPath)) {
    console.error(`❌ ERROR: Path '${meta.path}' for skill '${name}' does not exist.`);
    errors++;
  }

  // 2. Check Version
  if (!meta.version || !/^(\d+\.)?(\d+\.)?(\*|\d+)$/.test(meta.version)) {
    console.error(`❌ ERROR: Skill '${name}' has an invalid or missing version: ${meta.version}`);
    errors++;
  }

  // 3. Check Status
  const validStatus = ['active', 'deprecated', 'eol'];
  if (!validStatus.includes(meta.status)) {
    console.error(`❌ ERROR: Skill '${name}' has an unknown status: ${meta.status}`);
    errors++;
  }
});

if (errors === 0) {
  console.log(`✅ Registry validated! ${Object.keys(registry.skills).length} skills are correctly indexed.`);
} else {
  console.error(`\n🚨 Validation FAILED: ${errors} errors found. Please fix registry.json.`);
  process.exit(1);
}
