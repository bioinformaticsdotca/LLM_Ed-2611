// Preserve the existing entry point; use the native MLE PowerPoint master.
const path = require('path');
const { execFileSync } = require('child_process');
const root = path.join(__dirname, '..');
execFileSync(path.join(root, '.venv', 'bin', 'python'), [
  path.join(__dirname, 'build_prework_slides.py'), ...process.argv.slice(2)
], { cwd: root, stdio: 'inherit' });
