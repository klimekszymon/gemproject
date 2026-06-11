const request = process.argv.slice(2).join(' ').toLowerCase();

const categories = [
  ['search', ['search', 'find', 'query', 'replies']],
  ['scrape', ['scrape', 'scraper', 'extract', 'timeline']],
  ['post', ['post tweet', 'post reply', 'reply to', 'publish', 'send tweet']],
  ['monitor', ['monitor', 'watch', 'webhook', 'alert']],
  ['media', ['media', 'upload', 'download', 'image', 'video']],
  ['direct-messages', ['direct message', 'dm', 'inbox']],
  ['giveaway', ['giveaway', 'draw', 'winner']],
  ['user-lookup', ['follower', 'followers', 'lookup', 'profile', 'user']]
];

const category = categories.find(([, keywords]) =>
  keywords.some((keyword) => request.includes(keyword))
)?.[0] ?? 'general';

process.stdout.write(JSON.stringify({ category }));
