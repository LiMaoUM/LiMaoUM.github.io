---
description: Distill recent journal thinking into publishable Notes drafts (Stage 2 of the notes pipeline)
---

Stage 2 (Distill) of the notes pipeline. Design: `docs/superpowers/specs/2026-07-09-notes-thinking-pipeline-design.md`. This command lives in the website repo because it produces publishable drafts. It never commits and never runs the build; it produces `_notes/*.md` drafts for Mao's approval. This command is self-contained.

The center of gravity is showcase-leaning: every published note pulls its weight. Most captures never graduate, and that is the design working, not failing.

1. **Read recent thinking.** Read the maospace journal at `~/maospace/notes/journal/*.md` (Linux) or `D:/maospace/notes/journal/*.md` (Windows). Default to the last ~7 days; accept an explicit date range as an argument (e.g. `/distill 2026-07-01..2026-07-20`). The journal is Mao's private raw capture from `/think` and `/ingest-audio`.

2. **Surface candidate threads.** Play the entries back as a short list of candidate threads: recurring or developed ideas worth turning into a public note. For each, one line on what the thread is and why it might earn a note. This is a proposal, not an auto-publish. Do NOT shape anything yet.

3. **Wait for Mao to choose.** Mao points at the one or two threads worth publishing. If nothing is ready, say so and stop; that is a normal outcome.

4. **Shape each chosen thread into a draft.** Write `_notes/<slug>.md` with complete frontmatter and a markdown body:

   ```markdown
   ---
   title: <concrete, claim-carrying, not a topic label>
   date: <YYYY-MM-DD, the date the thinking belongs to>
   summary: <one line, used for the index card and the OG description>
   ---

   <body>
   ```

   - Slug derives from the filename; no `slug:` field.
   - Frontmatter is exactly `title`, `date`, `summary`. Nothing else.
   - Prose standard: light Fred discipline (no defensive hedging, no overclaiming, no dashes joining clauses per Mao's global rule) while keeping Mao's conversational voice. Notes are notes, not papers; do not over-formalize. If the source thinking has a soft spot a reader would catch (an overstated claim, an unnamed assumption), fix it in the shaping, that is the editorial bar.
   - `--` in source is fine; the build script has dash-smartening off, but still do not write dashes joining clauses in prose.

5. **Stop for approval.** After writing the draft(s), show Mao the shaped text and stop. Do NOT run `bin/build_notes.py`, do NOT commit, do NOT push. Publishing is a separate, deliberate step Mao takes after reading the draft. Tell Mao the next step is: review the draft, then `uv run bin/build_notes.py` and commit/push to publish.

Never auto-publish. The approval gate between distill and publish is intentional.
