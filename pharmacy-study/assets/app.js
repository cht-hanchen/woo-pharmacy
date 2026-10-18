/* 藥學常識 — renders the hub (index.html) and every subject page from window.SUBJECT data. */
(function () {
  'use strict';

  var SUBJECTS = [
    { id: 'pharmacology', code: 'Rx-01', seal: '理', title: '藥理學', en: 'Pharmacology', h: 168,
      blurb: '藥物如何作用於人體：受體、劑量反應、自律神經藥物到抗生素。' },
    { id: 'pharmaceutical-analysis', code: 'Rx-02', seal: '析', title: '藥物分析', en: 'Pharmaceutical Analysis', h: 212,
      blurb: '怎麼證明藥是真的、夠純、含量對：滴定、光譜、層析與確效。' },
    { id: 'chinese-medicine', code: 'Rx-03', seal: '草', title: '中藥學', en: 'Chinese Materia Medica', h: 12,
      blurb: '四氣五味、歸經、十八反十九畏，以及常用中藥的功效分類。' },
    { id: 'dosage-forms', code: 'Rx-04', seal: '劑', title: '藥物劑型學', en: 'Pharmaceutics & Dosage Forms', h: 36,
      blurb: '錠劑、膠囊、注射劑、乳劑……藥為什麼要做成這個樣子。' },
    { id: 'medicinal-chemistry', code: 'Rx-05', seal: '構', title: '藥物化學、結構化學', en: 'Medicinal Chemistry', h: 262,
      blurb: '結構決定活性：官能基、構效關係（SAR）、代謝與藥物設計。' },
    { id: 'pharmacognosy', code: 'Rx-06', seal: '生', title: '生藥學', en: 'Pharmacognosy', h: 104,
      blurb: '來自植物、動物與微生物的天然藥物：生物鹼、配醣體、萜類。' },
    { id: 'biopharmaceutics', code: 'Rx-07', seal: '動', title: '生物藥劑學', en: 'Biopharmaceutics & Pharmacokinetics', h: 326,
      blurb: 'ADME 與藥動學計算：半衰期、清除率、生體可用率與給藥設計。' }
  ];

  var KEY = 'pharm-study:';
  var store = {
    get: function (k) { try { return JSON.parse(localStorage.getItem(KEY + k)); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(KEY + k, JSON.stringify(v)); } catch (e) {} }
  };

  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  var LETTERS = 'ABCDE';

  /* theme toggle: cycles auto → light → dark */
  function initTheme() {
    var saved = store.get('theme');
    if (saved === 'light' || saved === 'dark') document.documentElement.dataset.theme = saved;
    var btn = $('.theme-btn');
    if (!btn) return;
    function label() {
      var t = document.documentElement.dataset.theme;
      btn.textContent = t === 'dark' ? '☾' : t === 'light' ? '☀' : '◐';
      btn.title = '主題：' + (t === 'dark' ? '深色' : t === 'light' ? '淺色' : '跟隨系統');
    }
    btn.addEventListener('click', function () {
      var t = document.documentElement.dataset.theme;
      var next = !t ? 'light' : t === 'light' ? 'dark' : '';
      if (next) document.documentElement.dataset.theme = next; else delete document.documentElement.dataset.theme;
      store.set('theme', next || null);
      label();
    });
    label();
  }

  /* ---------- hub ---------- */
  function renderHub(root) {
    var scores = SUBJECTS.map(function (s) { return store.get('best:' + s.id); });
    var done = scores.filter(function (x) { return x; });
    var avg = done.length ? Math.round(done.reduce(function (a, b) { return a + b.pct; }, 0) / done.length) : 0;

    root.innerHTML =
      '<header class="bar"><div class="wrap"><a class="home" href="index.html">✚ 藥學常識</a>' +
      '<nav></nav><button class="theme-btn" type="button" aria-label="切換主題"></button></div></header>' +
      '<main class="wrap">' +
      '<div class="hub-hero"><div class="en">PHARMACY ESSENTIALS · 7 SUBJECTS</div>' +
      '<h1>藥學常識</h1>' +
      '<p>七個科目，每科一瓶。打開標籤先讀導論與核心觀念，用口訣記重點、翻閃卡複習，最後做測驗檢查自己記住了多少。</p>' +
      '<div class="overall"><span class="pill">已測驗 <b>' + done.length + '</b> / ' + SUBJECTS.length + ' 科</span>' +
      '<span class="pill">平均最佳成績 <b>' + (done.length ? avg + '%' : '—') + '</b></span></div>' +
      '<ol class="steps"><li>讀導論，看懂這科在問什麼</li><li>核心觀念逐張讀完</li><li>口訣幫你記住易混淆的點</li><li>閃卡翻面自我檢查</li><li>測驗＋詳解，錯題再練</li></ol>' +
      '</div>' +
      '<div class="shelf">' + SUBJECTS.map(function (s, i) {
        var b = scores[i];
        return '<a class="bottle" style="--h:' + s.h + '" href="subjects/' + s.id + '.html">' +
          '<div class="top"><span>' + s.code + '</span><span>' + (b ? '最佳 ' + b.pct + '%' : '尚未測驗') + '</span></div>' +
          '<div class="mid"><div class="seal">' + s.seal + '</div><div><h2>' + s.title + '</h2><div class="en">' + s.en + '</div></div></div>' +
          '<p>' + s.blurb + '</p>' +
          '<div class="meter"><span class="track"><i style="width:' + (b ? b.pct : 0) + '%"></i></span><span>' + (b ? b.score + '/' + b.total : '0%') + '</span></div>' +
          '</a>';
      }).join('') + '</div>' +
      '</main><footer class="wrap">內容供學習複習用，臨床用藥請以最新仿單、指引與專業人員判斷為準。</footer>';
  }

  /* ---------- subject ---------- */
  function renderSubject(root, S) {
    var idx = SUBJECTS.findIndex(function (s) { return s.id === S.id; });
    var meta = SUBJECTS[idx] || {};
    document.documentElement.style.setProperty('--h', meta.h || 160);
    var prev = SUBJECTS[(idx - 1 + SUBJECTS.length) % SUBJECTS.length];
    var next = SUBJECTS[(idx + 1) % SUBJECTS.length];
    var best = store.get('best:' + S.id);

    var nav = [['intro', '導論'], ['core', '核心觀念'], ['mnemonic', '口訣'], ['flash', '閃卡'], ['quiz', '測驗']]
      .filter(function (n) { return n[0] !== 'mnemonic' || (S.mnemonics && S.mnemonics.length); })
      .filter(function (n) { return n[0] !== 'flash' || (S.flashcards && S.flashcards.length); });

    var html = '';
    html += '<header class="bar"><div class="wrap"><a class="home" href="../index.html">← 藥學常識</a><nav>' +
      nav.map(function (n) { return '<a href="#' + n[0] + '">' + n[1] + '</a>'; }).join('') +
      '</nav><button class="theme-btn" type="button" aria-label="切換主題"></button></div></header>';

    html += '<main class="wrap">';
    // label hero
    html += '<div class="hero"><div class="label">' +
      '<div class="label-top"><span>' + meta.code + ' · 藥學常識</span><span>' + (best ? '最佳成績 ' + best.pct + '%' : '新開封') + '</span></div>' +
      '<div class="label-main"><div class="seal">' + meta.seal + '</div><div><h1>' + S.title + '</h1><div class="en">' + (S.en || meta.en) + '</div></div></div>' +
      '<p class="tagline">' + S.tagline + '</p>' +
      '<div class="dose"><span>成分：<b>' + S.sections.length + '</b> 個核心觀念</span><span>閃卡 <b>' + (S.flashcards || []).length + '</b> 張</span><span>測驗 <b>' + S.quiz.length + '</b> 題</span></div>' +
      '</div>';
    if (S.hook) {
      html += '<div class="hook"><div class="k">你知道嗎？</div><p>' + S.hook.q + '</p>' +
        '<div class="ans" hidden>' + S.hook.a + '</div><button class="btn" type="button" data-hook>揭曉答案</button></div>';
    }
    html += '</div>';

    // intro
    html += '<section class="block" id="intro"><div class="eyebrow">01 · Introduction</div><h2>導論</h2>' +
      '<div class="lead">' + S.intro.lead + '</div>' +
      (S.intro.why && S.intro.why.length ? '<ul class="why">' + S.intro.why.map(function (w) { return '<li>' + w + '</li>'; }).join('') + '</ul>' : '') +
      '<div class="map">' + S.sections.map(function (s, i) { return '<a href="#core-' + (i + 1) + '">' + (i + 1) + '. ' + s.title + '</a>'; }).join('') + '</div>' +
      '</section>';

    // core
    html += '<section class="block" id="core"><div class="eyebrow">02 · Key Concepts</div><h2>核心觀念</h2>' +
      S.sections.map(function (s, i) {
        var t = s.table;
        return '<article class="card" id="core-' + (i + 1) + '"><div class="num">' + String(i + 1).padStart(2, '0') + ' / ' + String(S.sections.length).padStart(2, '0') + '</div>' +
          '<h3>' + s.title + '</h3>' + (s.body ? '<p>' + s.body + '</p>' : '') +
          (s.points && s.points.length ? '<ul>' + s.points.map(function (p) { return '<li>' + p + '</li>'; }).join('') + '</ul>' : '') +
          (t ? '<div class="tbl"><table>' + (t.caption ? '<caption>' + t.caption + '</caption>' : '') +
            '<thead><tr>' + t.head.map(function (c) { return '<th>' + c + '</th>'; }).join('') + '</tr></thead><tbody>' +
            t.rows.map(function (r) { return '<tr>' + r.map(function (c) { return '<td>' + c + '</td>'; }).join('') + '</tr>'; }).join('') +
            '</tbody></table></div>' : '') +
          (s.clinical ? '<div class="clinical">' + s.clinical + '</div>' : '') +
          '</article>';
      }).join('') + '</section>';

    // mnemonics
    if (S.mnemonics && S.mnemonics.length) {
      html += '<section class="block" id="mnemonic"><div class="eyebrow">03 · Memory Aids</div><h2>記憶口訣</h2><div class="mn-grid">' +
        S.mnemonics.map(function (m) { return '<div class="mn"><h3>' + m.title + '</h3><p>' + m.text + '</p></div>'; }).join('') +
        '</div></section>';
    }

    // flashcards
    if (S.flashcards && S.flashcards.length) {
      html += '<section class="block" id="flash"><div class="eyebrow">04 · Flashcards</div><h2>閃卡複習</h2>' +
        '<div class="flash-shell"><button class="flash" type="button" aria-live="polite"><div class="flash-in">' +
        '<div class="face front"><span class="tag">問 · 點擊翻面</span><div class="front-t"></div></div>' +
        '<div class="face back"><span class="tag">答</span><div class="back-t"></div></div></div></button>' +
        '<div class="flash-ctrl"><button class="btn" type="button" data-f="prev">← 上一張</button><span class="count"></span>' +
        '<span><button class="btn" type="button" data-f="shuffle">洗牌</button> <button class="btn primary" type="button" data-f="next">下一張 →</button></span></div>' +
        '<div class="hint">鍵盤：空白鍵翻面，← → 換卡</div></div></section>';
    }

    // quiz
    html += '<section class="block" id="quiz"><div class="eyebrow">05 · Q&amp;A</div><h2>測驗與詳解</h2><div class="quiz" id="quiz-box"></div></section>';

    html += '<nav class="pager"><a class="prev" href="' + prev.id + '.html"><small>← ' + prev.code + '</small>' + prev.title + '</a>' +
      '<a class="next" href="' + next.id + '.html"><small>' + next.code + ' →</small>' + next.title + '</a></nav>';
    html += '</main><footer class="wrap">內容供學習複習用，臨床用藥請以最新仿單、指引與專業人員判斷為準。</footer>';

    root.innerHTML = html;
    document.title = S.title + '｜藥學常識';

    var hookBtn = $('[data-hook]');
    if (hookBtn) hookBtn.addEventListener('click', function () {
      var a = $('.hook .ans'); a.hidden = !a.hidden; hookBtn.textContent = a.hidden ? '揭曉答案' : '收起';
    });

    if (S.flashcards && S.flashcards.length) initFlash(S.flashcards);
    initQuiz(S);
    initNavSpy();
  }

  function initFlash(cards) {
    var order = cards.map(function (_, i) { return i; }), i = 0;
    var card = $('.flash'), front = $('.front-t'), back = $('.back-t'), count = $('.flash-ctrl .count');
    function show() {
      card.classList.remove('flipped');
      var c = cards[order[i]];
      front.innerHTML = c.front; back.innerHTML = c.back;
      count.textContent = (i + 1) + ' / ' + cards.length;
    }
    function go(d) { i = (i + d + cards.length) % cards.length; show(); }
    card.addEventListener('click', function () { card.classList.toggle('flipped'); });
    $('[data-f=prev]').addEventListener('click', function () { go(-1); });
    $('[data-f=next]').addEventListener('click', function () { go(1); });
    $('[data-f=shuffle]').addEventListener('click', function () { order = shuffle(order); i = 0; show(); });
    document.addEventListener('keydown', function (e) {
      if (/INPUT|TEXTAREA/.test(e.target.tagName)) return;
      var r = card.getBoundingClientRect();
      if (r.bottom < 0 || r.top > innerHeight) return; // only when the card is on screen
      if (e.key === 'ArrowRight') go(1);
      else if (e.key === 'ArrowLeft') go(-1);
      else if (e.key === ' ' && e.target === document.body) { e.preventDefault(); card.classList.toggle('flipped'); }
    });
    show();
  }

  function initQuiz(S) {
    var box = $('#quiz-box'), Q = S.quiz;
    var order, pos, score, wrong, locked;

    function start(only) {
      order = shuffle(only || Q.map(function (_, i) { return i; }));
      pos = 0; score = 0; wrong = []; locked = false;
      renderQ();
    }

    function renderQ() {
      var q = Q[order[pos]];
      locked = false;
      box.innerHTML =
        '<div class="qhead"><span>第 ' + (pos + 1) + ' / ' + order.length + ' 題</span><span>答對 ' + score + '</span></div>' +
        '<div class="prog"><i style="width:' + (pos / order.length * 100) + '%"></i></div>' +
        '<p class="qtext">' + q.q + '</p><div class="opts">' +
        q.options.map(function (o, i) { return '<button class="opt" type="button" data-i="' + i + '"><span class="l">' + LETTERS[i] + '</span><span>' + o + '</span></button>'; }).join('') +
        '</div><div class="slot"></div>';
      $$('.opt', box).forEach(function (b) { b.addEventListener('click', function () { pick(+b.dataset.i); }); });
    }

    function pick(i) {
      if (locked) return;
      locked = true;
      var q = Q[order[pos]], ok = i === q.answer;
      if (ok) score++; else wrong.push(order[pos]);
      $$('.opt', box).forEach(function (b, j) {
        b.disabled = true;
        if (j === q.answer) b.classList.add('right');
        else if (j === i) b.classList.add('wrong');
      });
      var last = pos === order.length - 1;
      $('.slot', box).innerHTML =
        '<div class="explain"><div class="verdict ' + (ok ? 'ok">✓ 答對了' : 'no">✗ 正確答案是 ' + LETTERS[q.answer]) + '</div>' + q.explain + '</div>' +
        '<div class="qfoot"><button class="btn primary" type="button" data-next>' + (last ? '看結果' : '下一題 →') + '</button></div>';
      $('.qhead span:last-child', box).textContent = '答對 ' + score;
      var nb = $('[data-next]', box);
      nb.addEventListener('click', function () { if (last) finish(); else { pos++; renderQ(); box.scrollIntoView({ block: 'start' }); } });
      nb.focus({ preventScroll: true });
    }

    function finish() {
      var total = order.length, pct = Math.round(score / total * 100);
      var fullRun = total === Q.length;
      var best = store.get('best:' + S.id);
      var isNew = fullRun && (!best || pct > best.pct);
      if (isNew) store.set('best:' + S.id, { score: score, total: total, pct: pct, at: Date.now() });
      var msg = pct === 100 ? '滿分！這科你已經可以教別人了。' : pct >= 80 ? '很穩，剩下幾題看詳解補起來。' : pct >= 60 ? '及格了，錯題再練一輪會更扎實。' : '先回頭讀核心觀念，再來挑戰一次。';
      box.innerHTML = '<div class="result"><div class="ring" style="--p:' + pct + '"><span>' + pct + '%</span></div>' +
        '<p class="msg">' + msg + '</p><p class="sub">答對 ' + score + ' / ' + total + ' 題' +
        (fullRun ? (isNew ? '・新的最佳成績已記錄' : best ? '・最佳成績 ' + best.pct + '%' : '') : '・錯題練習不列入最佳成績') + '</p>' +
        '<div class="actions"><button class="btn primary" type="button" data-again>重新測驗（題目洗牌）</button>' +
        (wrong.length ? '<button class="btn" type="button" data-wrong>只練錯的 ' + wrong.length + ' 題</button>' : '') + '</div>' +
        (wrong.length ? '<div class="review"><h3>錯題回顧</h3>' + wrong.map(function (k) {
          var q = Q[k];
          return '<div class="item"><div class="q">' + q.q + '</div><div class="a">正解：' + LETTERS[q.answer] + '. ' + q.options[q.answer] + '</div><div>' + q.explain + '</div></div>';
        }).join('') + '</div>' : '') + '</div>';
      $('[data-again]', box).addEventListener('click', function () { start(); });
      var w = wrong.slice();
      var wb = $('[data-wrong]', box);
      if (wb) wb.addEventListener('click', function () { start(w); });
      var tag = $('.label-top span:last-child');
      var nb2 = store.get('best:' + S.id);
      if (tag && nb2) tag.textContent = '最佳成績 ' + nb2.pct + '%';
    }

    document.addEventListener('keydown', function (e) {
      var r = box.getBoundingClientRect();
      if (r.bottom < 0 || r.top > innerHeight) return;
      var k = e.key.toUpperCase(), n = '1234'.indexOf(k), l = 'ABCD'.indexOf(k);
      var i = n >= 0 ? n : l;
      if (i >= 0 && !locked && $('.opt', box)) { var q = Q[order[pos]]; if (i < q.options.length) pick(i); }
    });

    start();
  }

  function initNavSpy() {
    var links = $$('.bar nav a');
    if (!('IntersectionObserver' in window) || !links.length) return;
    var map = {};
    links.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) {
          links.forEach(function (a) { a.classList.remove('on'); });
          var a = map[e.target.id]; if (a) { a.classList.add('on'); a.scrollIntoView({ block: 'nearest', inline: 'nearest' }); }
        }
      });
    }, { rootMargin: '-30% 0px -60% 0px' });
    Object.keys(map).forEach(function (id) { var el = document.getElementById(id); if (el) io.observe(el); });
  }

  document.addEventListener('DOMContentLoaded', function () {
    var root = document.getElementById('app');
    if (window.SUBJECT) renderSubject(root, window.SUBJECT); else renderHub(root);
    initTheme();
  });
})();
