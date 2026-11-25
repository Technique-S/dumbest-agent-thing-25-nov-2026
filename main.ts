import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { INCIDENT } from './line.ts';

// Write exactly one incident line to /output/entry.txt. The gate accepts UTF-8
// text of 1 to 200 characters that is not only whitespace, so check those
// constraints before anything reaches the judge. The line must stay on one
// line: a newline would make the judged text a different shape.
const text = INCIDENT;
const size = [...text].length;
if (size < 1 || size > 200) {
  throw new Error(`an incident line must be 1-200 characters, got ${size}`);
}
if (!text.trim()) {
  throw new Error('the incident line must not be only whitespace');
}
if (/[\u0000-\u0009\u000b-\u001f\u007f\u2028\u2029]/.test(text)) {
  throw new Error('an incident line must be one line with no control characters');
}
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
const target = join(outDir, 'entry.txt');
writeFileSync(target, text, 'utf8');
console.log(`wrote a ${size}-character, single-line incident to ${target}`);
