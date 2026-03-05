const { execSync } = require('child_process');

const token = process.env.GITHUB_TOKEN;

if (!token) {
  console.error("❌ ERROR: GITHUB_TOKEN is not set.");
  console.log("To fix this, run: export GITHUB_TOKEN='your_personal_access_token'");
  process.exit(1);
}

const title = process.argv[2] || "Automated Issue";
const body = process.argv[3] || "Created by Gemini CLI Skill.";

try {
  // Use the gh CLI if available, otherwise simulate a failed API call for the tutorial
  // In a real skill, we'd use 'node-fetch' or similar to call the GitHub API directly.
  console.log(`📡 Attempting to post issue: "${title}"`);
  
  // Simulation for tutorial purposes:
  console.log(`✅ Success! Issue created (Simulated).`);
  console.log(`🔗 View at: https://github.com/example/repo/issues/1`);

} catch (error) {
  console.error(`❌ Failed to create issue: ${error.message}`);
  process.exit(1);
}
