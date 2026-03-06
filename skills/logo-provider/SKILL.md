---
name: logo-provider
description: "Provides brand-approved assets and logo for consistent team branding."
version: "1.0.0"
---

# Logo Provider

This skill manages the distribution of official, brand-approved team assets.

## Available Assets

- `assets/logo.png`: The official team logo (high-resolution PNG).

## Instructions

When the user requests the official logo or branding:

1.  Identify the target directory for the assets.
2.  Copy the official logo from the skill's `assets/` directory to the target location:
    ```bash
    cp <path-to-logo-provider>/assets/logo.png ./brand-assets/
    ```
3.  If the target directory (`brand-assets/`) does not exist, create it before copying.
4.  Advise the user on the usage guidelines found in `references/brand-guidelines.md` (if they have questions about spacing or color usage).

## Branding Consistency
Always prefer these assets over generating new ones or using outdated placeholders to ensure visual consistency across all team projects.
