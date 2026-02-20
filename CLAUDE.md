# CLAUDE.md — YossyHP

This file provides guidance for AI assistants (Claude Code and others) working in this repository.

## Project Overview

**YossyHP** is a personal file-sharing website described as "Yossyのペンギンサイト" (Yossy's Penguin Site).
The site lets the owner share downloadable files (PDF, Word, Excel, images, etc.) with visitors.

- **Repository:** Yossy-AC/YossyHP
- **Language context:** UI text is in Japanese. Preserve Japanese strings when editing HTML. Commit messages may be English or Japanese.

## Tech Stack

| Concern | Choice |
|---------|--------|
| Site type | Static HTML + CSS (no build step, no framework) |
| Styling | Plain CSS (`style.css`) |
| Hosting | GitHub Pages (served from `master` branch root) |
| Package manager | None |
| Build tools | None |

No `npm install`, no build commands. Open `index.html` directly in a browser for local development.

## Directory Layout

```
YossyHP/
├── index.html        # Main page — file listing and download links
├── style.css         # All styles for the site
├── files/            # Downloadable files go here
│   └── .gitkeep      # Keeps the empty directory tracked by git
├── README.md         # Repository description
└── CLAUDE.md         # This file
```

## How to Add a Downloadable File

1. Place the file inside the `files/` directory.
2. Open `index.html` and find the `<tbody>` block.
3. Copy one of the commented-out `<tr>` examples and fill in the correct filename, type, size, and `href`.
4. Commit both the new file and the updated `index.html`.

### File type icon classes

| Class | Colour | Use for |
|-------|--------|---------|
| `icon-pdf` | Red | `.pdf` |
| `icon-word` | Blue | `.doc`, `.docx` |
| `icon-excel` | Green | `.xls`, `.xlsx` |
| `icon-image` | Purple | `.jpg`, `.jpeg`, `.png`, `.gif` |

Example `<tr>` to add a PDF:

```html
<tr>
  <td><span class="icon icon-pdf">PDF</span> 資料.pdf</td>
  <td>PDFファイル</td>
  <td>1.2 MB</td>
  <td><a class="btn-download" href="files/資料.pdf" download>ダウンロード</a></td>
</tr>
```

## Git Workflow

- **Default branch:** `master` (GitHub Pages serves from here)
- **AI work branches:** `claude/<description>` — never push AI changes directly to `master`
- **Remote:** configured via local proxy at `127.0.0.1:37404`
- **Push command:** `git push -u origin <branch-name>`

### Commit message conventions

Short imperative subject lines (50 chars or fewer):

```
Add penguin.jpg to files/
Update download list with new PDF
Fix mobile table layout
```

## GitHub Pages Deployment

1. Push to the `master` branch.
2. In GitHub → Settings → Pages: set source to **Branch: master / (root)**.
3. The site will be live at `https://yossy-ac.github.io/YossyHP/` (or a custom domain if configured).

No build step is needed — GitHub Pages serves `index.html` directly.

## Conventions for AI Assistants

- **Read before editing.** Always read a file in full before modifying it.
- **Minimal changes.** Only change what the task requires. Do not refactor unrelated code or add unnecessary dependencies.
- **No guessed URLs.** Do not generate or assume file paths or URLs unless they are confirmed in the codebase.
- **Preserve Japanese.** UI strings in `index.html` are in Japanese — do not translate them without instruction.
- **Security.** Never introduce XSS vectors (e.g. `innerHTML` with unsanitised input), exposed secrets, or executable content in the `files/` directory.
- **Branch discipline.** All AI-driven work must stay on a `claude/` branch. Never push to `master` directly.
- **File size awareness.** GitHub has a 100 MB per-file limit and a ~1 GB soft repo limit. Do not commit files that exceed these bounds.
