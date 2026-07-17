# Notes: a daily-thinking-to-public-notes pipeline

Design doc. 2026-07-09.

## Purpose

Add a "Notes" section to limaoum.github.io that shows how Mao thinks, not just what
he concluded. The section is the last mile of a larger daily habit: capture thinking
every day in private, distill the worthwhile threads periodically, publish only what
meets a real bar.

The design reconciles two impulses Mao named as equally important but opposed:

- **Write freely / low-stakes / for myself** wants a rough, frequent scratchpad.
- **Showcase / build audience / show how I think** wants a curated, polished venue.

They are reconciled by *separating them in the pipeline*, not by picking one. Freedom
lives in the private capture stage; discipline lives in the published output. The
center of gravity is **showcase-leaning**: every published note pulls its weight, the
same editorial bar the rest of the site holds ("Program hand-curated, not
auto-generated").

## The pipeline

Three stages, each with a different cadence, bar, and privacy level.

| Stage | Command | Cadence | Bar | Where it writes | Privacy |
|---|---|---|---|---|---|
| Capture | `/think` | daily | none (raw) | `~/maospace/notes/journal/YYYY-MM-DD.md` | private (vault) |
| Distill | `/distill` | weekly-ish | showcase | `_notes/*.md` (website repo) | draft, for approval |
| Publish | `bin/build_notes.py` | on demand | shipped | `notes/*.html` (public) | public |

Keeping the stages separate is what makes the habit sustainable: capture must be
near-zero friction or it won't happen; publishing must be high-bar or it dilutes the
site.

## Stage 1 — Capture: `/think`

**Home:** a command in the `~/maospace` repo (`.claude/commands/think.md`). Thinking
belongs to the vault; Mao runs it there daily. Keeps a clean home/away split between
capturing (vault) and publishing (website).

**Behavior:**

1. Mao invokes `/think` and dumps whatever he was chewing on (typed or dictated;
   messages are often voice-dictated, so tolerate transcription noise).
2. Claude acts as **interlocutor**: asks one or two sharpening questions to push the
   thinking further. Not a full Socratic interrogation, just enough to add value.
3. Claude acts as **scribe**: writes a lightly cleaned version of the thinking into
   the day's journal file. "Lightly cleaned" = fix transcription garble, keep Mao's
   voice and rawness, do NOT polish to publication quality (that is the distill
   stage's job).
4. **Append semantics:** one file per day, `notes/journal/YYYY-MM-DD.md`. If the file
   already exists (a second session that day), append a new timestamped section rather
   than overwriting.
5. **Commit + push maospace** at the end of the session, per the vault's own session
   rules (small, well-described commit). Private repo, so raw thinking is safe here.

**File format:**

```markdown
# 2026-07-09

## 14:32
<lightly cleaned thinking dump>

## 18:05
<second session, same day, appended>
```

**Sharpening-question discipline:** at most one or two questions per dump, and only
when they genuinely push the idea. If Mao just wants to unload, scribe and stop. The
ritual must stay low-friction.

## Stage 2 — Distill: `/distill`

**Home:** a command in the website repo (`.claude/commands/distill.md`). It publishes,
so it lives with the publishing machinery.

**Behavior:**

1. Reads recent `~/maospace/notes/journal/*.md` entries (default: the last ~7 days;
   accept an explicit range as an argument).
2. Plays them back as a short list of **candidate threads** — recurring or developed
   ideas worth turning into a note. This is a proposal, not an auto-publish.
3. Mao points at the one or two threads worth publishing.
4. Claude shapes each chosen thread into a `_notes/<slug>.md` draft with complete
   frontmatter, then stops for Mao's approval before anything is built.
5. Most captures never graduate. That is the design working, not failing.

**Prose standard for shaped notes:** light Fred discipline (no defensive hedging, no
overclaiming, no dashes joining clauses per Mao's global rule) while keeping Mao's
conversational voice. Notes are notes, not papers, so do not over-formalize.

`/distill` never commits and never runs the build. It only produces drafts for review.

## Stage 3 — Publish: `bin/build_notes.py` + the Notes section

Follows the site's existing convention exactly: a source of truth is rendered by a
build script into HTML between `<!-- BEGIN ... --> / <!-- END ... -->` markers, and the
regenerated HTML is committed. Matches `bin/build_papers.py` and `bin/build_network.py`.

### Source format: `_notes/*.md`

```markdown
---
title: The failure is the finding
date: 2026-07-09
summary: One line, used for the index card and the OG description.
---

Markdown body...
```

- **Slug** derives from the filename (`_notes/failure-is-the-finding.md` →
  `notes/failure-is-the-finding.html`). No separate `slug:` field.
- Frontmatter is minimal by intent: `title`, `date`, `summary`. No tags, no status.

### Build script: `bin/build_notes.py`

- Run with `uv run bin/build_notes.py`.
- **Dependency:** `python-markdown`, declared as a PEP 723 inline script dependency so
  `uv run` fetches it automatically, no project-wide install. This is a *build-time*
  dependency only; the runtime promise (no external requests, few-KB pages) is
  untouched. This is a deliberate, scoped break from the current stdlib-only build
  scripts, justified by authoring ergonomics.
- **Smart-dash conversion OFF** so `--` is never rendered as an en/em-dash, respecting
  Mao's no-dash rule. Footnotes and tables extensions on; typographic dash smartening
  off.
- **Outputs:**
  1. One `notes/<slug>.html` per `_notes/*.md`, from a shared page template that reuses
     the masthead, `assets/css/site.css`, and the footer. Each page gets its own
     `<title>`, `<link rel="canonical">`, and Open Graph tags, matching the SEO
     treatment of the existing pages.
  2. The reverse-chronological list on `notes.html`, regenerated between
     `<!-- BEGIN notes --> / <!-- END notes -->` markers. Each list item shows title,
     date, and summary, reusing the `.pub`-style list rhythm already in the CSS.

### Site integration

- New top-nav item **Notes** added to all pages: `About · Research · Papers · Notes · CV`.
- `notes.html` is the index page (hand-authored shell with the generated list region).
- Visual design inherits the Offprint identity with minimal new CSS: paper-white, serif
  display, one maize highlight, light-only, no webfonts. A note page = masthead + an
  article header (title, date) + prose + footer.

## maospace changes

- Create `notes/journal/` in the vault.
- Document the journal in maospace's `CLAUDE.md`: note that `notes/journal/` holds daily
  raw thinking captured by `/think`, feeding the website's Notes section. Keeps the
  vault self-describing per its own rules.
- No new maospace layer; the journal sits under the existing `notes/` (working
  documents) layer.

## Out of scope (YAGNI)

Explicitly not building now; each can be added later if a real need appears:

- Tags / categories / topic index
- RSS or Atom feed
- Comments
- A "recent notes" teaser on the home page
- Draft / work-in-progress status badges
- Auto-publishing from `/distill` (approval gate is intentional)
- Full-text search

## Success criteria

- Mao can run `/think` daily and get a saved, private, synced record with near-zero
  friction.
- `/distill` surfaces publishable threads without auto-publishing anything.
- A shaped note builds into a clean per-note page plus an updated index with one
  `uv run bin/build_notes.py`.
- The Notes section is visually indistinguishable in quality from the rest of the site.
- No raw private thinking ever lands in the public repo's history.
- Runtime promise intact: note pages are a few KB, no external requests.
