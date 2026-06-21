---
name: hermes-tweet
description: "Use Hermes Tweet with Hermes Agent for X/Twitter research, read workflows, and gated actions."
version: "0.1.6"
---

# Instructions
Use this skill when a user asks Hermes Agent to work with X/Twitter through the Hermes Tweet plugin.

## Source
- Canonical plugin: https://github.com/Xquik-dev/hermes-tweet
- Install and runtime behavior are defined by the plugin manifest and bundled Hermes skill in that repository.

## Operating Rules
1. Use `tweet_explore` for public discovery and planning. It must remain available without network or credentials.
2. Use `tweet_read` only when `XQUIK_API_KEY` is configured.
3. Use `tweet_action` only when `XQUIK_API_KEY` is configured and `HERMES_TWEET_ENABLE_ACTIONS` is set to `true`.
4. Ask for confirmation before any action that posts, follows, likes, reposts, deletes, or changes account state.
5. Never expose API keys, cookies, private account identifiers, or private runtime logs in responses.
6. Prefer concise JSON-ready inputs and return clear summaries with source URLs when available.

## Validation
1. Run `node skills/hermes-tweet/scripts/verify-hermes-tweet.js` from the repository root to print the canonical source and required safety gates.
2. Before changing runtime behavior, compare against the Hermes Tweet repository tests and public safety checks.
