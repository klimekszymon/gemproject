const fs = require('fs');
const path = require('path');

const type = process.argv[2]; // 'major', 'minor', or 'patch'

if (!['major', 'minor', 'patch'].includes(type)) {
  console.error('❌ Error: Please specify a release type: major, minor, or patch.');
  process.exit(1);
}

const pkgPath = path.join(__dirname, '../../../package.json');
if (!fs.existsSync(pkgPath)) {
  console.error('❌ Error: package.json not found in the root directory.');
  process.exit(1);
}

const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
let [major, minor, patch] = pkg.version.split('.').map(Number);

if (type === 'major') {
  major++;
  minor = 0;
  patch = 0;
} else if (type === 'minor') {
  minor++;
  patch = 0;
} else {
  patch++;
}

pkg.version = `${major}.${minor}.${patch}`;
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');

console.log(`✅ Version bumped to ${pkg.version}. Ready for Skill: git-helper to tag this release.`);
