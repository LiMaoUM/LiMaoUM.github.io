# _notes/

Source of truth for the public Notes section. One markdown file per note; the filename stem is the slug (`failure-is-the-finding.md` publishes at `notes/failure-is-the-finding.html`).

Frontmatter, all three fields required:

```markdown
---
title: The failure is the finding
date: 2026-07-09
summary: One line, used for the index card and the OG description.
---
```

Build with `uv run bin/build_notes.py` (regenerates `notes/*.html` and the list in `notes.html`, prunes pages whose source was deleted). Drafts arrive here via `/distill` from the private journal in `~/maospace/notes/journal/`; nothing is committed or published without Mao's approval. This README is ignored by the build.
