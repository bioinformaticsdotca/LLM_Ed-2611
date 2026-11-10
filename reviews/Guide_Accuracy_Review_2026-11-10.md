# Accuracy Review: Four Student Setup Guides

Review date: November 10, 2026 (America/Edmonton). Originals were downloaded read-only from the four user-provided Drive links. No original PDF, account, key, payment setting, or sharing permission was changed.

## Findings

Priority: P1 blocks a documented workflow; P2 is a meaningful setup/safety gap; P3 is a smaller factual or clarity correction. Locations below are PDF page numbers, not section numbers. Findings concern these exact PDF versions, not necessarily their editable source files.

### P1: OpenRouter example is not reliably copyable as printed

- **Location:** OpenRouter guide, pp. 3-4, section 6; the quoted prompt wraps on p. 4.
- **Problem:** Preserving the physical line break inside the ordinary quoted string produces `SyntaxError: unterminated string literal`. Some PDF viewers join wrapped lines, but a student cannot rely on that. The request format and base URL are not the problem.
- **Correction:** Keep the complete example together, shorten the prompt to `"Say hello."`, and supply a copyable `.py` or notebook companion. Check the text copied out of the exported PDF, not just its source document.
- **Evidence:** Local syntax check reproduced the literal-copy failure; a reflowed example passed syntax and mocked request/response checks without credentials or live API calls. [Official OpenRouter SDK integration](https://openrouter.ai/docs/guides/community/openai-sdk).

### P1: Colab Secrets are not connected to the OpenRouter example

- **Location:** OpenRouter guide, p. 3, sections 4 and 6; related 401 troubleshooting on p. 4; Colab guide, p. 11, section 13.
- **Problem:** The guide tells Colab users to store `OPENROUTER_API_KEY` in Secrets, but the code reads `os.environ["OPENROUTER_API_KEY"]`. Saving a Colab secret does not populate that environment variable. Without another setup step this fails locally with `KeyError`, before an HTTP 401 could occur. Restarting alone will not fix it and also discards session-only shell exports.
- **Correction:** Turn on notebook access for that secret and explicitly retrieve it. Explain that granting notebook access lets that notebook's running code use the key, so review shared code before granting access. Never print the retrieved value.

```python
from google.colab import userdata
from openai import OpenAI

client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=userdata.get("OPENROUTER_API_KEY"),
)
```

- **Evidence:** Google's implementation returns a secret through `userdata.get` and checks notebook permissions; it does not automatically set process environment variables. [Official Colab source](https://github.com/googlecolab/colabtools/blob/main/google/colab/userdata.py).

### P1: VS Code PATH fallback contains a damaging line break

- **Location:** VS Code guide, p. 2, manual PATH fallback.
- **Problem:** The exported command breaks between `Visual Studio` and `Code.app` inside quotes. A literal paste is accepted by zsh, but inserts a newline into the PATH entry rather than the intended application directory. `code` therefore remains unavailable.
- **Correction:** Use the Command Palette method first. If retaining the fallback, keep this entire assignment on one copyable line; identify it as zsh-specific because the guide uses `~/.zprofile`.

```bash
export PATH="$PATH:/Applications/Visual Studio Code.app/Contents/Resources/app/bin"
```

- **Evidence:** Executed the extracted two-line assignment in an isolated child zsh process: it exited successfully but produced a PATH containing `Visual Studio\nCode.app`, with no valid VS Code bin entry. No shell profile was modified. [Official macOS setup](https://code.visualstudio.com/docs/setup/mac).

### P2: Python Windows flow leaves beginners at the interactive prompt

- **Location:** Python guide, p. 3, Windows step 3, followed by p. 4 verification.
- **Problem:** Typing bare `python` opens the interactive interpreter after any initial runtime installation. The next commands are terminal commands, but there is no instruction to leave the `>>>` prompt. A beginner following the steps literally will enter them in the wrong place.
- **Correction:** Prefer an explicit manager install/version check, or add: "When you see `>>>`, type `exit()` and press Enter, then run the verification commands in Command Prompt/PowerShell." Distinguish the terminal prompt from the Python prompt.
- **Evidence:** [Python install manager: basic use](https://docs.python.org/3/using/windows.html#basic-use).

### P2: Windows environment activation needs separate shell instructions

- **Location:** Python guide, p. 4, section 4.
- **Problem:** One extensionless command is presented for both Command Prompt and PowerShell. Command discovery and script execution policy differ; the guide does not offer a clear PowerShell-specific command or a safe alternative if scripts are blocked. This is a portability/completeness issue, not a claim that the shorthand fails on every Windows machine.
- **Correction:** Document the exact commands below. On managed machines, do not advise bypassing institutional policy; use the environment's Python executable directly or ask IT/teaching support.

```bat
REM Command Prompt
.venv\Scripts\activate.bat
```

```powershell
# PowerShell
.\.venv\Scripts\Activate.ps1
# If activation is unavailable, an explicit interpreter still works:
.\.venv\Scripts\python.exe --version
```

- **Evidence:** [Official shell-specific venv activation table](https://docs.python.org/3/library/venv.html#how-venvs-work). No Windows host or PowerShell runtime was available for a native installation test.

### P2: OpenRouter privacy summary is incomplete as a retention assurance

- **Location:** OpenRouter guide, p. 4, section 7.
- **Problem:** Ordinary input/output logging is off by default, but that is not a guarantee that all request content is retained only after opting in. Official documentation describes CSAM-review/legal-preservation exceptions and Safety Retention endpoints. Provider retention/training policies remain separate.
- **Correction:** Qualify the default-logging statement, name these exceptions briefly, and preserve the existing prohibition on sensitive workshop data. Do not describe the service as universally zero-retention or private merely because optional logging is disabled.
- **Evidence:** [OpenRouter data collection](https://openrouter.ai/docs/guides/privacy/data-collection), [provider logging policies](https://openrouter.ai/docs/guides/privacy/provider-logging).

### P2: OpenRouter errors should not default to spending more money

- **Location:** OpenRouter guide, p. 3, section 5, and p. 4, section 8.
- **Problem:** The daily free tiers are broadly right, but omit the 20-requests/minute limit and provider-side constraints. Buying credits does not remove all 429 causes. A 402 may reflect an in-flight spending constraint; switching to a free model is not a universal remedy, especially with a negative balance.
- **Correction:** Tell students to inspect the error, distinguish account balance/key cap/in-flight budget, honor `Retry-After`, and retry with backoff where appropriate. Explain the shared free-model daily cap and minute cap. Do not require payment to complete the readiness check.
- **Evidence:** [Official credit/rate-limit documentation](https://openrouter.ai/docs/api_reference/limits), [free-model policy](https://openrouter.ai/collections/free-models).

### P2: Colab kernel restart, VM deletion, and saved files need separation

- **Location:** Colab guide, pp. 8-11, sections 9, 10, and 14.
- **Problem:** Saying files disappear when the runtime resets conflates distinct actions. A kernel/session restart clears variables, but ordinarily leaves the same VM's disk and installed packages. Deleting/replacing that VM loses runtime-local files. Merely mounting Drive does not back up `/content`.
- **Correction:** Distinguish notebook autosave, in-memory variables, temporary VM files, and files explicitly written to mounted Drive. Tell students to copy/write results to persistent storage or download them before VM loss. Do not imply that a restart alone uninstalls all packages.
- **Evidence:** Google's [session-management command definitions](https://github.com/googlecolab/google-colab-cli#session-management) distinguish kernel restart from VM termination; [official file/Drive examples](https://colab.research.google.com/notebooks/io.ipynb).

### P2: Colab safety guidance needs outputs and AI context, not only pasted prompts

- **Location:** Colab guide, pp. 11-12, sections 12, 13, and 16.
- **Problem:** Notebook sharing includes saved outputs, which may expose data or printed credentials. Colab AI processing also includes related code; human review and retention up to 18 months are possible. Avoiding sensitive prompt text alone is insufficient.
- **Correction:** Review/remove sensitive outputs before sharing. Keep restricted data out of AI context and generated-code outputs, not just chat text. Explain secret-access permissions as described in the Secrets finding above.
- **Evidence:** Google's [Colab FAQ: sharing and AI data handling](https://research.google.com/colaboratory/faq.html).

### P2, conditional: VS Code guide does not establish notebook readiness

- **Location:** VS Code guide, p. 3, section 6; introduction on p. 1 mentions notebooks.
- **Problem:** Installing the Microsoft Python extension is a valid next step for scripts, but it is not the complete local-notebook setup. The guide never checks interpreter selection, the Microsoft Jupyter extension, `ipykernel` in the chosen environment, or the notebook kernel picker.
- **Correction:** If this is only an editor-installation guide, label that scope explicitly. If it is workshop-readiness material, add a tiny `.py` test and a separate optional notebook test with Jupyter, the selected `.venv` kernel, and `ipykernel` installed into that environment when prompted.
- **Evidence:** [VS Code Python tutorial](https://code.visualstudio.com/docs/python/python-tutorial), [Jupyter environment setup](https://code.visualstudio.com/docs/datascience/jupyter-notebooks#_setting-up-your-environment).

### P3: Python's stated macOS minimum is too restrictive

- **Location:** Python guide, p. 1, third prerequisite bullet.
- **Problem:** It says the python.org installer requires macOS 11+. The reviewed Python 3.15.2 release page lists its macOS installer for macOS 10.15 and later.
- **Correction:** Use the chosen release's stated requirement, with a live release-page link. Keep the requirement for Python separate from the potentially newer requirement for VS Code.
- **Evidence:** [Python 3.15.2 file table](https://www.python.org/downloads/release/python-3152/), [Python macOS installation docs](https://docs.python.org/3/using/mac.html).

### P3: VS Code download-menu labels have drifted

- **Location:** VS Code guide, p. 1 screenshot/caption and p. 2-3 download instructions.
- **Problem:** The reviewed guide refers to `Select a download...`. The live public page checked during this audit instead exposes `Other builds` links and an `All downloads` expansion for system/ZIP/CLI/architecture alternatives. This may reflect a redesign or variant, not evidence that the screenshot was fabricated.
- **Correction:** Describe the function as well as the label, and replace the screenshot if reproducibility on the current public page is the goal.
- **Evidence:** Live browser snapshot and screenshot of the [official download page](https://code.visualstudio.com/download).

### P3: Colab Gemini availability is conditional

- **Location:** Colab guide, pp. 1 and 11, sections 1 and 12.
- **Problem:** The assistant is presented as universally available. Google currently requires age 18+ and a supported locale for these AI features.
- **Correction:** Say "available to eligible users" and provide a non-AI route for every basic notebook task.
- **Evidence:** [Colab FAQ: AI eligibility](https://research.google.com/colaboratory/faq.html).

### P3: Running a Colab cell does not always insert another cell

- **Location:** Colab guide, pp. 3-4, section 5.
- **Problem:** The play button and Shift+Enter are offered as equivalent, followed by an unconditional promise of a new empty cell.
- **Correction:** Play/Cmd/Ctrl+Enter runs in place; Shift+Enter selects the next cell and creates one only if necessary; Alt+Enter inserts a new cell below. The screenshot can illustrate the specific shortcut used, not every execution method.
- **Evidence:** [Official Colab code-cell overview](https://colab.research.google.com/notebooks/basic_features_overview.ipynb#scrollTo=Code_cells), and independent inspection of the current public shortcut dialog.

### P3: Colab Run selection is not a group-of-cells operation

- **Location:** Colab guide, p. 9, section 10; menu image on p. 10.
- **Problem:** `Run selection` is grouped with commands for running multiple notebook cells.
- **Correction:** Explain that it executes highlighted editor code. Separate it from Run all, Run before, and Run cell and below; do not confuse its shortcut with Run all.
- **Evidence:** Current public Runtime menu and shortcut dialog in the [official overview notebook](https://colab.research.google.com/notebooks/basic_features_overview.ipynb).

### P3: Two Colab cross-references are off by one or more sections

- **Location:** Colab guide, p. 1, section 1.
- **Correction:** Change the hardware reference from section 9 to **11**, and the Gemini reference from section 11 to **12**.
- **Evidence:** The PDF's own headings.

### P3: Three Colab screenshot captions/states need correction

- **Location:** Colab guide, pp. 3, 5, and 9.
- **Problem:** The "empty notebook" already contains the example code; the text-cell editing screenshot is blank rather than showing the stated Markdown example; the third Files-toolbar icon is described as "new folder" but is Mount Drive.
- **Correction:** Relabel the notebook state, show `# My notes` in the editing-state image, and identify the Drive icon correctly so students do not grant Drive access expecting to create a folder.
- **Evidence:** Inspection of the PDF images and Google's [file/Drive examples](https://colab.research.google.com/notebooks/io.ipynb).

## Confirmed Correct / Not Established as Bugs

- The Python 3.15.2 and 3.14.10 release numbers and October 25, 2026 dates match the current [Python release list](https://www.python.org/downloads/). Do not reject them using older remembered version numbers.
- Python's modern Windows install manager, legacy-installer deprecation, macOS universal build, administrator requirement, certificate-install step, and advice not to alter Apple's Python are supported by the official platform docs.
- The VS Code macOS Command Palette option mentioning optional `copilot` installation is current. Selecting No keeps that CLI optional. See [macOS installation](https://code.visualstudio.com/docs/setup/mac).
- Windows User setup versus System setup, manual ZIP updates, and separate Python installation are explained correctly. See [Windows installation](https://code.visualstudio.com/docs/setup/windows).
- The VS Code download page currently lists Windows 10/11 64-bit and macOS 12+. Its broader support policy is separate from those download-page minimums; these guide values were not treated as confirmed errors.
- `openrouter/free` is a valid router. The zero-dollar/per-key-cap recommendation was **not** established as a bug: `null` means unlimited in the API schema, but authenticated dashboard behavior with a zero cap and free requests was not tested. Do not remove the cap or substitute unlimited access as an alleged fix.
- OpenRouter signup methods, available credit payment methods, possible credit expiry, key handling, and free daily-tier claims were checked against official sources. Exact signed-in account/key-creation screens and actual paid/free requests remain untested.
- Colab's displayed Cmd/Ctrl+Enter, Shift+Enter, Cmd/Ctrl+F9, and Cmd/Ctrl+O shortcuts match the reviewed current shortcut dialog. Notebook-copy guidance and variable hardware availability are broadly sound. Paid hardware access is not a capacity guarantee.

## Release Assessment

| Guide | Assessment before sending to students |
| --- | --- |
| Python | Mostly accurate; fix the Windows REPL exit/verification flow and make shell-specific activation explicit. Correct the macOS minimum and use an instructor-validated Python version for scientific packages. |
| VS Code | Mostly accurate installation guidance; fix the literal-copy PATH command. Add the optional Jupyter/kernel check only if this document is meant to establish notebook readiness. |
| OpenRouter | Not ready unchanged: fix the literal-copy example and Colab secret retrieval before release, then qualify privacy, limits, and error remedies. |
| Colab | Useful introduction; correct persistence, permission/privacy explanations, UI behaviors, captions, and cross-references. A full redesign is unnecessary. |

## Method and Limits

Reviewed the full extracted text of Python (5 pages), VS Code (4), OpenRouter (4), and Colab (12): 25 PDF pages. Inspected rendered pages/screenshots, compared current official websites, and used independent read-only reviewers for OpenRouter and Colab. Static syntax, isolated shell, and mocked SDK checks do not establish successful native Windows installation, authenticated account onboarding, GPU availability, or live inference access.

Originals remain unchanged. No real API key, new account, paid request, installer, or new Colab runtime was used for this review. Source-PDF page rendering and code checks do not authenticate the screenshots' claimed capture dates. Signed-in Drive autosave, uploads, Gemini, hardware entitlements, and Secrets authorization were not exercised end-to-end. Only this review and a dated work log are authored in the repository.

## Input Fingerprints

| PDF title | Pages | SHA-256 |
| --- | --- | --- |
| `How_to_Install_Python_Mac_and_Windows_2026-11.pdf` | 5 | `847b02036d4099352a474b60c6362e0ae4e2ddde8c82d2d803c2e053ab1e19b4` |
| `How_to_Install_VSCode_Mac_and_Windows_2026-11.pdf` | 4 | `f3108d525fa85c28e552cf0ee0862f08e6be6186cd8eef8f2bbffaca19e73f47` |
| `How_to_Get_an_OpenRouter_API_Key_2026-11.pdf` | 4 | `f10c71bb35668fcec381d33a15bd74e1cc00a5f9e2b32c648b22567851b064f3` |
| `Google_Colab_Guide_2026-11.pdf` | 12 | `bc48c05061bb6d9868b40c77e2324ce11e81a033628423807f18002fa60e80b7` |
