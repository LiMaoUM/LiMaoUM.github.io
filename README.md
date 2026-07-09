# limaoum.github.io

Personal academic site for Mao Li. Custom static HTML/CSS, no build framework,
served by GitHub Pages (`.nojekyll` disables Jekyll processing).

## Structure

```
index.html        Home: thesis, research threads, selected papers
research.html     Research program as bold thread bands
papers.html       Full publication list
404.html
assets/css/site.css    the whole visual system ("Offprint")
assets/data/research.json   hand-curated research-program data (single source of truth)
_bibliography/papers.bib    publication source
bin/build_papers.py    render papers.bib -> papers.html + home selected list
bin/build_network.py   render research.json -> thread bands in research.html
```

## Editing

- **Add a paper:** edit `_bibliography/papers.bib`, then `uv run bin/build_papers.py`.
  Mark up to a few entries `selected = {true}` to feature them on the home page.
- **Change the research program:** edit `assets/data/research.json` (threads,
  their papers, and an in-progress count), then `uv run bin/build_network.py`.
  It regenerates the thread bands. Static HTML, no JavaScript.

Both scripts rewrite content between `<!-- BEGIN ... -->` / `<!-- END ... -->`
markers in the HTML. Commit the regenerated HTML.

## Design

Paper-white scholarly identity, serif display over system sans, one maize
highlight, light-only by intent. No webfonts and no external requests, so every
page is a few KB and loads instantly.
