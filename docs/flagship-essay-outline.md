# Flagship essay: "What Can Social Media Tell Us About Public Opinion?"

Outline approved by Mao 2026-07-18. **Drafting starts after the defense (2026-07-24).** Publish as the FIRST note through the notes pipeline (`_notes/` + `uv run bin/build_notes.py`); no separate dissertation.html and no Dissertation nav item. This supersedes the earlier five-lessons page copy drafted in the 2026-07-18 session.

Style standard: the question-driven Weng-style story in `.claude/commands/distill.md` (model: lilianweng.github.io, "The Transformer Family v2"). TOC, descriptive headers, figure at nearly every beat, inline citations + references, 4,000 to 6,000 words. No en or em dashes. Terminology rules from `~/projects/dissertation/CLAUDE.md` apply: never "instrument" for the LLM tools (tool / inference tool; "instrument" only for surveys and social media as measurement instruments broadly), never "read as" or the read/readable family for interpretation.

## The arc (each section motivates the next)

1. **The question.** Polls ask a sampled few and wait weeks; feeds show millions talking politics in real time, free. Fifteen years of the field asking: can we measure public opinion from social media? Stated ambitiously.
2. **How the field answers it.** What a typical study does: collect posts on a topic, analyze the sample, report "what people think." Then the unasked question: who is this sample, what population does it define, what information can it provide? Small-sample qualitative insight is fine; trouble starts when insight quietly becomes a population claim. Representative citations, no villains. This section makes the essay a contribution to the field, not a thesis summary.
3. **A week that breaks the naive reading.** July 2024 as a scene: Democratic share of election posts drops ~8 points in five days; polling barely moves. If a feed is a poll, someone is lying.
4. **Two different quantities.** Preference vs expression, defined plainly. The drop was the denominator (differential mobilization after the assassination attempt). Same number, opposite meanings; the distance is information about who speaks, when, how.
5. **First problem: you don't know who is speaking.** LLM inference of who/what with honest uncertainty (age recoverable ~0.97, party ID not, ~0.4-0.55; entropy highest where accuracy lowest; agreement is not accuracy, explicit vs implicit mix).
6. **Second problem: the crowd is not the public.** Dobbs scene (6.7M tweets, 780K users; liberals 68->73% of posters vs 24% benchmark), activation as mechanism, then the centerpiece: calibration amplifies bias under selective participation (raw near Pew 0.37 pre-leak, calibrated overshoots; within-cell selection is unfixable by reweighting). Adjustment/post-stratification enter HERE, after the reader feels why who-posts matters.
7. **Third problem: there is no "the crowd."** Four platforms, same label different publics (conservatives ~85% pro-Harris on Bluesky vs ~19% on Truth Social), pooling whipsaw, calibrate-then-integrate.
8. **So what is it good for?** Division of labor; Bluesky lesser-evil case as payoff: the feed discovers the question the survey should ask; the survey measures how widely it holds.
9. **What we still can't see.** Silence, images/video/audio, other countries, non-salient debates; open questions pointing quietly at the current research program (link research.html).

## Figures (all exist in the defense deck, `~/projects/dissertation/pre/defense-v2.html`; re-export as static images to `assets/img/essay/`)

- Sec 3: hookTimeseries (July post-share vs polling overlay)
- Sec 4: the denominator build (slide 4 reveal)
- Sec 5: ch1F1 + ch1Entropy (accuracy/uncertainty by attribute); ch2F1 (explicit vs implicit)
- Sec 6: ch3Timeline + ch3Composition; ch3Calibration (overshoot); optionally a static of the selectivity sandbox
- Sec 7: ch4Platforms (baseline gaps); ch4Series with pooled overlay (whipsaw)
- Sec 8: ch4 Bluesky series with lesser-evil annotation

## Open items at drafting time

1. **Numbers ruling.** Ch3/Ch4 figures are not yet in published papers; dissertation becomes public on Deep Blue deposit. Mao gave directional OK 2026-07-18 ("sounds good" to drafting post-defense); he still approves the final text before merge per the standing content rule. Check deposit status when drafting.
2. Citations for section 2: pull representative social-media-opinion studies (election prediction line, e.g. Tumasjan-era, and its critics; small-sample qualitative work) from the dissertation intro's bibliography (`~/projects/dissertation/textfiles/intro.tex` + chapter bibs) rather than inventing a lit review.
3. Prose passes through the fred-grill skill before Mao sees it.
