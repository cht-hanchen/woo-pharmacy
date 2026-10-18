# Handoff: 資安訓練遊戲版 (security training, game edition)

Two internal security-awareness courses for new hires at 新北營運處 (CHT), rebuilt from long scrolling pages into a game-style, **one-screen-at-a-time** web app.

| Course | Data file | Built file | Published (claude.ai, owner-only until shared) |
|---|---|---|---|
| 新進同仁資安須知 | `courses/sec.js` | `dist/sec.html` | https://claude.ai/artifact/6pXae7s2Fv9iNBLbMBDZZR |
| 電子郵件社交工程 | `courses/mail.js` | `dist/mail.html` | https://claude.ai/artifact/WPvrpyH6VaXB3b666TJny8 |

The published claude.ai pages can't be updated from Claude Code. From here on, `dist/*.html` is the deliverable: single self-contained files you can host on any static server or open locally.

## Quick start

```bash
pip install pillow playwright && playwright install chromium
python3 build.py                          # -> dist/sec.html, dist/mail.html
python3 tests/walk.py dist/sec.html       # desktop 1280x720
python3 tests/walk.py dist/mail.html phone --shots /tmp/shots
```

`tests/walk.py` exits non-zero on JS errors, desktop overflow, phone overflow, or if the boss can't be beaten. At handoff all four runs (2 courses × desktop/phone) pass.

## What the user asked for

1. **Match the visual style of `reference/Strapi_Editor_Training.html`**: dark "arena" game layer, ink splats, PLAY hub with mission cards, XP and ranks, boss battle. Fonts: Lilita One (Latin game type), Noto Sans TC (body and CJK game type at weight 900), IBM Plex Mono (key hints).
2. **No scrolling, ever, on desktop.** Each section must fit one screen so readers aren't distracted. The navigation model comes from `reference/inkwave-menu-reference.mp4` (a game menu): title → mode select → stage select with a list on the left, one big panel on the right, and a START button bottom-right.

Rule 2 is the core constraint. Don't add long-form scrolling sections.

## Architecture

```
src/engine.css     all styles (light/dark tokens, screens, components, widgets)
src/engine.js      screens, transitions, XP/progress, widgets. Reads window.COURSE.
courses/*.js       window.COURSE = {...}: content only, HTML strings + data
assets/<course>/   screenshots, referenced from course data as @@file.png@@
build.py           inlines css + course + engine + images (as JPEG data URIs) into dist/
reference/         originals; read-only, not shipped
```

One engine, N courses. To add a course: new `courses/x.js`, an `assets/x/` folder, and one line in `COURSES` in `build.py`.

### Screens (engine.js)

- **Title**: `renderTitle()`. Logo, PLAY, 繼續上次, 魔王戰, 重設進度 (two-click confirm), a WHY panel, caution tape.
- **Hub**: `renderHub()`. One card per chapter plus a boss card, in 2 rows (`--cols = ceil((chapters+1)/2)`). Arrow-key grid navigation.
- **Chapter**: `renderChapter(ci, si)`. Stage list, panel, prev/next. ↑↓ change stage, ←→ prev/next, Esc returns to hub.
- **Boss**: `renderBoss()`. Quiz with an HP bar; 80% to win. A/B/C/D keys answer.
- Screen changes go through `go(renderFn, color)`, which plays an ink-splat wipe (skipped with prefers-reduced-motion).

### The no-scroll mechanism

`fit(pb)` runs after every stage render, tab switch, and resize:
- **Overflowing:** steps `--fz` down by 0.04 to a floor of 0.66. Every panel font size is `calc(1rem * var(--fz))`.
- **Sparse stages** (no `.fig/.irw/.sorter/.md/.split`): scales up to 1.24 to fill the space.
- **Still overflows at 0.66:** adds `.scrolly` as a last resort. The test flags this as OVERFLOW; fix it by splitting the stage.
- **Small screens** (`max-width:900px` or portrait): fitting is skipped and the panel scrolls internally. That is acceptable on phones.

The root font size scales with both width and height: `clamp(12.5px, min(1.22vw, 2.08vh), 20px)`.

### Course schema (`window.COURSE`)

```js
{
  id, player, c1 /* title ink */, ranks: [[fraction, name], ...],
  titleScreen: { eyebrow, l1, l2, lede, playSub, meta: [], tape: [], why: "<html>" },
  chapters: [{
    id, tag, title, ribbon /* short hub label */, ink /* pink|teal|yellow|blue|red|violet */,
    icon /* key in ICONS */, seed /* splat shape */, mins, desc,
    stages: [ { t, sub?, html } | { t, sub?, type: "sorter"|"irmas"|"pw"|"dir", ... } ]
  }],
  boss: { name, desc, win, art /* SVG inner markup, viewBox 0 0 200 200 */, Q: [{ q, o: [4], a, e }] },
  contacts?: [[unit, code, name, phone]],   // used by type:"dir"
  irmas?: { key: { l, pane, t, auto, fixLabel, hint, rows? } }   // used by type:"irmas"
}
```

**Stage types**

- `html` (default): any markup built from the component classes below.
- `sorter`: practice cards with `btns: [{v, l, cls}]` and `items: [{n, d?, f?, a, why}]`. It gates progress: later stages in the chapter and the boss stay locked until it's cleared.
- `irmas`: rebuilt IRMAS 3.9.3 window plus violation scenarios. Needs `#irHost` and `#irSim` in `html`.
- `pw`: password strength checker. Needs a `.pw` element in `html`.
- `dir`: searchable contact grid. Needs `#dirQ` and `#dirOut`.

**Behaviors wired automatically inside any stage** (`wire()`)

- `[data-md]` with `[data-t]` triggers and `[data-p]` panes: master–detail tabs. Triggers with `role=tab` get arrow keys; others act as pins.
- `button.zoom > img`: lightbox. A `.fig` with 2+ images becomes a one-at-a-time pager.
- `[data-modal=key]` plus `<template data-mt=key>`: modal.
- `[data-count=N]`: count-up number.
- `ul[data-chk=id]`: persisted checklist, with `[data-chkn=id]` counter and `[data-chkclear=id]` reset.

**Component classes**

`lead`, `ul`, `grid c2|c3|c4` with `card` (plus `ok`/`no`), `callout` (plus `bad`/`info`), `punch`, `path`, `flow` (plus `v`) with `fn` (plus `alert`) and `ar`, `tbl`, `split` (plus `rev`), `col`, `fig`, `steps` (plus `compact`; continue numbering with `style="counter-reset:s 6"`), `stat`, `chipz` (plus `bad`/`mono`), `tierlist`/`tier`, `mail`, `inbox`/`it`, `tagx`, `chk`.

### Progress and XP

Progress is stored in `localStorage` under `sectrain:<COURSE.id>` as `{seen, prac, done, boss, chk, last}`. All reads and writes are wrapped in try/catch.

XP:
- Each stage seen: 10
- Each practice cleared: 100
- Each chapter done: 50
- Boss won: 300

Ranks are thresholds on the fraction of max XP. Progress is per browser only; there is no server and no result collection.

## Content decisions to double-check with the user

- **Breach total (sec CH.05):** shows 5,788,000,000, the sum of the 16 listed breaches (in millions). The original page animated a counter whose target I couldn't confirm.
- **Click-rate target (mail CH.02):** shows **0%**. The original hero had a stray "誤點擊率目標100%" counter, but its own table says 0%. CH.09 separately says the company-wide target is <1%; both appear in the source, for different scopes.
- **"病毒碼版本己過期":** keeps the typo (己/已) because it mirrors the real IRMAS UI string.
- **Date-sensitive content:** 原簡報 2025/12/22, 場域清單 2026/1/22 版, 114 年下半年 test emails, and the 資訊負責人 directory (names and phones) will go stale.
- **Sec 終章 card:** the original's 結語, FAQ, appendix, and first-week checklist are folded into one 終章 card. The original WHY section is now the title screen.

## Known gaps / next steps

1. **Fonts load from Google Fonts.** On an intranet that blocks them, the page falls back to system CJK fonts and the game type looks thin. Option: self-host Lilita One and a subset of Noto Sans TC (weight 900) and inline them as base64 in `build.py`.
2. **No result collection.** If the user wants completion records, add a POST at boss win, or export a completion code or certificate.
3. **Gating is strict:** practices lock the rest of the chapter and the boss, matching the originals' "答對才能往下讀" rule. The user may want a toggle to turn it off.
4. **UI strings are hard-coded in Chinese inside engine.js.** Fine for now; extract them if another language is ever needed.
5. **dist size:** mail is about 2.5 MB because of 14 inlined Outlook screenshots. Lowering the JPEG quality or width in `datauri()` would shrink it if needed.
6. **Accessibility:** keyboard navigation, focus rings, `aria-live` feedback, and reduced motion are in place. Screen-reader passes haven't been done.

## Conventions

- Course content stays in `courses/*.js`. Don't hard-code course text in the engine.
- After any content edit, run `tests/walk.py` for that course on **desktop and phone**. A stage flagged `crowded` (fz < 0.75) or `OVERFLOW` should be split into two stages, not squeezed.
- Every color comes from the tokens at the top of `engine.css`, which have dark-mode values. Don't introduce raw hex in components. The exceptions are the IRMAS window (it mimics a real Windows app) and the boss SVG art.
- Traditional Chinese (zh-Hant) for all user-facing text.
