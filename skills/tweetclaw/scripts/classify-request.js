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

const matchesKeyword = (keyword) => {
  const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`\\b${escaped}\\b`).test(request);
};

const category = categories.find(([, keywords]) =>
  keywords.some(matchesKeyword)
)?.[0] ?? 'general';

process.stdout.write(JSON.stringify({ category }));
