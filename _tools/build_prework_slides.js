const pptxgen = require('/tmp/llm-prework-deps/node_modules/pptxgenjs');
const path = require('path');
const outDir = path.join(__dirname, '..', 'prework');

const pptx = new pptxgen();
pptx.layout = 'LAYOUT_WIDE';
pptx.author = 'Canadian Bioinformatics Workshop';
pptx.subject = 'Student pre-work orientation';
pptx.title = 'Get Ready: LLMs in Bioinformatics';
pptx.company = 'Canadian Bioinformatics Workshop';
pptx.lang = 'en-CA';
pptx.theme = {
  headFontFace: 'Cambria',
  bodyFontFace: 'Calibri',
  lang: 'en-CA'
};
pptx.defineSlideMaster({
  title: 'CONTENT',
  background: { color: 'F4F7F6' },
  objects: [
    { text: { text: 'LLMs IN BIOINFORMATICS  /  STUDENT PRE-WORK', options: { x: 0.55, y: 7.12, w: 8.6, h: 0.18, fontFace: 'Calibri', fontSize: 9, color: '52636A', margin: 0 } } },
    { text: { text: 'NOVEMBER 14-15, 2026', options: { x: 10.25, y: 7.12, w: 2.5, h: 0.18, fontFace: 'Calibri', fontSize: 9, color: '52636A', align: 'right', margin: 0 } } }
  ],
  slideNumber: { x: 12.9, y: 7.10, color: '52636A', fontFace: 'Calibri', fontSize: 9 }
});

const C = { ink: '112A35', teal: '007D78', lime: 'C8E66B', coral: 'EE715B', paper: 'F4F7F6', white: 'FFFFFF', muted: '52636A', line: 'D6E0DF', dark: '0C242E' };
const ss = path.join(outDir, 'screenshots');
const titleStyle = { fontFace: 'Cambria', fontSize: 29, bold: true, color: C.ink, margin: 0, breakLine: false };

function addTitle(slide, title, eyebrow) {
  slide.addText(eyebrow.toUpperCase(), { x: 0.65, y: 0.42, w: 8.8, h: 0.25, fontFace: 'Calibri', fontSize: 11, bold: true, charSpacing: 1.6, color: C.teal, margin: 0 });
  slide.addText(title, { ...titleStyle, x: 0.65, y: 0.82, w: 11.8, h: 0.55 });
}

function card(slide, x, y, w, h, fill = C.white) {
  slide.addShape(pptx.ShapeType.roundRect, { x, y, w, h, rectRadius: 0.12, fill: { color: fill }, line: { color: fill, transparency: 100 }, shadow: { type: 'outer', color: '1B3B43', blur: 3, offset: 1, angle: 45, opacity: 0.08 } });
}

function addNumber(slide, n, x, y, color = C.teal) {
  slide.addShape(pptx.ShapeType.ellipse, { x, y, w: 0.42, h: 0.42, fill: { color }, line: { color, transparency: 100 } });
  slide.addText(String(n), { x, y: y + 0.01, w: 0.42, h: 0.36, fontFace: 'Calibri', fontSize: 16, bold: true, color: C.white, align: 'center', valign: 'mid', margin: 0 });
}

// Cover
{
  const s = pptx.addSlide();
  s.background = { color: C.dark };
  s.addShape(pptx.ShapeType.ellipse, { x: 9.35, y: -1.2, w: 5.1, h: 5.1, fill: { color: '154650' }, line: { color: '154650', transparency: 100 } });
  s.addShape(pptx.ShapeType.ellipse, { x: 10.55, y: 3.1, w: 2.2, h: 2.2, fill: { color: C.teal }, line: { color: C.teal, transparency: 100 } });
  s.addShape(pptx.ShapeType.ellipse, { x: 9.8, y: 4.25, w: 0.56, h: 0.56, fill: { color: C.lime }, line: { color: C.lime, transparency: 100 } });
  s.addText('CANADIAN BIOINFORMATICS WORKSHOP', { x: 0.8, y: 0.7, w: 6.7, h: 0.3, fontFace: 'Calibri', fontSize: 12, bold: true, charSpacing: 2, color: C.lime, margin: 0 });
  s.addText('Get ready for\nLLMs in\nBioinformatics', { x: 0.8, y: 1.65, w: 7.9, h: 3.05, fontFace: 'Cambria', fontSize: 37, bold: true, color: C.white, breakLine: false, margin: 0, valign: 'mid', fit: 'shrink' });
  s.addText('A short, practical setup guide for students', { x: 0.83, y: 5.05, w: 7.5, h: 0.4, fontFace: 'Calibri', fontSize: 19, color: 'D5E2E1', margin: 0 });
  s.addText('NOVEMBER 14-15, 2026', { x: 0.83, y: 6.28, w: 5.5, h: 0.3, fontFace: 'Calibri', fontSize: 13, bold: true, charSpacing: 1.5, color: C.lime, margin: 0 });
  s.addText('10 minutes required  /  local setup optional', { x: 0.83, y: 6.66, w: 6.8, h: 0.28, fontFace: 'Calibri', fontSize: 12, color: 'B8CBCA', margin: 0 });
}

// Simple readiness checklist
{
  const s = pptx.addSlide('CONTENT');
  addTitle(s, 'A light-touch pre-work check', 'Start here');
  const items = [
    ['Laptop + charger', 'Bring a laptop you can use in a browser.'],
    ['Google Colab access', 'Sign in and run one tiny Python cell.'],
    ['Slides + notebook', 'Open the module slides beside its linked notebook.'],
    ['Questions are welcome', 'If setup fails, bring the error; a TA can help.']
  ];
  let y = 1.72;
  for (let i = 0; i < items.length; i += 1) {
    card(s, 0.75, y, 7.2, 0.9);
    addNumber(s, i + 1, 1.02, y + 0.23, i === 3 ? C.coral : C.teal);
    s.addText(items[i][0], { x: 1.65, y: y + 0.14, w: 2.4, h: 0.27, fontFace: 'Calibri', fontSize: 16, bold: true, color: C.ink, margin: 0 });
    s.addText(items[i][1], { x: 4.0, y: y + 0.16, w: 3.5, h: 0.48, fontFace: 'Calibri', fontSize: 13, color: C.muted, margin: 0, breakLine: false, fit: 'shrink' });
    y += 1.08;
  }
  card(s, 8.35, 1.72, 4.2, 4.15, 'E8F1ED');
  s.addText('Not required for this pre-work', { x: 8.72, y: 2.12, w: 3.4, h: 0.35, fontFace: 'Cambria', fontSize: 19, bold: true, color: C.ink, margin: 0 });
  s.addText('Paid plans\nGPU access\nGitHub or Copilot account\nA pre-installed package bundle', { x: 8.75, y: 2.85, w: 3.2, h: 2.05, fontFace: 'Calibri', fontSize: 17, color: C.muted, breakLine: false, bullet: { indent: 15 }, paraSpaceAfterPt: 12, margin: 0.02, fit: 'shrink' });
  s.addText('If the final lab instructions change a requirement, the organizers will say so explicitly.', { x: 8.72, y: 5.05, w: 3.35, h: 0.54, fontFace: 'Calibri', fontSize: 11, italic: true, color: C.teal, margin: 0, fit: 'shrink' });
}

// Colab
{
  const s = pptx.addSlide('CONTENT');
  addTitle(s, 'Open Colab and test one cell', 'Required · about 10 minutes');
  card(s, 0.7, 1.65, 5.5, 4.7);
  s.addImage({ path: path.join(ss, 'colab-home-2026-11.png'), x: 0.9, y: 1.9, w: 5.1, h: 2.88 });
  s.addText('Colab landing page, signed out. Captured Nov 9, 2026.', { x: 1.02, y: 4.92, w: 4.8, h: 0.45, fontFace: 'Calibri', fontSize: 10, color: C.muted, margin: 0, fit: 'shrink' });
  s.addText('Open colab.research.google.com and sign in with a Google account.', { x: 1.0, y: 5.45, w: 4.8, h: 0.5, fontFace: 'Calibri', fontSize: 13, bold: true, color: C.ink, margin: 0, fit: 'shrink' });
  card(s, 6.65, 1.65, 5.95, 4.7);
  s.addText('Run this in a code cell', { x: 7.05, y: 2.05, w: 4.9, h: 0.38, fontFace: 'Cambria', fontSize: 22, bold: true, color: C.ink, margin: 0 });
  s.addShape(pptx.ShapeType.roundRect, { x: 7.05, y: 2.8, w: 5.0, h: 1.0, rectRadius: 0.1, fill: { color: '102B35' }, line: { color: '102B35', transparency: 100 } });
  s.addText('print("Hello, bioinformatics!")', { x: 7.35, y: 3.1, w: 4.4, h: 0.35, fontFace: 'Courier New', fontSize: 17, color: 'E0F5A9', margin: 0, fit: 'shrink' });
  s.addText('Your check is complete when the output appears below the cell.', { x: 7.05, y: 4.2, w: 4.95, h: 0.62, fontFace: 'Calibri', fontSize: 15, color: C.muted, margin: 0, fit: 'shrink' });
  s.addText('Save a copy of a workshop notebook before editing. Colab sessions are temporary; save work you want to keep.', { x: 7.05, y: 5.15, w: 4.95, h: 0.85, fontFace: 'Calibri', fontSize: 14, bold: true, color: C.teal, margin: 0, fit: 'shrink' });
}

// Slides + notebook pattern
{
  const s = pptx.addSlide('CONTENT');
  addTitle(s, 'Let the slides and notebook work as a pair', 'During the workshop');
  const steps = [
    { n: '01', head: 'Slides', text: 'Frame the biological question and the method.', fill: 'E5F1EF' },
    { n: '02', head: 'Notebook', text: 'Open the linked lab, save a Drive copy, follow setup notes.', fill: 'EAF0D8' },
    { n: '03', head: 'Run + inspect', text: 'Execute cells in order. Read the output; do not just race to the end.', fill: 'F9E9E4' },
    { n: '04', head: 'Return to slides', text: 'Use the checkpoint to connect results back to the concept.', fill: 'E5F1EF' }
  ];
  const xs = [0.75, 3.9, 7.05, 10.2];
  for (let i = 0; i < steps.length; i += 1) {
    card(s, xs[i], 2.1, 2.4, 2.8, steps[i].fill);
    s.addText(steps[i].n, { x: xs[i] + 0.23, y: 2.34, w: 0.65, h: 0.32, fontFace: 'Calibri', fontSize: 13, bold: true, color: C.teal, charSpacing: 1, margin: 0 });
    s.addText(steps[i].head, { x: xs[i] + 0.23, y: 2.92, w: 1.95, h: 0.45, fontFace: 'Cambria', fontSize: 19, bold: true, color: C.ink, margin: 0, fit: 'shrink' });
    s.addText(steps[i].text, { x: xs[i] + 0.23, y: 3.6, w: 1.95, h: 1.0, fontFace: 'Calibri', fontSize: 13, color: C.muted, margin: 0, fit: 'shrink', valign: 'top' });
  }
  s.addShape(pptx.ShapeType.chevron, { x: 3.32, y: 3.12, w: 0.38, h: 0.5, fill: { color: C.teal }, line: { color: C.teal, transparency: 100 } });
  s.addShape(pptx.ShapeType.chevron, { x: 6.47, y: 3.12, w: 0.38, h: 0.5, fill: { color: C.teal }, line: { color: C.teal, transparency: 100 } });
  s.addShape(pptx.ShapeType.chevron, { x: 9.62, y: 3.12, w: 0.38, h: 0.5, fill: { color: C.teal }, line: { color: C.teal, transparency: 100 } });
  s.addText('Your instructor will share the notebook link for each lab before the activity.', { x: 1.2, y: 5.65, w: 10.8, h: 0.45, fontFace: 'Calibri', fontSize: 16, bold: true, color: C.teal, align: 'center', margin: 0, fit: 'shrink' });
}

// Local Python/VS Code
{
  const s = pptx.addSlide('CONTENT');
  addTitle(s, 'Local Python setup is optional', 'Only if you want to prepare');
  card(s, 0.7, 1.65, 6.05, 4.8);
  s.addImage({ path: path.join(ss, 'vscode-python-tutorial-2026-11.png'), x: 0.93, y: 1.95, w: 5.6, h: 3.15 });
  s.addText('Official VS Code Python tutorial, captured Nov 9, 2026.', { x: 1.03, y: 5.28, w: 5.2, h: 0.34, fontFace: 'Calibri', fontSize: 10, color: C.muted, margin: 0 });
  s.addText('Use the current vendor instructions if the page changes.', { x: 1.03, y: 5.72, w: 5.2, h: 0.34, fontFace: 'Calibri', fontSize: 12, bold: true, color: C.teal, margin: 0 });
  card(s, 7.15, 1.65, 5.45, 4.8, 'E8F1ED');
  s.addText('What you need', { x: 7.55, y: 2.03, w: 4.5, h: 0.4, fontFace: 'Cambria', fontSize: 22, bold: true, color: C.ink, margin: 0 });
  s.addText('1. Python 3 interpreter\n2. VS Code editor\n3. Microsoft Python extension\n4. Optional: Jupyter extension for local notebooks', { x: 7.55, y: 2.68, w: 4.5, h: 1.6, fontFace: 'Calibri', fontSize: 15, color: C.ink, breakLine: false, margin: 0.01, paraSpaceAfterPt: 10, fit: 'shrink' });
  s.addShape(pptx.ShapeType.roundRect, { x: 7.55, y: 4.65, w: 4.45, h: 0.76, rectRadius: 0.08, fill: { color: C.dark }, line: { color: C.dark, transparency: 100 } });
  s.addText('print("Hello, bioinformatics!")', { x: 7.82, y: 4.9, w: 3.9, h: 0.25, fontFace: 'Courier New', fontSize: 13, color: C.lime, margin: 0, fit: 'shrink' });
  s.addText('Do not install workshop libraries until exact lab requirements are confirmed.', { x: 7.55, y: 5.72, w: 4.45, h: 0.45, fontFace: 'Calibri', fontSize: 12, bold: true, color: C.coral, margin: 0, fit: 'shrink' });
}

// Close / safety
{
  const s = pptx.addSlide();
  s.background = { color: C.dark };
  s.addText('Ready is enough.', { x: 0.8, y: 0.7, w: 7, h: 0.7, fontFace: 'Cambria', fontSize: 34, bold: true, color: C.white, margin: 0 });
  s.addText('Bring your laptop, your questions, and your curiosity.', { x: 0.82, y: 1.63, w: 10.8, h: 0.45, fontFace: 'Calibri', fontSize: 20, color: 'D3E4E1', margin: 0 });
  card(s, 0.85, 2.65, 7.0, 2.8, '173B43');
  s.addText('Keep research data safe', { x: 1.25, y: 3.03, w: 5.8, h: 0.38, fontFace: 'Cambria', fontSize: 22, bold: true, color: C.lime, margin: 0 });
  s.addText('Use public or synthetic workshop data only. Never upload identifiable, clinical, confidential, unpublished, or restricted data to personal cloud notebooks or AI tools.', { x: 1.25, y: 3.68, w: 5.9, h: 1.15, fontFace: 'Calibri', fontSize: 17, color: C.white, margin: 0, fit: 'shrink' });
  s.addText('If setup fails, bring the error message with private details removed. A TA can help.', { x: 8.55, y: 3.12, w: 3.55, h: 1.15, fontFace: 'Calibri', fontSize: 17, color: C.white, margin: 0, fit: 'shrink' });
  s.addText('See the student guide for official links and step-by-step instructions.', { x: 8.55, y: 4.65, w: 3.6, h: 0.48, fontFace: 'Calibri', fontSize: 13, bold: true, color: C.lime, margin: 0, fit: 'shrink' });
  s.addText('CANADIAN BIOINFORMATICS WORKSHOP  /  NOVEMBER 2026', { x: 0.83, y: 6.62, w: 9.5, h: 0.27, fontFace: 'Calibri', fontSize: 11, bold: true, charSpacing: 1, color: 'B8CBCA', margin: 0 });
}

// Optional access programs
{
  const s = pptx.addSlide('CONTENT');
  addTitle(s, 'Optional AI access programs', 'Not needed for this workshop');
  card(s, 0.75, 1.7, 5.75, 4.9, 'E5F1EF');
  s.addText('GitHub Copilot Student', { x: 1.12, y: 2.05, w: 4.9, h: 0.42, fontFace: 'Cambria', fontSize: 22, bold: true, color: C.ink, margin: 0 });
  s.addText('For verified students in eligible degree- or diploma-granting programs. Apply through GitHub Education with current enrollment proof, then activate Copilot Student separately after approval.', { x: 1.12, y: 2.78, w: 4.85, h: 1.45, fontFace: 'Calibri', fontSize: 15, color: C.ink, margin: 0, fit: 'shrink', valign: 'top' });
  s.addText('Start: github.com/settings/education/benefits', { x: 1.12, y: 4.65, w: 4.9, h: 0.42, fontFace: 'Calibri', fontSize: 12, bold: true, color: C.teal, margin: 0, fit: 'shrink' });
  s.addText('See the guide for official application instructions.', { x: 1.12, y: 5.35, w: 4.8, h: 0.42, fontFace: 'Calibri', fontSize: 12, color: C.muted, margin: 0 });
  card(s, 6.85, 1.7, 5.75, 4.9, 'F9E9E4');
  s.addText('Claude for research labs', { x: 7.22, y: 2.05, w: 4.95, h: 0.42, fontFace: 'Cambria', fontSize: 22, bold: true, color: C.ink, margin: 0 });
  s.addText('Anthropic’s scientist plan is PI-led: an eligible academic/nonprofit PI verifies first, then may add lab members. Announced standard seats are free and premium seats are US$15/month for one year; confirm current availability and terms.', { x: 7.22, y: 2.78, w: 4.85, h: 1.75, fontFace: 'Calibri', fontSize: 14, color: C.ink, margin: 0, fit: 'shrink', valign: 'top' });
  s.addText('Students: ask your PI; workshop registration alone does not qualify you.', { x: 7.22, y: 4.8, w: 4.85, h: 0.68, fontFace: 'Calibri', fontSize: 13, bold: true, color: C.coral, margin: 0, fit: 'shrink' });
  s.addText('No paid AI account is required for pre-work.', { x: 1.0, y: 6.72, w: 11.2, h: 0.3, fontFace: 'Calibri', fontSize: 14, bold: true, color: C.teal, align: 'center', margin: 0 });
}

// Colab notebook example reused from the April 2026 MLE Module 1 lecture.
{
  const s = pptx.addSlide('CONTENT');
  addTitle(s, 'Inside a Colab notebook', 'Interface example · April 2026');
  card(s, 0.72, 1.62, 8.15, 4.8);
  s.addImage({ path: path.join(ss, 'colab-notebook-mle-module1-2026-04.png'), x: 0.92, y: 1.85, w: 7.75, h: 4.15 });
  card(s, 9.2, 1.62, 3.42, 4.8, 'E8F1ED');
  s.addText('A notebook has', { x: 9.55, y: 2.0, w: 2.75, h: 0.42, fontFace: 'Cambria', fontSize: 20, bold: true, color: C.ink, margin: 0 });
  s.addText('Code cells\nOutputs beneath cells\nText and explanation\nControls to add cells and save a copy', { x: 9.55, y: 2.75, w: 2.75, h: 2.2, fontFace: 'Calibri', fontSize: 15, color: C.ink, breakLine: false, margin: 0.01, paraSpaceAfterPt: 12, fit: 'shrink' });
  s.addText('Historical screenshot reused from Module 1 of the April 2026 Machine Learning workshop. Current Colab screens may differ.', { x: 9.55, y: 5.25, w: 2.75, h: 0.72, fontFace: 'Calibri', fontSize: 11, italic: true, color: C.muted, margin: 0, fit: 'shrink' });
  s.addText('Use the current official Colab page and the workshop-provided notebook link.', { x: 1.0, y: 6.72, w: 11.2, h: 0.3, fontFace: 'Calibri', fontSize: 14, bold: true, color: C.teal, align: 'center', margin: 0 });
}

// Full source slides preserve the historical Colab walkthrough context.
{
  const sourceSlides = [
    ['090', 'Google Colab introduction'],
    ['097', 'Colab access'],
    ['108', 'Colab notebook interface'],
    ['111', 'Creating a notebook'],
    ['115', 'Hello World example'],
    ['116', 'Running a code cell'],
    ['125', 'Running all cells']
  ];

  for (const [number, description] of sourceSlides) {
    const s = pptx.addSlide('CONTENT');
    addTitle(s, description, `Historical MLE Module 1 slide ${number} · April 2026`);
    card(s, 0.55, 1.55, 9.7, 5.25);
    s.addImage({ path: path.join(ss, `mle0426-module1-slide-${number}.png`), x: 0.68, y: 1.68, w: 9.44, h: 5.0, sizing: 'contain' });
    card(s, 10.55, 1.55, 2.25, 5.25, 'E8F1ED');
    s.addText('Historical example', { x: 10.82, y: 1.95, w: 1.72, h: 0.6, fontFace: 'Cambria', fontSize: 18, bold: true, color: C.ink, margin: 0, fit: 'shrink' });
    s.addText(`MLE 0426\nModule 1\nSlide ${number}\nApril 2026`, { x: 10.82, y: 2.85, w: 1.72, h: 1.5, fontFace: 'Calibri', fontSize: 14, color: C.ink, margin: 0, breakLine: false, fit: 'shrink' });
    s.addText('This is a historical interface walkthrough. Colab screens and service features can change; follow current official instructions.', { x: 10.82, y: 4.65, w: 1.72, h: 1.45, fontFace: 'Calibri', fontSize: 12, italic: true, color: C.muted, margin: 0, breakLine: false, fit: 'shrink', valign: 'top' });
  }
}

pptx.writeFile({ fileName: path.join(outDir, 'LLM_Bioinformatics_Prework_Orientation.pptx') });
