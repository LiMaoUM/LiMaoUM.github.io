# LiMaoUM.github.io

Mao Li's public website: a custom static "Offprint" site (plain HTML + one shared CSS, no framework, no Jekyll). **`main` is live via GitHub Pages; merging or pushing to `main` publishes immediately.** Work on a branch; Mao approves before merge.

**Check GitHub first.** Mao edits this repo from two machines; `git pull` at session start and `git fetch` before any push (rebase local commits if behind). A 2026-07-18 push was rejected because a Windows-side CV update was already on the remote.

## Design authority and cross-links

- Site design spec: `~/maospace/notes/designs/website-redesign-offprint-design.md` (visual system, site map, content rules, deployment plan).
- Notes-pipeline spec: `docs/superpowers/specs/2026-07-09-notes-thinking-pipeline-design.md` (this repo).
- Cross-project state (what is public, venue statuses): `~/maospace/map/`. Publication status changes propagate here per the rule in `~/maospace/CLAUDE.md` (edit `_bibliography/papers.bib`, rebuild, commit, push).

## Build

- `uv run bin/build_papers.py`: regenerates the papers list and the selected-papers block on index from `_bibliography/papers.bib`. Committed HTML; no Pages build step.
- `uv run bin/build_network.py`: regenerates the research-page content.
- Never edit generated regions by hand; edit the source of truth and rebuild.

## Content rules (from the design spec; Mao enforces)

- Only public or preprinted work appears; no unpublished claims or numbers. Mao approves every public wording change before merge.
- Every content page and note is a question-driven story in the style of Lilian Weng's long-form posts (Mao, 2026-07-18): open with the ambitious question, survey what the field does and the question it leaves unasked, build the answer progressively with motivation before machinery, figures and citations throughout. Never a list of lessons or observations. Full standard in `.claude/commands/distill.md`.
- No en or em dashes anywhere in prose.
- Maize highlight appears exactly once per page; no external requests (no webfonts, no CDNs); zero JS except where the spec allows it.
- `google1ULAAq...html` (Search Console) and `robots.txt` must survive any restructuring.

## State (2026-07-18)

- Live: index, research (thread bands), papers, 404, CV link. Offprint redesign merged 2026-07.
- **Pending: flagship essay** "What Can Social Media Tell Us About Public Opinion?" replaces the earlier dissertation-page plan (no dissertation.html, no Dissertation nav item). Outline approved 2026-07-18 at `docs/flagship-essay-outline.md`; drafting starts after the defense (2026-07-24); publishes as the first note.
- **Notes section built 2026-07-18** (branch `notes-section`, awaiting Mao's merge): `/distill` command, `bin/build_notes.py` (PEP 723, `markdown` dep, smarty off), `_notes/` source dir, `notes.html` index, Notes in the nav on all pages, note CSS. Empty state ships until the first note graduates. Stage 1 is live on the maospace side: `/think` writes `~/maospace/notes/journal/YYYY-MM-DD.md`. Note pages regenerate with `uv run bin/build_notes.py`.
