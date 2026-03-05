const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const draftPath = path.join(__dirname, '../../../CHANGELOG_DRAFT.md');

try {
  // 1. Find the last tag
  let lastTag = '';
  try {
    lastTag = execSync('git describe --tags --abbrev=0').toString().trim();
  } catch (e) {
    // No tags found, we'll just look at the last 20 commits or since the first commit
    lastTag = '';
  }

  // 2. Get the log between last tag and HEAD
  let logCmd = '';
  if (lastTag) {
    console.log(`🔍 Comparing current branch to last tag: ${lastTag}`);
    logCmd = `git log ${lastTag}..HEAD --oneline`;
  } else {
    console.log('🔍 No tags found. Summarizing last 20 commits.');
    logCmd = 'git log --oneline -n 20';
  }

  const commits = execSync(logCmd).toString().trim();

  if (!commits) {
    console.log('⚠️ No new commits found since the last tag.');
    process.exit(0);
  }

  // 3. Draft the content
  const draftContent = `# Changelog Draft\n\n${commits.split('\n').map(c => `- ${c}`).join('\n')}\n\n---\n*Generated automatically since ${lastTag || 'initial commit'}*`;

  fs.writeFileSync(draftPath, draftContent);
  console.log(`✅ Draft created at ${draftPath}`);

} catch (error) {
  console.error(`❌ Summary failed: ${error.message}`);
  process.exit(1);
}
