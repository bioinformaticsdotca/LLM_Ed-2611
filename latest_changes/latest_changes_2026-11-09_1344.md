# Pre-work slide template correction

All 21 orientation slides now use the native MLE 0426 Module 1 PowerPoint master,
including the white background, Arial typography, purple workshop footer, and
workshop logo. The separate teal/card/serif design has been removed. The seven
historical Colab slides are retained as editable original PowerPoint slides,
rather than flattened slide screenshots framed inside another layout.

The builder now uses a bundled, reduced MLE source template and python-pptx in a
local virtual environment. The existing JavaScript build entry point delegates
to that builder. The student README documents rebuilding the deck.

Added six slides and matching guide sections on GitHub accounts, the Copilot
extension, the standalone Copilot app, Freebuff installation/safe use, and optional
participant data. Verified vendor guidance on November 9, 2026 and linked sources
in the slides and guide. Freebuff instructions highlight its policy effective
November 12 and agent access beyond a project folder. Participant data must be
small public/synthetic examples, not sensitive or unpublished research data.

Validation: rendered all 21 slides, inspected a contact sheet and the corrected
historical footer, and passed five regression tests covering master identity,
editable source content, canvas bounds, workshop branding, and requested topics.
Refreshed the 21-page slide PDF, nine-page student guide PDF, editable DOCX,
and curated ZIP. Added Python environment/cache exclusions to `.gitignore`.
Independent review confirmed native master reuse and identified an unhelpful,
nearly empty Colab landing image; it was removed from the deck and guide.
Follow-up review confirmed the six new slides fit and cover the requested topics;
its isolation and missing-example-file findings were corrected before final export.
Unrelated files and the separate Grokbot prework folder were left untouched.
