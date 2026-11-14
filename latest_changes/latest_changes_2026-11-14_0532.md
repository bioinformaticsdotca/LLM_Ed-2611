# Remove presentations from student site

## Changes

- Removed PowerPoint download links from all six module pages and their R Markdown sources.
- Removed the six PowerPoint files from `docs/slides/`, the GitHub Pages publishing folder.

## Verification

- `git diff --check` passes.
- Confirmed no PowerPoint download links remain in the module source or rendered HTML pages.
- Confirmed all six PowerPoint files are removed from the publishing folder; verifying the deployed site after push.
