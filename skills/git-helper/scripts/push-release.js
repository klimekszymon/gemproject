const { execSync } = require('child_process');

try {
  // 1. Determine current branch
  const currentBranch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
  console.log(`🚀 Pushing ${currentBranch} and tags to origin...`);

  // 2. Push branch and tags
  execSync(`git push origin ${currentBranch} --tags`);

  console.log(`✅ Push complete! Release is live.`);
} catch (error) {
  console.error(`❌ Push failed: ${error.message}`);
  process.exit(1);
}
