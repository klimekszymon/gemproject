const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const pkgPath = path.join(__dirname, '../../../package.json');
const draftPath = path.join(__dirname, '../../../CHANGELOG_DRAFT.md');
const finalChangelogPath = path.join(__dirname, '../../../CHANGELOG.md');

if (!fs.existsSync(pkgPath)) {
  console.error('❌ Error: package.json not found.');
  process.exit(1);
}

const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
const version = `v${pkg.version}`;

try {
  // 1. Finalize CHANGELOG.md
  let draftContent = '';
  if (fs.existsSync(draftPath)) {
    draftContent = fs.readFileSync(draftPath, 'utf8');
    const existingContent = fs.existsSync(finalChangelogPath) ? fs.readFileSync(finalChangelogPath, 'utf8') : '';
    const newContent = `## ${version} (${new Date().toISOString().split('T')[0]})\n\n${draftContent}\n\n---\n\n${existingContent}`;
    fs.writeFileSync(finalChangelogPath, newContent);
    console.log(`✅ Appended draft to CHANGELOG.md.`);
  }

  // 2. Commit the release changes (package.json and CHANGELOG.md)
  console.log(`📦 Committing release ${version}...`);
  execSync(`git add package.json CHANGELOG.md`);
  execSync(`git commit -m "chore(release): ${version}"`);

  // 3. Create the Tag
  console.log(`🏷️  Tagging ${version}...`);
  // Use the draft content as the tag message, or a default one
  const tagMsg = draftContent ? draftContent.replace(/"/g, '\\"') : `Release ${version}`;
  execSync(`git tag -a ${version} -m "${tagMsg}"`);

  // 4. Cleanup
  if (fs.existsSync(draftPath)) fs.unlinkSync(draftPath);

  console.log(`✅ Release ${version} tagged successfully.`);
} catch (error) {
  console.error(`❌ Failed to complete release tagging: ${error.message}`);
  process.exit(1);
}
