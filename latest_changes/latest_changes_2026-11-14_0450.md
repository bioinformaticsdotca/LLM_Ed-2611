# Add presentations for current workshop modules

## Changes

- Created PowerPoint presentations for the six current workshop modules: bioinformatics data retrieval, machine learning foundations, transformers and embeddings, LLMs for genomics, protein folding and result interpretation, and capstone project work.
- Kept the capstone deck focused on supported project work; no agentic coding presentation was created.
- Added a direct PowerPoint download link to each corresponding workshop module page, with the capstone link under Optional Capstone.
- Placed the PowerPoint files in `docs/slides/`, the repository's GitHub Pages publishing folder.
- Corrected and checked scientific citations and current AlphaGenome usage limitations in the relevant slides.

## Verification

- Rendered all six presentations to PDF and reviewed final contact sheets; no visible clipping, overlap, or layout problems were found.
- Confirmed the Module 6 presentation contains no agentic coding content or placeholders.
- `git diff --check` passes.
- Confirmed the public module page is reachable and all six published PowerPoint download URLs return HTTP 200.
