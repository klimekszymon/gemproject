## v1.4.0 (2026-03-06)

### Features
- **Governance**: Implemented full `registry.json` manifest with 14 indexed skills.
- **Sync Logic**: Added `sync-skills.js` and `validate-registry.js` for automated ecosystem audits.
- **Unified Indexing**: Refactored `update-index.js` to build `skills/README.md` from the central registry.
- **Hydration**: Added `hydrate-registry.sh` for bulk workspace initialization.
- **Architecture**: Created `docs/registry-architecture.md` with Mermaid diagrams and prompt patterns.

### Refactor
- Consolidated all registry-related scripts into the `registry-manager` skill folder.
- Synchronized version metadata across all 14 skill `SKILL.md` files.


---

## v1.3.0 (2026-03-06)

### New Features
- Added `docs/git-helper-workflow.md`: A Mermaid-powered breakdown of the `git-helper` skill's workflow and educational analysis.
- Updated `skills/github-notifier/scripts/post-issue.js`: Refined script logic for posting issues.

### Refactor
- Cleaned up redundant `api-standards-skill` in the root (migrated to `skills/api-standards`).


---

## v1.2.0 (2026-03-05)

# Changelog Draft

- Improved RegistryManager with linking and indexing.
- Enhanced skill-creator with automatic workspace linking.
- Implemented full Git Release Pipeline (summarizer, bumper, helper).
- Added tag-release.js and push-release.js scripts.
- Refined git-helper SKILL.md for release management.

---

