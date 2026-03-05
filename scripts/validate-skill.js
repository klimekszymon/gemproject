const fs = require('fs');
const path = require('path');

const skillPath = process.argv[2];

if (!skillPath || !fs.existsSync(skillPath)) {
    console.error("❌ Please provide a valid path to a skill folder.");
    process.exit(1);
}

const skillMdPath = path.join(skillPath, 'SKILL.md');
const errors = [];

// Check 1: SKILL.md Existence
if (!fs.existsSync(skillMdPath)) {
    errors.push("Missing SKILL.md file.");
} else {
    const content = fs.readFileSync(skillMdPath, 'utf8');

    // Check 2: Frontmatter Meta
    const nameMatch = content.match(/name:\s*(.*)/);
    const descMatch = content.match(/description:\s*(.*)/);
    if (!nameMatch || !descMatch) {
        errors.push("SKILL.md is missing 'name' or 'description' in frontmatter.");
    } else {
        // Check 2b: Description length
        const description = descMatch[1].trim();
        if (description.length > 200) {
            errors.push("'description' in SKILL.md frontmatter exceeds 200 characters.");
        }
    }

    // Check 3: Instructions Section
    if (!content.includes('# Instructions')) {
        errors.push("SKILL.md is missing an '# Instructions' section.");
    }
}

// Check 4: Folder Structure
const scriptsDir = path.join(skillPath, 'scripts');
if (!fs.existsSync(scriptsDir)) {
    errors.push("Missing 'scripts/' directory.");
}

// Result
if (errors.length > 0) {
    console.log(`❌ Validation Failed for ${path.basename(skillPath)}:`);
    errors.forEach(err => console.log(`   - ${err}`));
    process.exit(1);
} else {
    console.log(`✅ ${path.basename(skillPath)} passed all quality checks.`);
    process.exit(0);
}