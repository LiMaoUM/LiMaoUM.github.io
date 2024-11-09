---
layout: page
title: Echo Chamber Effect on Emerging Social Media Platforms
description: Analysis of interaction patterns on platforms like Mastodon, BlueSky, and Truth Social
importance: 3
category: work
related_publications: false
---

This project investigates the echo chamber effect across three emerging social media platforms in the “post-Twitter era”—Mastodon, BlueSky, and Truth Social. The study employs network science methods to examine the influence of ideological clustering and user interaction dynamics on opinion formation and polarization.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/echo-graph-1.png" title="Network Structure" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/echo-graph-2.png" title="Influence Mapping" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/echo-graph-3.png" title="Community Detection" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Graphs show (Left) network structure on BlueSky, (Center) influence spread patterns on Truth Social, and (Right) community detection on Mastodon.
</div>

Our methodology includes:
- **Influence Mapping**: Using PageRank and LexRank to identify users shaping discourse.
- **Community Detection**: Applying the Leiden algorithm to detect ideological clusters.
- **Biased Random Walk Model**: Simulating interactions to observe the likelihood of cross-ideological exposure.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/echo-graph-4.jpg" title="Echo Chamber Simulation" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Simulations of biased random walks reveal strong echo chambers on Truth Social, while Mastodon displays more ideological diversity.
</div>

### Key Findings
- **Mastodon** fosters cross-ideological exchanges, showing weaker echo chambers.
- **BlueSky** centers discussions around moderate views, reducing ideological polarization.
- **Truth Social** exhibits a strong echo chamber effect, aligning with its conservative audience and limited cross-ideological interaction.

This research highlights the role of platform architecture in shaping public discourse and the persistence of echo chambers in social media networks. You can read more in the full paper or access related publications.

