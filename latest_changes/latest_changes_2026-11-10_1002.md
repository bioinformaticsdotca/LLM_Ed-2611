# Read-only accuracy review of four setup guides

Reviewed all 25 pages of the user-provided Python, VS Code, OpenRouter, and Colab
PDFs. The originals, their Drive sharing state, and the existing student package
were not changed. A detailed report in
`reviews/Guide_Accuracy_Review_2026-11-10.md` records PDF page locations,
priorities, suggested corrections, official source links, input SHA-256 hashes,
and the limits of verification.

Confirmed literal-copy defects in the OpenRouter sample and VS Code PATH
assignment; identified missing Colab-secret retrieval, a Windows REPL handoff
gap, and runtime/privacy/setup clarifications. Verified current release/UI
claims rather than treating newer Python versions or the optional Copilot
menu as mistakes. Independent read-only OpenRouter and Colab audits were
integrated into the report.

Checks included complete text extraction, rendered-page inspection, official
documentation comparison, an isolated child-shell PATH test, and syntax/mocked
SDK checks. No real credentials, installations, paid requests, or new runtimes
were used. Existing unrelated changes remain untouched.
