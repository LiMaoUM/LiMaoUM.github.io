# limaoum.github.io

Personal academic site for Mao Li. Custom static HTML/CSS, no build framework,
served by GitHub Pages (`.nojekyll` disables Jekyll processing).

## Structure

```
index.html        Home: thesis, research threads, selected papers
research.html     Research program as an interactive network figure
papers.html       Full publication list
404.html
assets/css/site.css    the whole visual system ("Offprint")
assets/js/network.js   progressive enhancement for the network (hover, drag, explore)
assets/data/research.json   hand-curated network data (single source of truth)
_bibliography/papers.bib    publication source
bin/build_papers.py    render papers.bib -> papers.html + home selected list
bin/build_network.py   render research.json -> inline SVG in research.html
```

## Editing

- **Add a paper:** edit `_bibliography/papers.bib`, then `uv run bin/build_papers.py`.
  Mark up to a few entries `selected = {true}` to feature them on the home page.
- **Change the research network:** edit `assets/data/research.json`, then
  `uv run bin/build_network.py`. The committed SVG is a complete figure with
  JavaScript disabled; the JS only adds interaction.

Both scripts rewrite content between `<!-- BEGIN ... -->` / `<!-- END ... -->`
markers in the HTML. Commit the regenerated HTML.

## Design

Paper-white scholarly identity, serif display over system sans, one maize
highlight, light-only by intent. No webfonts and no external requests, so every
page is a few KB and loads instantly.
