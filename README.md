# LLM_Ed-2611 — Large Language Models for Bioinformatics (CBW, Edmonton, Nov 14–15, 2026)

Live site: https://bioinformaticsdotca.github.io/LLM_Ed-2611/

Built with the CBW Bookdown template (cbw-dev/bookdown-template). GitHub Pages serves the `docs/` folder on `main`.

## Editing
1. `git pull`
2. Edit the `.Rmd` files (`index.Rmd` = workshop info, pre-work and schedule; `001-faculty.Rmd`; `002-computing.Rmd`; `010`–`070` = modules) and `schedule.csv`.
3. Build: RStudio "Build Book", or `Rscript -e 'bookdown::render_book("index.Rmd", "bookdown::gitbook")'`.
4. Commit everything (including `docs/`) and push. Pages redeploys in 1–2 minutes.

Travel/venue logistics live in bioinformaticsdotca/travel_logistics (`edmonton/LLM_Ed-2611.md`); link them from index.Rmd rather than duplicating full logistics in this repo.

Content licensed under CC BY-SA 4.0 (see LICENSE.md).
