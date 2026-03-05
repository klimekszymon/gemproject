const { execSync } = require('child_process');

const type = process.argv[2]; // feat, fix, chore, docs, style, refactor, test
const message = process.argv.slice(3).join(' ');

const validTypes = ['feat', 'fix', 'chore', 'docs', 'style', 'refactor', 'test'];

if (!type || !validTypes.includes(type)) {
  console.error(`❌ Error: Invalid commit type. Must be one of: ${validTypes.join(', ')}`);
  console.log('Usage: node scripts/smart-commit.js <type> <message>');
  process.exit(1);
}

if (!message || message.length < 5) {
  console.error('❌ Error: Commit message is too short or missing.');
  process.exit(1);
}

try {
  // 1. Check if anything is staged
  const staged = execSync('git diff --cached --name-only').toString().trim();
  if (!staged) {
    console.error('❌ Error: No changes staged for commit. Use "git add" first.');
    process.exit(1);
  }

  // 2. Format the message
  const fullMessage = `${type}: ${message}\n\nCo-authored-by: Gemini-CLI <ai-agent@example.com>`;
  
  // 3. Commit
  execSync(`git commit -m "${fullMessage}"`);
  console.log(`✅ Committed successfully: ${type}: ${message}`);
} catch (error) {
  console.error(`❌ Commit failed: ${error.message}`);
  process.exit(1);
}
