const fs = require('fs');
const path = require('path');

const SKILLS_DIR = path.join(__dirname, 'skills');

/**
 * Registry Manager: Core logic for interacting with the Skill Registry.
 */
const RegistryManager = {
  /**
   * Returns a list of all skill folders in the registry.
   */
  listSkills() {
    if (!fs.existsSync(SKILLS_DIR)) return [];
    return fs.readdirSync(SKILLS_DIR)
      .map(name => ({ name, path: path.join(SKILLS_DIR, name) }))
      .filter(item => fs.statSync(item.path).isDirectory());
  },

  /**
   * Validates a skill folder against the registry's quality standards.
   * @param {string} skillPath Path to the skill folder.
   * @returns {Object} { isValid: boolean, errors: string[] }
   */
  validateSkill(skillPath) {
    const errors = [];
    const skillMdPath = path.join(skillPath, 'SKILL.md');

    if (!fs.existsSync(skillMdPath)) {
      errors.push("Missing SKILL.md file.");
    } else {
      const content = fs.readFileSync(skillMdPath, 'utf8');
      const nameMatch = content.match(/name:\s*(.+)/);
      const descMatch = content.match(/description:\s*"*(.+?)"*(\r?\n|$)/);

      if (!nameMatch) errors.push("SKILL.md is missing 'name' in frontmatter.");
      if (!descMatch) errors.push("SKILL.md is missing 'description' in frontmatter.");
      else if (descMatch[1].trim().length > 200) {
        errors.push("'description' in SKILL.md frontmatter exceeds 200 characters.");
      }

      if (!content.includes('# Instructions')) {
        errors.push("SKILL.md is missing an '# Instructions' section.");
      }
    }

    if (!fs.existsSync(path.join(skillPath, 'scripts'))) {
      errors.push("Missing 'scripts/' directory.");
    }

    return { isValid: errors.length === 0, errors };
  },

  /**
   * Links a skill folder to the workspace scope.
   * @param {string} skillPath Path to the skill folder.
   * @returns {Object} { success: boolean, message: string }
   */
  linkSkill(skillPath) {
    const { execSync } = require('child_process');
    try {
      execSync(`gemini skills link "${skillPath}" --scope workspace`);
      return { success: true, message: `Skill at ${skillPath} linked to workspace.` };
    } catch (error) {
      return { success: false, message: error.message };
    }
  },

  /**
   * Rebuilds the skills/README.md index file.
   */
  generateIndex() {
    const skills = this.listSkills()
      .map(s => {
        const skillMdPath = path.join(s.path, 'SKILL.md');
        if (!fs.existsSync(skillMdPath)) return null;

        const content = fs.readFileSync(skillMdPath, 'utf8');
        const nameMatch = content.match(/name:\s*(.+)/);
        const descMatch = content.match(/description:\s*"*(.+?)"*(\r?\n|$)/);

        return {
          name: nameMatch ? nameMatch[1].trim() : s.name,
          description: descMatch ? descMatch[1].trim() : 'No description provided.'
        };
      })
      .filter(meta => meta !== null);

    let markdown = `# 🛠️ Team Skill Registry Index\n\n`;
    markdown += `This is an auto-generated index of all available agent skills.\n\n`;
    markdown += `| Skill Name | Description | Install Command |\n`;
    markdown += `| :--- | :--- | :--- |\n`;

    skills.forEach(skill => {
      const installCmd = `gemini skills install ./skills/${skill.name}`;
      markdown += `| **${skill.name}** | ${skill.description} | \`${installCmd}\` |\n`;
    });

    markdown += `\n\n*Last updated: ${new Date().toUTCString()}*`;
    fs.writeFileSync(path.join(SKILLS_DIR, 'README.md'), markdown);
    return true;
  }
};

module.exports = RegistryManager;

// If run directly, list the skills as a sanity check.
if (require.main === module) {
  const skills = RegistryManager.listSkills();
  console.log(`Registry Manager loaded. Found ${skills.length} skills.`);
  skills.forEach(s => console.log(` - ${s.name}`));
}
