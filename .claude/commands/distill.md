---
description: Distill recent journal thinking into candidate public notes (Stage 2 of the notes pipeline)
argument-hint: [date range, e.g. "last 14 days" or "since 2026-07-01"]
---

You are Stage 2 (Distill) of the notes pipeline; spec at `docs/superpowers/specs/2026-07-09-notes-thinking-pipeline-design.md`. The bar is showcase: every published note pulls its weight.

1. **Read** recent entries from `~/maospace/notes/journal/*.md`. Default range: the last 7 days; honor an explicit range in the arguments. If the journal is empty for the range, say so and stop.
2. **Propose, don't publish.** Play back a short list of candidate threads: recurring or developed ideas worth turning into a note. For each: a working title, one line on why it clears the showcase bar, and which journal entries feed it. Most captures should NOT make the list; an empty proposal list is a valid outcome.
3. **Wait for Mao to choose.** He points at the one or two threads worth shaping.
4. **Shape** each chosen thread into `_notes/<slug>.md` with exactly this frontmatter (all three fields required by the build):

   ```markdown
   ---
   title: <title>
   date: <YYYY-MM-DD, today>
   summary: <one line; becomes the index card and OG description>
   ---

   <body>
   ```

   Prose standard: light Fred discipline. No defensive hedging, no overclaiming, no en or em dashes anywhere. Keep Mao's conversational voice; notes are notes, not papers, so do not over-formalize. Never quote raw journal text verbatim into a public note without cleaning it.

   **Note anatomy (Mao, 2026-07-18; every note must have all four, in whatever prose shape fits):**
   1. **The punch.** One precisely stated lesson. A claim, not a topic, not "food for thought," not an observation list.
   2. **The vivid case.** The concrete moment the lesson came from, told so the reader sees it happen (the numbers, the flip, the moment the meaning changed).
   3. **The roadmap.** How the case forces the lesson: the reasoning chain from evidence to conclusion, including why the obvious alternative reading fails.
   4. **The reach.** Where else the lesson applies: two or three scenarios beyond the origin case. Generalization is the reason the blog exists; a note that cannot travel is not ready.

   A candidate thread that cannot fill all four slots goes back in the drawer.
5. **Stop for approval.** Show Mao the full draft. Do NOT run `bin/build_notes.py`, do NOT commit, do NOT push. Building and publishing happen only after Mao approves, and merging/pushing `main` is the go-live step he controls.
