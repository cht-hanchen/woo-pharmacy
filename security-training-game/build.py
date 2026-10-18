"""Build self-contained HTML files: engine + one course + images inlined as data URIs.

Usage:
    python3 build.py          # build every course in COURSES
    python3 build.py sec      # build one
Requires: pip install pillow
"""
import base64
import io
import re
import sys
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).parent
COURSES = {
    # key: (course data file, image folder, <title>, output file)
    "sec": ("courses/sec.js", "assets/sec", "新進同仁資安須知", "dist/sec.html"),
    "mail": ("courses/mail.js", "assets/mail", "電子郵件社交工程", "dist/mail.html"),
}


def datauri(path: Path) -> str:
    im = Image.open(path)
    if im.mode in ("RGBA", "P"):
        im = im.convert("RGBA")
        bg = Image.new("RGB", im.size, (255, 255, 255))
        bg.paste(im, mask=im.split()[3])
        im = bg
    else:
        im = im.convert("RGB")
    if im.width > 1400:
        im = im.resize((1400, int(im.height * 1400 / im.width)), Image.LANCZOS)
    buf = io.BytesIO()
    im.save(buf, "JPEG", quality=82, optimize=True, progressive=True)
    return "data:image/jpeg;base64," + base64.b64encode(buf.getvalue()).decode()


def build(key: str) -> None:
    course, imgdir, title, out = COURSES[key]
    css = (ROOT / "src/engine.css").read_text(encoding="utf8")
    eng = (ROOT / "src/engine.js").read_text(encoding="utf8")
    data = (ROOT / course).read_text(encoding="utf8")
    # @@file.png@@ placeholders in course data -> inlined image
    data = re.sub(r"@@([\w\-.]+)@@", lambda m: datauri(ROOT / imgdir / m.group(1)), data)
    html = f"""<!doctype html><html lang="zh-Hant"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{title}</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Lilita+One&family=Noto+Sans+TC:wght@400;500;700;900&family=IBM+Plex+Mono:wght@500;600&display=swap">
<style>{css}</style></head><body><main id="app"></main>
<script>{data}</script>
<script>{eng}</script>
</body></html>"""
    target = ROOT / out
    target.parent.mkdir(exist_ok=True)
    target.write_text(html, encoding="utf8")
    print(f"{out}  {len(html) // 1024} KB")


if __name__ == "__main__":
    for k in sys.argv[1:] or COURSES:
        build(k)
