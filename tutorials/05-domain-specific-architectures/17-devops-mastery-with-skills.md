# Task 17: DevOps Mastery with Skills

As you scale your AI Agent Skill platform, you can apply these skills to specific domains like **DevOps**. In this task, we will explore how skills can act as CI/CD triggers, monitoring agents, and infrastructure as code (IaC) auditors.

---

## Part 1: Educational - The DevOps Agent

In a modern DevOps environment, AI Agent Skills can bridge the gap between human intent and complex infrastructure operations.

### 1. Pre-Flight Auditing
Instead of waiting for a CI/CD pipeline to fail, a skill can "pre-flight" your changes (e.g., checking a Terraform plan or a Dockerfile) before you even commit your code.

### 2. Monitoring & Incident Response
Skills can be designed to parse logs, identify error patterns, and suggest (or even apply) fixes to infrastructure during an incident.

### 3. CI/CD Triggers
A skill can be the "gatekeeper" that ensures all standards are met (e.g., security, performance, style) before triggering a deployment.

---

## Part 2: The Practical - The `iac-auditor` Skill

We will build a skill that performs a "pre-flight" check on a Terraform-like configuration file to ensure it follows security best practices.

### 1. The Scenario
Imagine you have a file named `main.tf` (or a mock equivalent) that defines cloud resources. The `iac-auditor` skill will check for common security issues like:
- Publicly accessible S3 buckets.
- Open security groups (port 22 or 80 open to the world).
- Missing encryption tags.

---

## Part 3: Ready Scripts (The "Auditor" Pattern)

### 1. `iac-auditor/scripts/preflight-check.js`
This script scans a configuration file for security anti-patterns.

```javascript
const fs = require('fs');

const tfFile = process.argv[2] || 'main.tf';

if (!fs.existsSync(tfFile)) {
  console.error(`❌ Error: File ${tfFile} not found.`);
  process.exit(1);
}

const content = fs.readFileSync(tfFile, 'utf8');
let errors = [];

// Mock audit rules
if (content.includes('public_access = true')) {
  errors.push("🚨 Security Risk: Public access detected in resource configuration.");
}
if (content.includes('0.0.0.0/0') && content.includes('port = 22')) {
  errors.push("🚨 Security Risk: SSH (port 22) is open to the world.");
}
if (!content.includes('encrypted = true')) {
  errors.push("⚠️  Warning: Resource might be missing encryption settings.");
}

if (errors.length > 0) {
  console.log(`🔍 Audit Results for ${tfFile}:`);
  errors.forEach(e => console.log(e));
  console.log("\n❌ Audit FAILED. Please fix the security risks before deployment.");
  process.exit(1);
} else {
  console.log(`✅ Audit PASSED for ${tfFile}. Infrastructure is compliant.`);
}
```

---

## Part 4: Interaction Design (Example Prompts)

**Pattern: The Pre-Flight Check**
> **User**: "Pre-flight check my `main.tf` file before I deploy."
> **Agent**: 
> 1. "Activating `iac-auditor` to scan `main.tf` for security risks..."
> 2. "Audit failed: SSH port 22 is open to the world. Would you like me to fix this by restricting access to your IP?"
> **User**: "Yes, please fix it."
> **Agent**: "Fix applied. Running audit again... ✅ Audit passed."

---

## Part 5: Tasks to Do

### Task 1: Initialize the `iac-auditor` Skill
1.  Create the skill folder: `skills/iac-auditor/`.
2.  Write the `SKILL.md`. It should be triggered by "audit infrastructure," "pre-flight check," or "scan terraform."
3.  Add the `preflight-check.js` script from Part 3.

### Task 2: Create a Mock Infrastructure File
1.  Create a file named `main.tf` in the root directory.
2.  Add some "bad" infrastructure code:
    ```hcl
    resource "aws_s3_bucket" "my_data" {
      bucket = "sensitive-data-bucket"
      public_access = true
    }

    resource "aws_security_group" "ssh_access" {
      name = "allow_ssh"
      ingress {
        from_port = 22
        to_port = 22
        cidr_blocks = ["0.0.0.0/0"]
      }
    }
    ```

### Task 3: Test the DevOps Workflow
1.  Ask the agent: "Run a pre-flight audit on `main.tf`."
2.  The agent should flag the security risks and provide a clear summary.
3.  Fix one of the issues in `main.tf` manually or ask the agent to help.
4.  Run the audit again to verify the fix.

---

## Self-Check: Milestone 17
- [ ] Does the `iac-auditor` skill correctly identify security anti-patterns?
- [ ] Does the script exit with a non-zero code when errors are found?
- [ ] Can the agent guide the user from audit failure to a remediation step?
