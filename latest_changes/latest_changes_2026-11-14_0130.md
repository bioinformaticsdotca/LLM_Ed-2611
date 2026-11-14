# Publish participant and instructor notebook editions

## Changes

- Added instructor editions of the Transformers, publication retrieval, AlphaGenome, and protein-folding notebooks beside the existing participant editions.
- Added the participant `09_Making_Sense_participant.ipynb` to Module 5's results interpretation session.
- Added the TA/instructor walkthrough PDF and labeled it as containing answer keys.
- Labeled participant and instructor downloads separately in the relevant module sessions. Download links use same-site files and the `download` attribute.

## Verification

- Rebuilt the Bookdown website successfully.
- Confirmed the newly linked assets are present in `docs/notebooks/` and the generated module pages include the download links.
- `git diff --check` passes after removing generated whitespace-only changes.
