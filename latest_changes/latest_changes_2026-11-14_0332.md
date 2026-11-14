# Simplify Hub theme labels

## Changes

- Removed legacy Hub module numbers from the Theme links on all six current module pages.
- Removed all parenthetical partial-match notes.
- Kept each Theme line beneath its current module heading and retained links to the Hub workshop outline.
- Updated the corresponding rendered HTML pages alongside their R Markdown sources.

## Verification

- `git diff --check` passes.
- Confirmed all six Theme labels contain only Hub theme names; no label includes a legacy module number or parenthetical note.
