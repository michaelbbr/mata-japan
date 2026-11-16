/* Language editions: Traditional (root), Simplified (/cn/), Japanese (/jp/).
   NO auto-redirect (removed 2026-11-15): the URL decides the language, period.
   The header toggle / floating pill are plain links to the same page in the
   other editions. Nothing is stored, nothing bounces. */
(function () {
  var path = location.pathname;
  var cur = 'tw', base = path;
  if (path.indexOf('/cn/') === 0 || path === '/cn') { cur = 'cn'; base = path.slice(3) || '/'; }
  else if (path.indexOf('/jp/') === 0 || path === '/jp') { cur = 'jp'; base = path.slice(3) || '/'; }
  function counterpart(lang) {
    if (lang === 'cn') return '/cn' + base;
    if (lang === 'jp') return '/jp' + base;
    return base;
  }
  function injectToggle() {
    if (document.querySelector('.n-lang') || document.querySelector('.lang-switch') || document.querySelector('.mj-toggle')) return;
    var bar = document.createElement('div');
    bar.className = 'mj-toggle';
    bar.setAttribute('role', 'navigation');
    bar.setAttribute('aria-label', '語言版本');
    var labels = { tw: '繁', cn: '簡', jp: '日' };
    ['tw', 'cn', 'jp'].forEach(function (lang) {
      if (lang === cur) {
        var s = document.createElement('span');
        s.className = 'on'; s.textContent = labels[lang];
        bar.appendChild(s);
      } else {
        var a = document.createElement('a');
        a.href = counterpart(lang); a.textContent = labels[lang];
        bar.appendChild(a);
      }
    });
    var style = document.createElement('style');
    style.textContent = '.mj-toggle{position:fixed;right:14px;bottom:14px;z-index:60;display:flex;gap:2px;background:#fff;border:1px solid #d9dee8;border-radius:999px;padding:3px;box-shadow:0 6px 20px rgba(16,24,40,.14);font:600 13px/1 -apple-system,"Segoe UI","Noto Sans TC","Noto Sans JP",sans-serif}.mj-toggle a,.mj-toggle span{padding:7px 12px;border-radius:999px;color:#3c475c;text-decoration:none}.mj-toggle span.on{background:#1f3cff;color:#fff}';
    document.head.appendChild(style);
    document.body.appendChild(bar);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', injectToggle);
  else injectToggle();
})();
