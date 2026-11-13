# Publish room directions from workshop site — 2026-11-13

- Added the Word room guide to `content-files/guides/` and `docs/guides/`.
- Added the photo guide as `index.html` with its 28 referenced photos in matching source and published directories under `guides/etlc-to-ice-8207/`. Web copies of photos were resized for faster loading; source photos were left unchanged.
- Linked both guides from the workshop homepage source (`index.Rmd`) and regenerated `docs/index.html` and its search index.
- Rendered the Bookdown site successfully. Confirmed all 28 relative image references resolve in both guide directories and the Word archive passes `unzip -t`.
- Changes are on local branch `codex/ice-8207-guide`; not pushed or published pending user review.
