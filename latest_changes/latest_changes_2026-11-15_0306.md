# Add OpenRouter key document links to Module 6

- Added a Module 6 section with individual links for all 14 participants.
- Clarified that the linked documents are currently accessible only to the workshop organizer and that participants must ask the organizer to share their assigned document.
- Rebuilt the Bookdown site, including the Module 6 page, shared table of contents and search index.
- Verified all 14 links appear in the rendered Module 6 page and the key values themselves do not appear in the site source or rendered page.
- Confirmed the 14 Google Docs remain owned by `alberta@bioinformatics.ca` and have no additional sharing permissions.
- Verification: `bookdown::render_book("index.Rmd", "bookdown::gitbook")` succeeded; link checks passed; `git diff --check` passed after removing unrelated whitespace changes from regenerated pages.
