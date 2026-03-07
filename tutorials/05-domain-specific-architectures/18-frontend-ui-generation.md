# Task 18: Front-End UI Generation Skills

In this task, we will explore how AI Agent Skills can be used to accelerate front-end development. We will focus on two key areas: **Component Scaffolding** based on design tokens and **Visual Consistency Auditing** using a `css-expert` skill.

---

## Part 1: Educational - The Front-End Agent

AI Agents can be powerful allies for front-end engineers, especially when dealing with repetitive tasks or strict design systems.

### 1. Scaffolding with Design Tokens
Design tokens (variables for colors, spacing, typography) are the "source of truth" for a design system. A skill can read these tokens and generate complete, styled components (React, Angular, or Vanilla HTML/CSS) that are perfectly aligned with the brand.

### 2. Guarding the Design System
Maintaining CSS quality at scale is difficult. A skill can act as a "CSS Auditor," ensuring that no hardcoded hex colors or "magic number" margins creep into the codebase.

### 3. Rapid Prototyping
Instead of manually typing boilerplate, a developer can describe a UI component in plain English, and a skill can generate the structure and styling instantly.

---

## Part 2: The Practical - The `css-expert` Auditor

We will build a skill that audits a CSS file against a set of "Brand Guidelines" (Design Tokens). The goal is to flag any CSS properties that don't match the approved values.

### 1. The Scenario
Your project has a `brand-tokens.json` file. The `css-expert` skill will scan `styles.css` and flag any colors or spacing values that are not present in the tokens file.

---

## Part 3: Ready Scripts (The "Linter" Pattern)

### 1. `css-expert/scripts/audit-css.js`
This script reads design tokens and validates a CSS file.

```javascript
const fs = require('fs');

const cssFile = process.argv[2] || 'styles.css';
const tokensFile = 'brand-tokens.json';

if (!fs.existsSync(tokensFile)) {
  console.error("❌ Error: brand-tokens.json not found.");
  process.exit(1);
}

const tokens = JSON.parse(fs.readFileSync(tokensFile, 'utf8'));
const approvedColors = Object.values(tokens.colors);
const cssContent = fs.readFileSync(cssFile, 'utf8');

console.log(`🎨 Auditing ${cssFile} against brand tokens...`);

// Simple regex to find hex colors and rgb values
const colorRegex = /#[a-fA-F0-9]{3,6}|rgba?\([^)]+\)/g;
const foundColors = cssContent.match(colorRegex) || [];

let violations = 0;
foundColors.forEach(color => {
  if (!approvedColors.includes(color.toLowerCase())) {
    console.log(`🚨 Violation: Unapproved color found: ${color}`);
    violations++;
  }
});

if (violations === 0) {
  console.log("✅ Audit PASSED. All colors match the design system.");
} else {
  console.log(`\n❌ Audit FAILED. Found ${violations} unapproved values.`);
  process.exit(1);
}
```

---

## Part 4: Interaction Design (Example Prompts)

**Pattern: The UI Scaffolder**
> **User**: "Generate a 'Primary Button' component using our design tokens."
> **Agent**: 
> 1. "Reading `brand-tokens.json`..."
> 2. "Generating `Button.module.css` and `Button.tsx` using 'brand-primary' and 'spacing-medium'..."
> 3. "Component created. Would you like me to run the `css-expert` audit to confirm compliance?"

---

## Part 5: Tasks to Do

### Task 1: Initialize the `css-expert` Skill
1.  Create the skill folder: `skills/css-expert/`.
2.  Write the `SKILL.md`. It should be triggered by "audit css," "check design compliance," or "verify styles."
3.  Add the `audit-css.js` script from Part 3.

### Task 2: Define the Brand Tokens
1.  Create `brand-tokens.json` in the root:
    ```json
    {
      "colors": {
        "primary": "#007bff",
        "secondary": "#6c757d",
        "success": "#28a745"
      },
      "spacing": {
        "small": "8px",
        "medium": "16px",
        "large": "32px"
      }
    }
    ```

### Task 3: Test with a "Non-Compliant" CSS File
1.  Create `styles.css`:
    ```css
    .card {
      background-color: #007bff; /* Approved */
      border: 1px solid #ff0000; /* NOT Approved */
      padding: 20px; /* NOT Approved (should be 16px) */
    }
    ```
2.  Ask the agent: "Verify my `styles.css` against our brand tokens."
3.  **Goal**: The agent should flag `#ff0000` as a violation.

---

## Self-Check: Milestone 18
- [ ] Does the `css-expert` skill successfully read `brand-tokens.json`?
- [ ] Are unapproved colors flagged correctly?
- [ ] Does the agent suggest using a variable/token to fix the violation?
