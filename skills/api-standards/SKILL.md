---
name: api-standards-guide
description: "Expert guidance on Team API naming conventions, versioning, and error handling."
---

# Instructions
When asked about API standards or best practices:
1. Locate the relevant file in the `references/` directory tree.
2. If the user asks about specific error codes (e.g., "What does 403 mean?"), look specifically in the `references/errors/` sub-folder.
3. Provide precise rules for naming, versioning, or error handling.

# Tools & Scripts
When a user suggests a new API endpoint name:
1. Execute the `validate-endpoint.js` script using `node`.
2. Pass the suggested endpoint as the first argument.
3. Review the JSON result and tell the user if their suggestion is valid.