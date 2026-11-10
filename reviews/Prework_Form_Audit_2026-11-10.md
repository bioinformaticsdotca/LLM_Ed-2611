# Pre-work form audit: 2026-11-10

## Verdict

**Revise before distributing.** The six-page form is largely useful and its main
readiness checks have sensible help options, but three high-priority defects
undermine truthful completion or give conflicting preparation/privacy guidance.

Audited form: [CBW LLM_Ed-2611 pre-work](https://docs.google.com/forms/d/e/1FAIpQLSfOdUvIAw70vl_HONfoUIqMQtCC4u4-S9zKcDLZq4hds5G6Vw/viewform?usp=dialog).

Scope: every author-written title, description, sentence, answer choice,
required/optional setting, section transition, introductory statement, and
configured confirmation text. There are 31 configured items: six section/header
items and 25 questions (17 required, eight optional), plus Google's required
email field. See the [complete text ledger](Prework_Form_Text_Ledger_2026-11-10.md).
Google's platform-generated login, feedback, branding, and legal links are
checked separately below, not counted among the 19 instructional links.

**No response was submitted.** Browser QA used clearly labeled synthetic data,
reached page 6 of 6, then cleared the form and verified blank fields on page 1.
No live form text/settings, account memberships, or student materials were changed.

## Findings and proposed corrections

Item numbers below are zero-based public form item indexes; the ledger includes
the corresponding stable Google item IDs.

### F01 / P1: The video/tutorial question blocks the truthful help-only path

**Location:** page 5, item 20, "Video and Tutorial", item ID 2065254725.

It is a required checkbox question whose only answers assert completed work.
A participant unable to open the video or tutorial cannot truthfully answer,
despite the introduction promising that failed checks can be reported as
"Need help". Clicking Next with other required questions answered and this
one empty produced a required-question error. Selecting only the video choice
allowed progression: the current setting does not require both activities.

**Correction:** use separate status questions for video and tutorial, each with
"Completed", "Not yet", and "Need help / cannot access"; alternatively make the
existing checkbox question optional and explicitly allow continuing without it.
Do not simply enforce exactly two selections: that would retain the help-path
blocker. Say "about 3 minutes" for the 3:09/3:10 video.

[Captured validation error](evidence/prework-form-video-required-error-2026-11-10.png).
The temporary completed-video selection was synthetic QA input to test navigation,
not an assertion about the user; it was cleared.

### F02 / P1: Local installation is both optional and required

**Location:** item 2 versus the introduction, page 3 header/item 7, item 11,
and configured confirmation.

Item 2 says "Optional refreshers and local installations may be skipped."
The other locations require local Python and VS Code for the coding module.
Students can reasonably arrive without required software.

**Correction:** replace that sentence with: "The refreshers are optional.
Python and VS Code are required for the AI-assisted coding module. If you
cannot install them, select the appropriate help option and contact us before
the workshop." Organizers must confirm that local installation really is the
intended requirement; if not, change all locations consistently instead.

### F03 / P1: Bring-your-own-data guidance weakens the stricter safety rules

**Location:** item 28 versus items 24 and 29.

Item 24 forbids uploading unpublished/clinical/restricted information and item 29
allows only public or synthetic practice data. Item 28 instead invites research
data, permits some unpublished material with authorization, and recommends
de-identified subsets. Permission to share and removal of direct identifiers
are not the same thing as suitability for this workshop or every external service.

**Correction:** use one consistent rule throughout: "Bringing data is optional.
Bring only a small public or synthetic practice dataset that you have permission
to use. Check suitability with an instructor before uploading it. Do not bring
or upload patient-level, clinical, confidential, restricted, or unpublished data.
De-identification alone is not permission to share." This is a proposed
conservative workshop rule, not a claim that all cloud services have identical
privacy terms. An alternative policy needs an explicit organizer-approved
workflow, not a general exception inside this question.

The required yes/maybe/no question itself does **not** make bringing data mandatory:
"No, not this time" is available.

### F04 / P2: Windows launch wording is unconditional and leaves a REPL handoff gap

**Location:** item 11, Windows step 1.

The modern Python install manager is legitimate; it should not be replaced with
obsolete installer advice. However, automatic installation occurs when no runtime
is installed and configuration permits it, not on every first launch. Bare
`python` then starts the interactive prompt; subsequent terminal commands are
not Python statements.

**Correction:** qualify the auto-install claim and add "When you see >>>, type
exit() and press Enter to return to Command Prompt/PowerShell." Include a
version check and an instructor-tested Python version if lab dependencies need
one. Do not automatically upgrade a working environment solely because it is
not the newest release.

Source: [Python install manager basic use](https://docs.python.org/3/using/windows.html#basic-use).

### F05 / P2: The local success criterion does not establish VS Code integration

**Location:** item 11, step 4 and the "Both work" answer.

Running hello.py somewhere does not prove VS Code selected the intended
interpreter. The official linked tutorial covers this, but the form does not
explicitly require that check.

**Correction:** "Open hello.py in VS Code, use Python: Select Interpreter to choose
your installed Python, save the file, then use Run Python File. Confirm that the
VS Code terminal displays Hello, bioinformatics!" Keep Jupyter optional if the
local module only needs scripts. If local notebooks are required, separately
test the Jupyter extension, environment/kernel selection, and ipykernel.

Source: [Microsoft Python tutorial](https://code.visualstudio.com/docs/python/python-tutorial).

### F06 / P2: Offered operating systems lack corresponding setup routes

**Location:** item 6 offers Linux and ChromeOS; item 11 only gives Windows/macOS
steps while requiring local software.

**Correction:** add instructor-tested Linux guidance and a clearly supported
ChromeOS route or early accommodation/contact instruction. Do not assume every
Chromebook can enable Linux or that a managed laptop can install software.
The help option is useful, but it does not substitute for a supported route.

### F07 / P2: Runtime-reset wording conflates memory and VM persistence

**Location:** item 23.

Installed packages/runtime files disappearing "when it resets" can be read as
a claim about every kernel restart. Restarting a Python session clears variables;
deleting/replacing the runtime VM loses its local files and installed packages.

**Correction:** "A session restart clears variables. Runtime-local files and
installed packages are not persistent when the runtime VM is deleted or replaced.
Save the notebook to Drive and explicitly download or copy outputs you need."
Saving the notebook is not a backup of all runtime files.

Source: [Colab FAQ](https://research.google.com/colaboratory/faq.html).

### F08 / P2: Explain Drive mount scope and the later safe key workflow

**Location:** items 19 and 24.

The prohibition on pasting secrets into code/shared material is good. The form
does not yet explain the positive alternative, and reviewing the Drive consent
dialog alone does not establish that notebook code is safe.

**Correction:** say that saving a notebook to Drive does not require mounting
Drive, and that mounting lets notebook code access Drive files. Use only trusted,
reviewed code and institutionally approved storage. At the workshop, instructors
should demonstrate storing the supplied key in a private secret named
OPENROUTER_API_KEY, granting only a trusted notebook access, and retrieving it
with \`from google.colab import userdata\` and
\`userdata.get("OPENROUTER_API_KEY")\` without displaying it. This does
not create a new API-key requirement for pre-work.

Sources: [Colab FAQ: Drive access](https://research.google.com/colaboratory/faq.html),
[official Colab Secrets implementation](https://github.com/googlecolab/colabtools/blob/main/google/colab/userdata.py).
The supplied key's budget, expiry, allowed providers, and handling policy remain
organizer decisions.

### F09 / P2: Add a response-use notice appropriate to the collected information

**Location:** required email/name/GitHub fields and item 30.

The required email is manually entered by the respondent; ownership is not
verified by the anonymous walkthrough. See [Google's email-collection modes](https://support.google.com/docs/answer/139706?hl=en).
The form collects identifiable readiness responses and invites accessibility
information. No author-written notice states purpose, readers, retention, or a
privacy contact. The final page says a response copy will be emailed; this also
means students should avoid sensitive details in free text.

**Correction:** add a short owner-confirmed notice explaining who can access the
responses, why they are needed, retention, the email-copy behavior, and a private
support route. Ask for functional support needs rather than diagnoses or
sensitive medical details. This is a transparency recommendation, not a finding
that responses are public or a determination of legal non-compliance.

### F10 / P2: The linked workshop site still advertises pre-work/setup as TBA

**Location:** introduction's workshop-information link.

The homepage and setup page load successfully, but Pre-work says "To be
announced", and Data and Compute Setup still says platform, notebooks, data,
and setup details are to be announced. This conflicts with the ready-to-use
instructions and makes rediscovery difficult.

**Correction:** publish the approved form/pre-work links and consistent setup
requirements on the workshop site. Confirm the promised OpenRouter provision
and final module/teaching assignments before publication.

Sources: [workshop homepage](https://bioinformaticsdotca.github.io/LLM_Ed-2611/),
[setup page](https://bioinformaticsdotca.github.io/LLM_Ed-2611/data-and-compute-setup.html),
[faculty page](https://bioinformaticsdotca.github.io/LLM_Ed-2611/meet-your-faculty.html).

### F11 / P2: Verify corrections to the previously reviewed PDF guides

**Location:** item 11's Python/VS Code PDFs and item 19's Colab PDF.

All three resolve to the intended named Drive PDF viewers. Link validity does
not mean that the instructions/screenshots are approved. The
[earlier full PDF audit](Guide_Accuracy_Review_2026-11-10.md) identifies, among
other issues, a broken literal-copy VS Code PATH line, a Windows REPL handoff
gap, and Colab persistence/privacy/UI inaccuracies. The currently served revisions
were not fingerprint-compared with that review: the same Drive URL can serve a
replacement file. This audit has not established whether those defects remain
in the latest revisions.

**Correction:** verify whether that report's corrections are present; where
needed, correct the source documents, re-export,
check the PDF screenshots and literal-copy commands, and verify that these same
Drive links resolve to the corrected files. Do not require an OpenRouter setup
PDF here: students are explicitly told they will receive a workshop key.

### F12 / P3: Match the terminal refresher caption to its actual coverage

**Location:** item 27.

The linked tutorial covers working-directory inspection, listing/reading files,
filtering, pipes, redirection, and environment variables. Its eight lessons do not
teach changing directories or a relative/absolute-path lesson.

**Correction:** replace "navigating folders ... paths" with "checking your current
directory, listing and reading files, and basic pipes/redirection", or supply a
separate navigation lesson.

Source: [Terminal Basics](https://sandbox.bio/tutorials/terminal-basics).

### F13 / P3: Small expectation and audience clarifications

**Locations:** items 13 and 30, introduction/help descriptions, confirmation.

- Say that a public Slack channel is visible to workspace members, not only this
  workshop's participants.
- Change instructions to describe a failure in the final question to "if possible";
  item 30 explicitly allows leaving it blank. Students can use the private contact.
- Replace "bring your GitHub login" with "make sure you can sign in to your GitHub
  account, including any two-factor authentication; do not share credentials."
- Qualify the confirmation's installation reminder for people already reporting
  installation restrictions: ask them to contact support before arrival.
- Consider adding a concrete pre-work deadline with timezone, rather than only
  "before the workshop"; an actual deadline must be chosen by organizers.

## Complete instructional-link inventory

19 distinct editorial web URLs were checked. Repeated occurrences share a row.
**No URL was confirmed dead.** Eighteen returned HTTP 200; some are expected
account gates, and an HTTP 200 does not prove access to the protected resource.
GitHub signup returned 403 in the isolated browser and remains an access check
to repeat in a normal browser. Slack channel identity/access also remains
unverified behind authentication. The invitation token is deliberately not
republished in this repository.

| # | Destination | Browser result and suitability |
|---|---|---|
| 1 | [Workshop site](https://bioinformaticsdotca.github.io/LLM_Ed-2611/) | 200; correct workshop/dates/venue/prerequisites. Content stale: F10. |
| 2 | [CBH Code of Conduct](https://bioinformatics.ca/about/code-of-conduct/) | 200; relevant policy. CBH is the site's current organization name, not a typo. |
| 3 | [Colab](https://colab.research.google.com/) | 200; Google Colab. Reading/landing access only; account/runtime operations not tested. |
| 4 | [Google Drive](https://drive.google.com/) | 200; redirects to Google Drive sign-in, expected account gate. |
| 5 | [Python downloads](https://www.python.org/downloads/) | 200; official downloads. OS/build/version must match the student's machine and tested labs. |
| 6 | [VS Code](https://code.visualstudio.com/) | 200; official editor site. Choose the correct OS/architecture build. |
| 7 | [VS Code Python tutorial](https://code.visualstudio.com/docs/python/python-tutorial) | 200; correct setup, interpreter-selection and script-running content. |
| 8 | [Python PDF](https://drive.google.com/file/d/1vaKHCA-YJ8P-QGx8wmGrWLLuuSVya9p6/view) | 200; correct five-page installation PDF, anonymous viewer loads. Prior content findings require revision verification: F11. |
| 9 | [VS Code PDF](https://drive.google.com/file/d/1uk2pEeH1BYJjTfxmDr9W8-neBgXiVmhN/view) | 200; expected named PDF viewer opens without sign-in. Viewer shell alone is not a fresh full-page rendering test; full contents were reviewed earlier. F11. |
| 10 | [GitHub signup](https://github.com/signup) | 403/blank in isolated browser. Not established as a broken URL: GitHub's current official account-creation documentation still links here. Repeat manually. |
| 11 | Slack workspace invitation (token redacted) | 200; "Join Bioinformatics.ca on Slack", invitation from Mark, "expires in 16 days" on audit date. No workspace was joined. Recheck expiry before future distribution. |
| 12 | [Workshop Slack channel](https://bioinformaticsca.slack.com/archives/C0CC9AX76TZ) | 200; workspace sign-in page. Correct workspace host, but channel name, membership permission, and pinned resources cannot be independently confirmed anonymously. |
| 13 | [Google account signup](https://accounts.google.com/signup) | 200; Google account name-entry flow. No account created or personal data entered. |
| 14 | [Colab PDF](https://drive.google.com/file/d/1gT-5BTuGxHC_7s5wKMRtMNDdDc0kx0e3/view) | 200; expected named PDF viewer opens without sign-in. Full content reviewed earlier, not re-rendered here. F11. |
| 15 | [Colab video](https://www.youtube.com/watch?v=inN8seMm7UI) | 200; TensorFlow's "Get started with Google Colaboratory (Coding TensorFlow)". Player available; about 3 minutes. Full playback not tested. |
| 16 | [Welcome to Colab](https://colab.research.google.com/notebooks/intro.ipynb) | 200; correct tutorial notebook with visible examples. Anonymous reading works; running/saving requires account access and was not tested. |
| 17 | [Colab FAQ](https://research.google.com/colaboratory/faq.html) | 200; appropriate official reference. Runtime and Drive-permission guidance supports F07/F08. |
| 18 | [Python tutorial](https://docs.python.org/3/tutorial/) | 200; appropriate refresher for someone with programming familiarity, explicitly not an introductory programming course. Version-floating /3 URL is valid. |
| 19 | [Terminal Basics](https://sandbox.bio/tutorials/terminal-basics) | 200; correct browser tutorial, all eight lesson pages inspected. Reading does not need sign-in; optional progress login. Narrow caption: F12. |

The plain-text address alberta@bioinformatics.ca is syntactically valid and
consistently used, but mailbox delivery and organizer response were not tested.
No email was sent. The invite's displayed relative expiry is evidence only for
the audit date, not an exact expiry timestamp guarantee.

GitHub cross-check:
[official account-creation documentation](https://docs.github.com/en/account-and-profile/how-tos/account-management/creating-an-account-on-github).

### Platform links and controls

The optional Google sign-in route returned 200 with the expected account
sign-in page; no credentials were entered. The Learn more control opened an
"Autosave your work" dialog with "Continue without signing in" and a sign-in
link, consistent with the observed anonymous traversal. Dynamic sign-in URLs
are not republished because they include ephemeral navigation parameters.

The form's Report link redirected to Google's abuse-report page (200);
**no abuse report was submitted**. The Google Forms branding link redirected
to the [official Forms product page](https://workspace.google.com/products/forms/)
(200). Google's [Privacy Policy](https://policies.google.com/privacy) and
[Terms of Service](https://policies.google.com/terms) destinations also loaded
successfully. These are platform destinations, not workshop-specific privacy
notices and not substitutes for F09. Nested links inside destination pages are
outside the form-link inventory.

## Browser test matrix

| Test | Observed result |
|---|---|
| Open the published form anonymously | All six pages could be traversed without signing in to Google Forms. |
| Page 1: choose "I need help understanding" | Proceeds to page 2; no unadvertised rejection. Name and reserved example.org test email used, never submitted. |
| Page 2: click Next with required answers empty | Correctly blocked by required-question validation. |
| Page 2: choose loaner needed and ChromeOS | Continues to page 3. This exposes the missing OS-specific route, F06. |
| Page 3: choose help for browser/PDF/Slack, institution blocks installations, and type "Need help" as GitHub answer | Continues to page 4; no real username required for help reporting. |
| Page 4: choose channel "Need help", leave all four optional checks blank | Continues to page 5; optionality works. No Slack messages posted. |
| Page 5: choose help for Colab create/run/save and safety clarification; leave video/tutorial empty | **Blocked** by required video/tutorial question, F01. |
| Page 5: select only completed-video checkbox as a temporary QA simulation | Continues to page 6; the current checkbox requirement is at least one, not both. |
| Page 6: leave refreshers, research question, and concerns blank; select "No, not this time" | Final page displayed with Submit available. No final-submit validation or server acceptance was exercised. |
| Clear form and confirm clearing | Returned to page 1; email/name empty and acknowledgment/Code of Conduct choices unchecked. |
| Submit / confirmation / receipt | **Not exercised.** Confirmation text inspected in public configuration, not observed as a submission result. Receipt delivery was not tested. |

The public configuration showed sequential page transitions and no per-choice
branch destinations. This is not a test of every possible response combination.
The form advertises an emailed response copy on the final page; delivery,
anti-abuse challenges, and post-submit behavior remain untested.

## Statements retained and organizer-only confirmations

The date/venue, named instructors/TAs, and advertised prerequisites agree with
the public workshop site. More specific lead-instructor/module/logistics role
assignments and the promise that every participant receives a working OpenRouter
key require organizer confirmation. So do key budgets/expiry, lab compatibility,
loaner availability, final deadlines, and inbox monitoring.

The listed section times (5 + 45 + 15 + 30 minutes = 95 minutes) fit the
advertised 1.5-2 hours. Optional refresher estimates total three hours and are
estimates, not completion guarantees. No dedicated GPU or paid Colab plan is
needed for a simple print-cell check, although free runtime availability is
not guaranteed. The Colab-based Python refresher does not itself require a local
installation; that does not contradict a separate coding-module requirement.

Security guidance, choosing "Need help", keeping screenshots free of secrets,
private notebook sharing, browser PDF viewing, optional Slack desktop use, and
not requiring a public Slack post are sound. The Code of Conduct must remain a
real participant agreement, not an automatic choice made on behalf of students.

## Release verification after fixes

1. Fix F01-F03 and resolve organizer-only decisions; update form and linked
   documents consistently, without changing student responses.
2. Repeat the fully unsuccessful/help-only path without selecting any statement
   of completed work, and verify that all optional fields can remain blank.
3. Test the successful Windows and macOS script paths with a beginner, and the
   supported Linux/ChromeOS or accommodation route. Check interpreter selection.
4. Recheck all 19 links in an ordinary student browser, including GitHub signup,
   current Slack invitation expiry, and authenticated channel identity/access.
5. Verify the corrected PDF viewers and downloads, including screenshots and
   literal-copy examples; publish matching pre-work/setup links on the site.
6. Only with organizer authorization, use a labeled test response to verify final
   submission, confirmation, response receipt, and the actual response-use notice.

No software installation, paid request, API-key creation/use, account creation,
Slack membership change, or Colab runtime execution was performed in this audit.

## Audit artifact verification

The text ledger contains 228 review units. A whitespace-normalized comparison
against all 123 nonempty original title/description/choice/intro/confirmation
fields found no omitted source text; the invitation token was redacted. The
Google-generated respondent-entered email question was reviewed separately.
Independent review checked substantive findings and verification claims, and
its four clarifications were incorporated. No executable workshop code was written.
