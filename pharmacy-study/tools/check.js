// Checks a subject page's window.SUBJECT data. Usage: node tools/check.js subjects/<id>.html [...]
const fs = require('fs'), vm = require('vm');
let failed = false;
for (const file of process.argv.slice(2)) {
  const errs = [];
  const html = fs.readFileSync(file, 'utf8');
  const m = html.match(/<script>([\s\S]*?window\.SUBJECT[\s\S]*?)<\/script>/);
  let S;
  if (!m) errs.push('no <script> with window.SUBJECT');
  else {
    const ctx = { window: {} };
    try { vm.runInNewContext(m[1], ctx); S = ctx.window.SUBJECT; } catch (e) { errs.push('JS error: ' + e.message); }
  }
  if (S) {
    for (const k of ['id', 'title', 'tagline', 'intro', 'sections', 'quiz']) if (!S[k]) errs.push('missing ' + k);
    if (S.hook && (!S.hook.q || !S.hook.a)) errs.push('hook needs q and a');
    if (!S.intro || !S.intro.lead) errs.push('intro.lead missing');
    (S.sections || []).forEach((s, i) => {
      if (!s.title) errs.push(`sections[${i}].title missing`);
      if (s.table) {
        const n = s.table.head.length;
        s.table.rows.forEach((r, j) => { if (r.length !== n) errs.push(`sections[${i}].table row ${j} has ${r.length} cells, head has ${n}`); });
      }
    });
    (S.mnemonics || []).forEach((x, i) => { if (!x.title || !x.text) errs.push(`mnemonics[${i}] needs title,text`); });
    (S.flashcards || []).forEach((x, i) => { if (!x.front || !x.back) errs.push(`flashcards[${i}] needs front,back`); });
    const dist = [0, 0, 0, 0];
    (S.quiz || []).forEach((q, i) => {
      if (!q.q || !Array.isArray(q.options) || q.options.length !== 4) errs.push(`quiz[${i}] needs q and exactly 4 options`);
      if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer > 3) errs.push(`quiz[${i}].answer must be 0-3`);
      else dist[q.answer]++;
      if (!q.explain) errs.push(`quiz[${i}].explain missing`);
    });
    console.log(`${file}: ${S.sections.length} sections, ${(S.mnemonics || []).length} mnemonics, ${(S.flashcards || []).length} flashcards, ${S.quiz.length} questions, answers A-D = ${dist.join('/')}`);
  }
  if (errs.length) { failed = true; console.log('  ✗ ' + errs.join('\n  ✗ ')); } else console.log('  ✓ ok');
}
process.exit(failed ? 1 : 0);
