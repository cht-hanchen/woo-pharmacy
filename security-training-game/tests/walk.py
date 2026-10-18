"""Smoke test with Playwright.

Walks every stage of every chapter and reports per stage:
  - fz      auto-fit scale (<0.75 = crowded, consider splitting the stage)
  - OVERFLOW  desktop stage still needs scrolling after auto-fit
  - TOO WIDE  phone panel wider than the viewport
Plays every practice (sorter) stage and the boss quiz to the end, and lists JS page errors.

Usage:
    python3 tests/walk.py dist/sec.html [desktop|phone] [--shots DIR]
Requires: pip install playwright && playwright install chromium
"""
import asyncio
import sys
from pathlib import Path

from playwright.async_api import async_playwright


async def main(path: str, mode: str, shots: str | None) -> int:
    url = Path(path).resolve().as_uri()
    phone = mode == "phone"
    vp = {"width": 390, "height": 844} if phone else {"width": 1280, "height": 720}
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        ctx = await browser.new_context(viewport=vp, is_mobile=phone, has_touch=phone)
        pg = await ctx.new_page()
        errs: list[str] = []
        pg.on("pageerror", lambda e: errs.append(str(e)))
        await pg.goto(url)
        await pg.evaluate("localStorage.clear()")
        await pg.reload()
        await pg.wait_for_timeout(500)
        await pg.click("#tPlay")
        await pg.wait_for_timeout(1000)

        problems = []
        n = await pg.evaluate("COURSE.chapters.length")
        for ci in range(n):
            await pg.click(f".mode[data-ci='{ci}']")
            await pg.wait_for_timeout(900)
            ns = await pg.evaluate(f"COURSE.chapters[{ci}].stages.length")
            for si in range(ns):
                st = await pg.evaluate(f"COURSE.chapters[{ci}].stages[{si}]")
                await pg.evaluate(f"document.querySelectorAll('.sbtn')[{si}].click()")
                await pg.wait_for_timeout(400)
                if st.get("type") == "sorter":
                    for item in st["items"]:
                        await pg.click(f".pick[data-a='{item['a']}']")
                        await pg.wait_for_timeout(1650)
                fz, scrolly, right = await pg.evaluate(
                    "(()=>{const pb=document.getElementById('pb');"
                    "return [pb.style.getPropertyValue('--fz'),pb.classList.contains('scrolly'),"
                    "document.getElementById('panel').getBoundingClientRect().right]})()"
                )
                flag = ""
                if not phone and scrolly:
                    flag = "OVERFLOW"
                elif not phone and fz and float(fz) < 0.75:
                    flag = "crowded"
                if phone and right > vp["width"] + 1:
                    flag = "TOO WIDE"
                print(f"{ci}:{si}  fz={fz or '1':<5} {flag:<9} {st['t']}")
                if flag:
                    problems.append((ci, si, flag))
                if shots:
                    await pg.screenshot(path=f"{shots}/c{ci}_s{si}.png")
            await pg.keyboard.press("Escape")
            await pg.wait_for_timeout(900)

        await pg.click(".mode[data-boss]")
        await pg.wait_for_timeout(900)
        for a in await pg.evaluate("COURSE.boss.Q.map(q=>q.a)"):
            await pg.click(f".qopt[data-i='{a}']")
            await pg.wait_for_timeout(200)
            await pg.click("#qn")
            await pg.wait_for_timeout(200)
        await pg.wait_for_timeout(800)
        won = await pg.evaluate("JSON.parse(localStorage.getItem('sectrain:'+COURSE.id)).boss.pass")
        print(f"\nboss beaten: {won} | problems: {problems or 'none'} | page errors: {errs or 'none'}")
        await browser.close()
        return 0 if (won and not errs and not [p for p in problems if p[2] != 'crowded']) else 1


if __name__ == "__main__":
    args = sys.argv[1:]
    shots = None
    if "--shots" in args:
        i = args.index("--shots")
        shots = args[i + 1]
        del args[i:i + 2]
        Path(shots).mkdir(parents=True, exist_ok=True)
    sys.exit(asyncio.run(main(args[0], args[1] if len(args) > 1 else "desktop", shots)))
