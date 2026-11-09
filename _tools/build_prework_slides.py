"""Build prework slides with the native MLE 0426 master and editable source slides.

Install requirements-prework.txt in .venv before running. To recreate the bundled
template, pass --source-deck followed by the original MLE Module 1 presentation.
"""

import argparse
from pathlib import Path

from pptx import Presentation
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN
from pptx.oxml.xmlchemy import OxmlElement
from pptx.util import Inches, Pt

ROOT = Path(__file__).resolve().parent.parent
TEMPLATE = ROOT / '_tools' / 'mle0426-prework-template.pptx'
OUT = ROOT / 'prework'
SOURCE_SLIDES = (90, 97, 108, 111, 115, 116, 125)


def prepare_template(source):
    deck = Presentation(source)
    # Retain the seven original editable slides and their native master/theme.
    for index in range(len(deck.slides) - 1, -1, -1):
        if index + 1 not in SOURCE_SLIDES:
            slide_id = deck.slides._sldIdLst[index]
            deck.part.drop_rel(slide_id.rId)
            deck.slides._sldIdLst.remove(slide_id)
    master_ids = deck._element.sldMasterIdLst
    for master_id in tuple(master_ids)[1:]:
        deck.part.drop_rel(master_id.rId)
        master_ids.remove(master_id)
    deck.save(TEMPLATE)


def text(slide, content, x, y, w, h, size=24, color='333399', bold=False,
         align=PP_ALIGN.LEFT):
    shape = slide.shapes.add_textbox(Inches(x), Inches(y), Inches(w), Inches(h))
    frame = shape.text_frame
    frame.word_wrap = True
    frame.margin_left = frame.margin_right = Inches(0.03)
    frame.margin_top = frame.margin_bottom = 0
    for index, line in enumerate(content.split('\n')):
        paragraph = frame.paragraphs[0] if index == 0 else frame.add_paragraph()
        paragraph.text = line
        paragraph.alignment = align
        paragraph.space_after = Pt(12)
        paragraph.font.name = 'Arial'
        paragraph.font.size = Pt(size)
        paragraph.font.bold = bold
        paragraph.font.color.rgb = RGBColor.from_string(color)
    return shape


def bullets(slide, items, x=0.7, y=1.65, w=11.9, h=4.9, size=26):
    shape = text(slide, '\n'.join(items), x, y, w, h, size=size)
    for paragraph in shape.text_frame.paragraphs:
        props = paragraph._p.get_or_add_pPr()
        props.set('marL', str(Inches(0.25)))
        props.set('indent', str(-Inches(0.2)))
        bullet_color = OxmlElement('a:buClr')
        rgb = OxmlElement('a:srgbClr')
        rgb.set('val', 'FF0000')
        bullet_color.append(rgb)
        props.append(bullet_color)
        bullet = OxmlElement('a:buChar')
        bullet.set('char', chr(8226))
        props.append(bullet)
        paragraph.space_after = Pt(22)
    return shape


def picture(slide, file, x, y, max_w, max_h):
    shape = slide.shapes.add_picture(str(OUT / 'screenshots' / file), Inches(x), Inches(y))
    scale = min(Inches(max_w) / shape.width, Inches(max_h) / shape.height)
    shape.width = int(shape.width * scale)
    shape.height = int(shape.height * scale)


def reference(slide, label, url):
    shape = text(slide, f'{label} (checked November 9, 2026)',
                 0.7, 6.78, 11.9, 0.23, size=10, color='555555')
    shape.text_frame.paragraphs[0].runs[0].hyperlink.address = url


def build():
    deck = Presentation(TEMPLATE)
    layout = deck.slides[2].slide_layout
    source_ids = tuple(deck.slides._sldIdLst)

    def new_slide(title):
        slide = deck.slides.add_slide(layout)
        for shape in tuple(slide.shapes):
            if shape.is_placeholder:
                shape._element.getparent().remove(shape._element)
        text(slide, title, 0.65, 0.10, 11.4, 1.05,
             size=44 if len(title) <= 32 else 36, color='000000',
             bold=True, align=PP_ALIGN.CENTER)
        return slide

    slide = new_slide('LLMs in Bioinformatics')
    text(slide, 'Student pre-work', 1, 1.7, 11.3, 0.6, size=36, bold=True, align=PP_ALIGN.CENTER)
    text(slide, 'November 14-15, 2026', 1, 2.6, 11.3, 0.5, size=28, align=PP_ALIGN.CENTER)
    bullets(slide, ['Check that you can open Colab and run one Python cell.',
                    'Local Python / VS Code setup is optional.',
                    'Bring your laptop, charger, and questions.'], y=3.6, h=3.0)

    slide = new_slide('Before the workshop')
    bullets(slide, ['Bring a laptop and charger; check your browser and network.',
                    'Sign in to Google Colab with a Google account.',
                    'Run the small test cell shown on the next slide.',
                    'No paid plan, GPU, GitHub account, or API key is required for this pre-work.',
                    'If setup fails, bring the error with private information removed.'], size=25)

    slide = new_slide('Open Colab and test one cell')
    bullets(slide, ['Open colab.research.google.com and sign in.',
                    'Create a new notebook and run the code below.',
                    'Check the output beneath the code cell.'], h=3.0)
    text(slide, 'print("Hello, bioinformatics!")', 1.05, 4.5, 11.0, 0.7, size=30, color='000000')
    text(slide, 'Save your notebook. Runtime files and installed packages are temporary.', 0.65, 6.15, 12.0, 0.65, size=21)

    slide = new_slide('Use the slides and notebook together')
    bullets(slide, ['Read the slides to frame the biological question and method.',
                    'Open the instructor-provided notebook for that activity.',
                    'Save a copy in Drive before editing a shared workshop notebook.',
                    'Run cells in order and inspect their outputs.',
                    'Return to the slides to interpret the results.'])
    text(slide, 'The organizers will provide the final workshop notebook links.', 0.7, 6.2, 11.9, 0.55, size=20, bold=True)

    slide = new_slide('Optional local Python setup')
    picture(slide, 'vscode-python-tutorial-2026-11.png', 0.55, 1.65, 6.0, 3.75)
    text(slide, 'Official VS Code tutorial, captured November 9, 2026.', 0.6, 5.5, 6.0, 0.5, size=13, color='555555')
    bullets(slide, ['Install Python 3 and VS Code.',
                    'Install Microsoft\'s Python extension.',
                    'For local notebooks, add the Jupyter extension.',
                    'Create a .venv and select its interpreter / kernel.'], x=6.85, w=5.7, h=4.1, size=22)
    text(slide, 'Follow the student guide. Install lab packages only when final requirements are confirmed.', 0.65, 6.15, 12.0, 0.65, size=21)

    slide = new_slide('Keep research data safe')
    bullets(slide, ['Use only public or synthetic workshop data.',
                    'Do not upload identifiable, clinical, confidential, unpublished, or restricted data to personal cloud notebooks or AI tools.',
                    'Never put passwords, API keys, or access tokens into notebooks or prompts.',
                    'Share setup errors with private details removed; a teaching assistant can help.'])

    slide = new_slide('Optional AI access programs')
    text(slide, 'GitHub Copilot Student', 0.7, 1.65, 5.7, 0.55, size=27, bold=True)
    bullets(slide, ['Eligible enrolled students can apply through GitHub Education.',
                    'Provide current enrollment proof, then activate Copilot after approval.',
                    'See the guide for official eligibility and application links.'], x=0.7, y=2.5, w=5.65, h=3.45, size=22)
    text(slide, 'Claude for research labs', 6.85, 1.65, 5.7, 0.55, size=27, bold=True)
    bullets(slide, ['Anthropic\'s scientist access program is PI-led.',
                    'An eligible academic / nonprofit PI verifies first and may add lab members.',
                    'Ask your PI and check current terms using the official links in the guide.'], x=6.85, y=2.5, w=5.65, h=3.45, size=22)
    text(slide, 'Neither service is required for this pre-work. Do not buy a plan for it.', 0.7, 6.3, 11.9, 0.55, size=21, bold=True)

    slide = new_slide('Create a GitHub account (optional)')
    bullets(slide, ['Reuse your existing personal account, or open github.com/signup.',
                    'Follow the signup prompts; choose a username and verify your email.',
                    'Use a free account; no paid plan is needed for this optional setup.',
                    'Enable two-factor authentication and keep recovery codes private.',
                    'Check you can sign in. Education verification is a separate step.'], size=25)
    reference(slide, 'GitHub: creating a personal account',
              'https://docs.github.com/en/account-and-profile/how-tos/account-management/creating-an-account-on-github')

    slide = new_slide('GitHub Copilot in VS Code (optional)')
    bullets(slide, ['Update VS Code. Open Extensions and search for GitHub Copilot.',
                    'Use the official GitHub extension (GitHub.copilot-chat); install if needed.',
                    'Recent VS Code: Copilot icon > Use AI Features also starts setup.',
                    'Sign in with the account that has Copilot access; Free has usage limits.',
                    'In a scratch folder, ask: Explain this hello.py script. Review the answer.'], size=24)
    reference(slide, 'Official VS Code Copilot setup and sign-in',
              'https://code.visualstudio.com/docs/setup/copilot/')

    slide = new_slide('GitHub Copilot desktop app (optional)')
    bullets(slide, ['Install Git first. Download from github.com/github/app for your OS and CPU.',
                    'Run the platform installer, open the app, and sign in to GitHub.',
                    'Use existing Copilot access, Free, or verified Student access if eligible.',
                    'Open a disposable local folder; start an Interactive agent session.',
                    'Ask for an explanation first; review changes and commands before approval.'], size=24)
    text(slide, 'This is the GitHub Copilot app, not GitHub Desktop or Microsoft Copilot.',
         0.7, 6.25, 11.9, 0.45, size=18, bold=True)
    reference(slide, 'GitHub Copilot app: installation and first session',
              'https://docs.github.com/en/copilot/get-started/quickstart-copilot-app')

    slide = new_slide('Install Freebuff (optional)')
    bullets(slide, ['Before installation: use a separate, isolated OS account/environment; otherwise skip.',
                    'Download the official desktop installer for your OS and CPU at freebuff.com.',
                    'Read current terms/privacy; install only in that isolated environment.',
                    'Open the app and sign in; do not connect research drives or private repositories.',
                    'Ad-funded optional tool: verify availability. You do not need every tool.'], size=24)
    reference(slide, 'Freebuff official desktop downloads', 'https://freebuff.com/')

    slide = new_slide('Use Freebuff safely')
    bullets(slide, ['Create hello.py with print("Hello, bioinformatics!") in a disposable practice folder.',
                    'Use only public/synthetic files and keep an unchanged backup.',
                    'Agents may access files beyond a project folder; it is not a sandbox.',
                    'Try: Explain hello.py. Do not edit files or run commands.',
                    'Review any proposed edits and commands; check the outputs yourself.'], size=24)
    text(slide, 'Read data handling and advertising terms. A local app is not necessarily local-only.',
         0.7, 6.25, 11.9, 0.45, size=18, bold=True)
    reference(slide, 'Freebuff privacy policy (effective November 12, 2026)',
              'https://freebuff.com/privacy-policy')

    slide = new_slide('Bring your own data (optional)')
    bullets(slide, ['Workshop example data will be available; bringing your own data is optional.',
                    'Bring a small public or synthetic sample you are allowed to use, plus a question.',
                    'Add a README / data dictionary: columns, units, provenance, and expected output.',
                    'Do not upload patient-level, confidential, restricted, or unpublished data.',
                    'Ask an instructor before using it; a private repository is not approval for AI use.'], size=24)
    text(slide, 'If your real data are sensitive, bring the schema or a synthetic example instead.',
         0.7, 6.3, 11.9, 0.45, size=18, bold=True)

    slide = new_slide('Inside a Colab notebook')
    picture(slide, 'colab-notebook-mle-module1-2026-04.png', 1.05, 1.4, 11.2, 4.8)
    text(slide, 'Historical MLE 0426 Module 1 example. The following seven slides are original workshop slides; current Colab screens and features may differ.', 0.65, 6.35, 12.0, 0.6, size=16, color='555555')

    # Reorder, rather than flattening the original slides into screenshots.
    new_slide_count = len(deck.slides) - len(source_ids)
    for slide_id in source_ids:
        deck.slides._sldIdLst.remove(slide_id)
        deck.slides._sldIdLst.append(slide_id)
    for index, number in enumerate(SOURCE_SLIDES, start=new_slide_count):
        text(deck.slides[index], f'Historical: MLE 0426 Module 1 / slide {number} / April 2026. Current Colab screens/features may differ.', 5.65, 7.18, 7.4, 0.22, size=8, color='FFFFFF')

    deck.core_properties.title = 'LLMs in Bioinformatics: Student Pre-work'
    deck.core_properties.subject = 'Student pre-work using the MLE 0426 workshop template'
    deck.core_properties.author = 'Canadian Bioinformatics Workshops'
    deck.save(OUT / 'LLM_Bioinformatics_Prework_Orientation.pptx')
    print(f'Built {len(deck.slides)} slides with the native MLE 0426 master.')


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--source-deck', type=Path)
    args = parser.parse_args()
    if args.source_deck:
        prepare_template(args.source_deck)
    build()
