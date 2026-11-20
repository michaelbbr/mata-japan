/* Language editions (2026-11-18, Yu 定案): Traditional Chinese is the only
   source edition; every other language is a full machine-translated mirror.
   - Dropdown switcher with native language names; switching keeps the same
     page (same slug) and the manual choice is remembered (localStorage).
   - Browser-language default applies ONLY on the root homepage: a stored
     manual choice wins, otherwise the first matching navigator language.
     Explicit language URLs are never redirected away from. */
(function () {
  var LANGS = [
    { code: 'tw', prefix: '', label: '繁體中文' },
    { code: 'cn', prefix: '/cn', label: '简体中文' },
    { code: 'jp', prefix: '/jp', label: '日本語' },
    { code: 'en', prefix: '/en', label: 'English' }
    /* 2026-11-19: vi/th/ko/pt-br removed (Yu decision, zero traffic). */
  ];
  var path = location.pathname;
  var cur = 'tw', base = path;
  var sorted = LANGS.slice(1).sort(function (a, b) { return b.prefix.length - a.prefix.length; });
  for (var i = 0; i < sorted.length; i++) {
    var p = sorted[i].prefix;
    if (path === p || path.indexOf(p + '/') === 0) { cur = sorted[i].code; base = path.slice(p.length) || '/'; break; }
  }
  function byCode(code) {
    for (var i = 0; i < LANGS.length; i++) if (LANGS[i].code === code) return LANGS[i];
    return LANGS[0];
  }
  function counterpart(code) { return byCode(code).prefix + base; }

  /* --- Browser-language default: root homepage only --- */
  var isRootHome = cur === 'tw' && (path === '/' || path === '/index.html');
  if (isRootHome) {
    var target = null;
    var saved = null;
    try { saved = localStorage.getItem('mata-lang'); } catch (e) {}
    if (saved && saved !== 'tw' && byCode(saved).code === saved) {
      target = saved;
    } else if (!saved) {
      var navs = navigator.languages || [navigator.language || ''];
      for (var n = 0; n < navs.length && !target; n++) {
        var L = (navs[n] || '').toLowerCase();
        if (L.indexOf('zh-tw') === 0 || L.indexOf('zh-hk') === 0 || L.indexOf('zh-mo') === 0 || L.indexOf('zh-hant') === 0) target = 'tw';
        else if (L.indexOf('zh-cn') === 0 || L.indexOf('zh-sg') === 0 || L.indexOf('zh-hans') === 0) target = 'cn';
        else if (L === 'zh') target = 'tw';
        else if (L.indexOf('ja') === 0) target = 'jp';
        else if (L.indexOf('en') === 0) target = 'en';
      }
    }
    if (target && target !== 'tw') {
      location.replace(byCode(target).prefix + '/');
      return;
    }
  }

  /* --- Dropdown switcher --- */
  function buildSelect() {
    var sel = document.createElement('select');
    sel.className = 'mj-langsel';
    sel.setAttribute('aria-label', 'Language');
    LANGS.forEach(function (l) {
      var o = document.createElement('option');
      o.value = l.code; o.textContent = l.label;
      if (l.code === cur) o.selected = true;
      sel.appendChild(o);
    });
    sel.addEventListener('change', function () {
      try { localStorage.setItem('mata-lang', sel.value); } catch (e) {}
      location.href = counterpart(sel.value);
    });
    return sel;
  }
  function inject() {
    if (document.querySelector('.mj-langsel')) return;
    var style = document.createElement('style');
    style.textContent =
      '.mj-langsel{font:600 13px/1.4 -apple-system,"Segoe UI","Noto Sans TC","Noto Sans JP",sans-serif;color:#3c475c;background:#fff;border:1px solid #d9dee8;border-radius:999px;padding:7px 10px;cursor:pointer;max-width:180px}' +
      '.mj-langwrap{position:fixed;right:14px;bottom:14px;z-index:60;background:#fff;border-radius:999px;box-shadow:0 6px 20px rgba(16,24,40,.14);padding:3px}' +
      '.mj-langwrap .mj-langsel{border:none;box-shadow:none}' +
      '.n-lang .mj-langsel{padding:4px 8px}';
    document.head.appendChild(style);
    var headerBox = document.querySelector('.n-lang');
    if (headerBox) {
      headerBox.innerHTML = '';
      headerBox.appendChild(buildSelect());
    } else {
      var wrap = document.createElement('div');
      wrap.className = 'mj-langwrap';
      wrap.appendChild(buildSelect());
      document.body.appendChild(wrap);
    }
    var old = document.querySelector('.mj-toggle');
    if (old) old.remove();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', inject);
  else inject();
})();
