# CLAUDE.md — YossyHP

This file provides guidance for AI assistants (Claude Code and others) working in this repository.

## Project Overview

**YossyHP** is a personal website for a prep school English teacher (予備校英語科講師 Yossy), described as "Yossyのペンギンさいと".

The site provides:
- **AI英作文添削** — AI-powered essay correction via Cloudflare Worker + Claude API
- **教材ダウンロード** — downloadable learning materials (PDF, Word, Excel, etc.)
- **授業情報・お問い合わせ** — about page and contact form

- **Repository:** Yossy-AC/YossyHP
- **Language context:** UI text is in Japanese. Preserve Japanese strings when editing HTML. Commit messages may be English or Japanese.

## Tech Stack

| Concern | Choice |
|---------|--------|
| Site type | Static HTML + CSS + JavaScript (no build step, no framework) |
| Styling | Plain CSS (`style.css`) with CSS custom properties for dark/light theme |
| Dark mode | `theme.js` + `localStorage` + `data-theme` attribute on `<html>` |
| AI proxy | Cloudflare Worker (`worker.js`) — deployed separately on Cloudflare |
| AI model | `claude-sonnet-4-6` (添削), `claude-haiku-4-5-20251001` (OCR) |
| Hosting | GitHub Pages (served from `main` branch root) |
| Package manager | None |
| Build tools | None |

No `npm install`, no build commands. Open any `.html` file directly in a browser for local development.

> **Note:** `worker.js` is the Cloudflare Worker source. It is **not** served by GitHub Pages — it must be deployed separately on [Cloudflare Workers](https://dash.cloudflare.com/). See the deploy instructions at the top of the file.

## Directory Layout

```
YossyHP/
├── index.html            # Top page — site overview and navigation
├── essay.html            # AI英作文添削ページ (main feature)
├── files-download.html   # ファイルダウンロードページ
├── about.html            # About / 自己紹介ページ
├── contact.html          # お問い合わせフォームページ
├── style.css             # All styles (dark/light theme via data-theme)
├── theme.js              # Dark mode toggle logic
├── worker.js             # Cloudflare Worker source (AI proxy — deploy to Cloudflare)
├── files.json            # File listing data for download page
├── files/                # Downloadable files go here
│   └── .gitkeep          # Keeps the empty directory tracked by git
├── og-image.svg          # OGP image
├── penguin.svg           # Penguin mascot graphic
├── README.md             # Repository description
└── CLAUDE.md             # This file
```

## AI Essay Correction Feature (essay.html + worker.js)

`essay.html` sends requests to a Cloudflare Worker URL (`WORKER_URL` constant near the top of `essay.html`).
The Worker calls the Anthropic API with the user's essay and returns structured correction results.

Key files:
- `essay.html` — UI; contains `WORKER_URL` constant pointing to the deployed Worker
- `worker.js` — Cloudflare Worker source; holds prompts and API call logic

When modifying AI behaviour (prompts, models, output format), edit `worker.js` and redeploy to Cloudflare.
When modifying UI only, edit `essay.html`.

## How to Add a Downloadable File

1. Place the file inside the `files/` directory.
2. Add an entry to `files.json` with the correct filename, type, size, and description.
3. Commit both the new file and the updated `files.json`.

### File type icon classes (used in HTML)

| Class | Colour | Use for |
|-------|--------|---------|
| `icon-pdf` | Red | `.pdf` |
| `icon-word` | Blue | `.doc`, `.docx` |
| `icon-excel` | Green | `.xls`, `.xlsx` |
| `icon-image` | Purple | `.jpg`, `.jpeg`, `.png`, `.gif` |

## Git Workflow

- **Default branch:** `main` (GitHub Pages serves from here)
- **AI work branches:** `claude/<description>` — never push AI changes directly to `main`
- **Remote:** `https://github.com/Yossy-AC/YossyHP`
- **Push command:** `git push -u origin <branch-name>`

### Commit message conventions

Short imperative subject lines (50 chars or fewer):

```
Add penguin.jpg to files/
Update download list with new PDF
Fix mobile table layout
```

## GitHub Pages Deployment

1. Push to the `main` branch.
2. In GitHub → Settings → Pages: set source to **Branch: main / (root)**.
3. The site will be live at `https://yossy-ac.github.io/YossyHP/`.

No build step is needed — GitHub Pages serves HTML files directly.

## Cloudflare Worker Deployment

`worker.js` must be deployed to Cloudflare Workers separately (see instructions at the top of the file).
After deploying, set the `WORKER_URL` constant in `essay.html` to the Worker's URL.
The Anthropic API key is stored as a Cloudflare Worker secret variable (`ANTHROPIC_API_KEY`) — never commit it to the repository.

## Conventions for AI Assistants

- **Read before editing.** Always read a file in full before modifying it.
- **Minimal changes.** Only change what the task requires. Do not refactor unrelated code or add unnecessary dependencies.
- **No guessed URLs.** Do not generate or assume file paths or URLs unless they are confirmed in the codebase.
- **Preserve Japanese.** UI strings are in Japanese — do not translate them without instruction.
- **Security.** Never introduce XSS vectors (e.g. `innerHTML` with unsanitised input), exposed secrets, or executable content in the `files/` directory. Never commit API keys.
- **Branch discipline.** All AI-driven work must stay on a `claude/` branch. Never push to `main` directly.
- **File size awareness.** GitHub has a 100 MB per-file limit and a ~1 GB soft repo limit. Do not commit files that exceed these bounds.
