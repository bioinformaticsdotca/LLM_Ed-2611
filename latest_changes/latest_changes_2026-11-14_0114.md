# Force notebook and PDF downloads

## Changes

- Kept student-facing links on the workshop site and added the HTML `download` attribute to each notebook link.
- Added the same download behavior to the Transformers walkthrough PDF link.
- Rebuilt the generated module pages so the download attributes are present in the published HTML.

## Verification

- Confirmed generated module HTML contains the download attribute on notebook and PDF links.
- Rebuilt the Bookdown site successfully and checked the diff for whitespace errors.
