const fs = require('fs');
const path = require('path');

const logPath = path.join(process.cwd(), 'logs', 'session_telemetry.json');

// 1. Fix: Robust Error Handling & Fallback
if (!fs.existsSync(logPath)) {
  console.log('No telemetry data available yet.');
  process.exit(0);
}

try {
  const data = fs.readFileSync(logPath, 'utf8');
  if (!data.trim()) {
    console.log('Telemetry log is empty.');
    process.exit(0);
  }

  const logs = JSON.parse(data);

  // 3. Fix: Added Turns Saved (ROI) to aggregation
  const stats = logs.reduce((acc, log) => {
    const id = log.skill_id || 'unknown';
    acc[id] = acc[id] || { count: 0, success: 0, tokens: 0, turns_saved: 0 };
    acc[id].count++;
    if (log.status === 'success') acc[id].success++;
    acc[id].tokens += (log.metrics?.tokens_used || 0);
    acc[id].turns_saved += (log.metrics?.turns_saved || 0);
    return acc;
  }, {});

  // Calculate final metrics for display
  const finalStats = Object.keys(stats).map(id => ({
    Skill: id,
    Activations: stats[id].count,
    'Success %': ((stats[id].success / stats[id].count) * 100).toFixed(1) + '%',
    'Avg Tokens': Math.round(stats[id].tokens / stats[id].count),
    'Total Turns Saved': stats[id].turns_saved
  }));

  console.table(finalStats);
} catch (error) {
  console.error('CRITICAL: Telemetry parse error:', error.message);
  process.exit(1);
}
