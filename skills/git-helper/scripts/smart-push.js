const { execSync } = require('child_process');

// 1. Get branch and remote from arguments or defaults
let remote = process.argv[2] || 'origin';
let branch = process.argv[3];

try {
  // 2. Default branch to the current branch if not provided
  if (!branch) {
    branch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
  }

  // 3. Verify remote exists
  const remotes = execSync('git remote').toString();
  if (!remotes.includes(remote)) {
    console.error(`❌ Error: Remote '${remote}' not found in the repository.`);
    process.exit(1);
  }

  // 4. Handle Authentication (Task 12: Secrets)
  const token = process.env.GITHUB_TOKEN;
  let pushUrl = remote;

  if (token) {
    console.log(`🔐 Using GITHUB_TOKEN for authentication...`);
    // Get the remote URL and inject the token
    const remoteUrl = execSync(`git remote get-url ${remote}`).toString().trim();
    if (remoteUrl.startsWith('https://github.com/')) {
      pushUrl = remoteUrl.replace('https://github.com/', `https://${token}@github.com/`);
    }
  }

  // 5. Push branch and tags
  console.log(`🚀 Pushing ${branch} to ${remote}...`);
  execSync(`git push "${pushUrl}" ${branch} --tags`, { stdio: 'inherit' });

  console.log(`✅ Push complete to ${remote}/${branch}.`);
} catch (error) {
  console.error(`❌ Push failed: ${error.message}`);
  process.exit(1);
}
