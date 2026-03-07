## v1.6.0 (2026-03-07)

### 🚀 New Tutorials
- **Task 16: Inter-Skill Communication**: Advanced chaining via shared state and JSON contexts.
- **Task 17: DevOps Mastery with Skills**: Skills as CI/CD triggers and IaC auditors.
- **Task 18: Front-End UI Generation Skills**: Scaffolding from design tokens and CSS auditing.

### 🛠️ New Skills
- **`issue-analyzer`**: Diagnoses code issues and generates a diagnostic payload.
- **`code-fixer`**: Executes fixes based on `issue-analyzer` output.

### 📝 Documentation
- Updated `tutorials/README.md` and `FUTURE_BLOCKS.md` to reflect Phase 4 and 5 progress.

---

## v1.5.0 (2026-03-07)

### Features
- **Telemetry**: Implemented `telemetry-analyst` skill for performance monitoring.
- **Optimization**: Refined `registry-manager` workflow for faster skill discovery.
- **Tutorials**: Added Task 15 tutorial on Telemetry & Skill Performance.

---

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
