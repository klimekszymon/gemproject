const { execSync } = require('child_process');

try {
    // Get git status summary
    const gitStatus = execSync('git status --short').toString() || "No changes tracked by git.";

    // Get last 3 commit messages
    const lastCommits = execSync('git log -n 3 --oneline').toString() || "No recent commits.";

    const report = {
        timestamp: new Date().toISOString(),
        modifiedFiles: gitStatus.split('\n').filter(line => line.trim()),
        recentHistory: lastCommits.split('\n').filter(line => line.trim())
    };

    console.log(JSON.stringify(report, null, 2));
} catch (error) {
    console.log(JSON.stringify({ error: "Git not initialized or command failed" }));
}