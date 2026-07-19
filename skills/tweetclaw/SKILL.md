---
name: tweetclaw
description: "Uses TweetClaw for X/Twitter scraping, search, posting, monitoring, media, DMs, webhooks, and OpenClaw agent tools."
version: "1.0.0"
---

# Instructions
Use TweetClaw when a user needs X/Twitter automation from an agent workflow.

## Use Cases
1. Scrape tweets, run a tweet scraper, or search tweets and replies.
2. Post tweets or tweet replies only after explicit user approval.
3. Export followers, look up users, and inspect public account data.
4. Upload or download media tied to X/Twitter workflows.
5. Send or inspect direct messages when the user has configured access.
6. Monitor tweets, route webhooks, and run giveaway draws.
7. Install the OpenClaw plugin when the user wants native OpenClaw tools.

## Workflow
1. **Classify**: Run `node skills/tweetclaw/scripts/classify-request.js "<request>"` to identify the closest TweetClaw workflow.
2. **Confirm Scope**: Separate read-only actions from writes, DMs, media uploads, and account changes.
3. **Configure**: Use the official package or OpenClaw plugin instructions from:
   - `https://github.com/Xquik-dev/tweetclaw`
   - `https://www.npmjs.com/package/@xquik/tweetclaw`
4. **Execute Safely**: Keep credentials in the user's approved secret store. Never paste keys into chat, issue text, or scripts.
5. **Report**: Return the action taken, key IDs or URLs, and any rate-limit or permission blocker.

## Guardrails
- Treat X/Twitter writes, direct messages, media uploads, and giveaway draws as approval-required.
- Do not claim an action completed unless TweetClaw returns a successful result.
- Prefer exact tweet, user, list, and media IDs over ambiguous natural-language references.
- Respect platform rules, user consent, and workspace credential boundaries.

# Tools & Scripts
- `node skills/tweetclaw/scripts/classify-request.js "<request>"`: Classifies a user request into TweetClaw workflow categories.
