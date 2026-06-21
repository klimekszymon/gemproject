const source = 'https://github.com/Xquik-dev/hermes-tweet';
const gates = [
  'tweet_explore: credential-free discovery and planning',
  'tweet_read: requires XQUIK_API_KEY',
  'tweet_action: requires XQUIK_API_KEY and HERMES_TWEET_ENABLE_ACTIONS=true',
  'actions: require explicit user confirmation before account changes',
];

process.stdout.write([
  'Hermes Tweet source: ' + source,
  'Required safety gates:',
  ...gates.map((gate) => '- ' + gate),
].join('\n') + '\n');
