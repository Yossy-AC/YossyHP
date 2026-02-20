# CLAUDE.md — YossyHP

This file provides guidance for AI assistants (Claude Code and others) working in this repository.

## Project Overview

**YossyHP** is a personal website project described as "Yossyのペンギンサイト" (Yossy's Penguin Site).

- **Repository:** Yossy-AC/YossyHP
- **Status:** Early initialization — no source code exists yet beyond the README.
- **Language context:** Project name and description are in Japanese; code and commit messages may use either Japanese or English.

## Repository State (as of 2026-02-20)

This repository contains only:

```
/
└── README.md   # Project title and one-line description
```

No build tools, frameworks, package managers, test suites, or CI/CD pipelines have been configured yet. All conventions below are recommended defaults to adopt as the project grows.

## Git Workflow

- **Default branch:** `master`
- **Feature/task branches:** `claude/<description>` for AI-driven work; use descriptive names for human-driven branches.
- **Remote:** configured via local proxy at `127.0.0.1:37404`
- **Push command:** always use `git push -u origin <branch-name>`

### Commit message conventions

Use short, imperative subject lines (50 chars or fewer). Examples:

```
Add top page HTML skeleton
Fix navigation link paths
Update penguin image assets
```

If the project adopts a language preference for commit messages, document it here.

## Recommended Project Setup

When development begins, document the chosen stack here. Common choices for a personal site:

| Concern | Possible choices |
|---------|-----------------|
| Framework | Plain HTML/CSS, Astro, Next.js, Nuxt, SvelteKit |
| Styling | Plain CSS, Tailwind CSS, UnoCSS |
| Hosting | GitHub Pages, Vercel, Netlify, Cloudflare Pages |
| Package manager | npm, pnpm, Bun |

Once a stack is chosen, add:
1. How to install dependencies
2. How to start the development server
3. How to run tests (if any)
4. How to build for production

## Conventions for AI Assistants

- **Read before editing.** Always read a file in full before modifying it.
- **Minimal changes.** Only make changes directly relevant to the task. Do not refactor unrelated code, add unnecessary comments, or introduce new dependencies without instruction.
- **No guessed URLs.** Do not generate or assume URLs for assets, APIs, or pages unless they are confirmed in the codebase.
- **Respect language choice.** If the project uses Japanese in UI strings or content files, preserve that. Do not silently translate content.
- **Security.** Avoid introducing XSS vectors in HTML templates, exposed secrets in committed files, or insecure dependencies.
- **Branch discipline.** All AI-driven work must happen on the designated `claude/` branch. Never push to `master` directly.

## Adding to This File

As the project matures, update this file to include:

- Actual tech stack and versions
- `dev`, `build`, `test`, and `lint` commands
- Directory layout once source code is added
- Any project-specific coding style rules
- Deployment instructions
