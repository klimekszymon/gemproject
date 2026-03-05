# Task 5: Development and Distribution

Congratulations! You've built a skill with instructions, reference documentation, and dynamic scripts. In this final task, you will learn how to efficiently manage your development workflow and "ship" your skill so others can use it.

---

## Part 1: Educational - Link vs. Install

In previous tasks, we used `gemini skills install` for local paths. However, for active development, there is a better way.

### 1. `gemini skills link`
This is your best friend during development. Instead of copying files, `link` creates a reference to your development folder.
- **Benefit**: Any changes you make to `SKILL.md` or your scripts are reflected **immediately**. You don't need to reinstall every time you edit a file.

### 2. `gemini skills install` (from Git)
In modern versions of the Gemini CLI, we no longer use a manual "package" command. Instead, distribution happens through **Source Control**.
- **Benefit**: You share a repository URL (e.g., GitHub/GitLab).
- **Format**: `gemini skills install https://github.com/user/my-skill`

---

## Part 2: Practical - Linking and Shipping

### 1. Link Your Development Skill
Run the following command in your terminal:
```bash
gemini skills link ./skills/api-standards
```
Now, try modifying a rule in `naming.md` and asking the agent about it. You'll see the update instantly without a re-install!

### 2. Preparing for Distribution
To "ship" your skill to your team:
1.  **Initialize a Git Repo**: Put your skill folder into its own repository.
2.  **Push to a Shared Remote**: Push it to your company's GitHub/GitLab.
3.  **Share the URL**: Tell your teammates to install it directly from Git.

```bash
gemini skills install <your-git-repo-url>
```

---

## Part 3: The Skill Registry Strategy

In a real-world team environment, you wouldn't just send URLs manually. You would use a **Skill Registry**.

### The Future Roadmap
As outlined in our project plan:
1.  **GitHub Organization**: All approved skills are stored in a specific GitHub Org.
2.  **Centralized Index**: A `README.md` or a small website lists the `gemini skills install <url>` commands for every available skill.
3.  **CI/CD**: Automation ensures that every skill in the registry passes validation before being shared.

---

## Self-Check: Final Milestone
- [ ] Have you successfully used `gemini skills link`?
- [ ] Do you understand why we use Git for distribution instead of manual ZIP packages?
- [ ] Are you ready to start building your own custom skills?

**Congratulations! You have completed the AI Agent Skill Developer foundations.**

