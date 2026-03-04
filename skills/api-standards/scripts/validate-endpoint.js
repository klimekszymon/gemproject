const endpoint = process.argv[2];

if (!endpoint) {
    console.log(JSON.stringify({ error: "No endpoint provided" }));
    process.exit(1);
}

// Simple check: Must be plural-ish (ends in s) and use kebab-case
const isKebab = /^[a-z0-9-]+$/.test(endpoint);
const isPlural = endpoint.endsWith('s');

const result = {
    endpoint: endpoint,
    valid: isKebab && isPlural,
    checks: {
        isKebabCase: isKebab,
        isPlural: isPlural
    }
};

console.log(JSON.stringify(result));