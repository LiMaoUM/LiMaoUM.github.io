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

   **The story standard (Mao, 2026-07-18; model: Lilian Weng's long-form posts, e.g. "The Transformer Family v2"). A note is a story driven by one question, never a list of lessons or observations ("tedious information"):**
   1. **Open with the ambitious question**, one the field circles but rarely asks head-on, or asks wrong.
   2. **Survey what people actually do about it**, concretely and respectfully, and name the question their work leaves unasked. That gap is the entry point.
   3. **Build the answer progressively.** Each piece of machinery is introduced by the problem that motivates it (motivation before solution); intuition and a vivid case come before any formalism; sections build on each other like a funnel from broad to deep.
   4. **A general reader must feel why it matters** before anything technical appears. If the reader needs the field's vocabulary to care, the opening has failed.
   5. **Form follows Weng:** table of contents for long pieces, descriptive section headers, figures that show what prose asserts (roughly one per major beat), inline citations with a references list, consistent terminology throughout.

   Precision still matters inside the story: every section should leave the reader holding one exactly-stated idea. But the story is the organizing frame; a precisely stated lesson without the journey that forces it is not a note.
5. **Stop for approval.** Show Mao the full draft. Do NOT run `bin/build_notes.py`, do NOT commit, do NOT push. Building and publishing happen only after Mao approves, and merging/pushing `main` is the go-live step he controls.
