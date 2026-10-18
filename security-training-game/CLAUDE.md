# CLAUDE.md

Read HANDOFF.md first. It has the full context, the architecture, and the open questions.

- Hard rule: on desktop, every stage fits one screen with no scrolling. Split a stage instead of squeezing it.
- Content lives in courses/*.js; the engine (src/) is shared by all courses.
- Build: `python3 build.py`. Verify: `python3 tests/walk.py dist/<course>.html desktop` and `... phone`. Both must exit 0.
- User-facing text is Traditional Chinese (zh-Hant).
- reference/ holds the originals and the style references. Read them; don't ship them.
