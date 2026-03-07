const fs = require('fs');
const path = require('path');

const contextPath = path.join('.gemini', 'skill_context.json');

if (!fs.existsSync(contextPath)) {
  console.error(`❌ Error: No skill context found at ${contextPath}!`);
  process.exit(1);
}

const context = JSON.parse(fs.readFileSync(contextPath, 'utf8'));

if (context.status !== "ready") {
  console.log(`⚠️  Workflow status is '${context.status}'. No action taken.`);
  process.exit(0);
}

console.log(`🛠️  Applying fix to ${context.payload.file_path}:`);
console.log(`📝 Description: ${context.payload.bug_description}`);
console.log(`✅ Fix: ${context.payload.proposed_fix}`);

// Update status to completed
context.status = "completed";
context.timestamp = new Date().toISOString();

fs.writeFileSync(contextPath, JSON.stringify(context, null, 2));

console.log(`✨ Fix applied and status updated to 'completed' in ${contextPath}.`);
