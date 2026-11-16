(function () {
  var KEY = 'mj-lang';
  var path = location.pathname;
  var cur = path.indexOf('/cn/') === 0 || path === '/cn' ? 'cn'
          : path.indexOf('/jp/') === 0 || path === '/jp' ? 'jp' : 'tw';
  var PRE = { tw: '', cn: '/cn', jp: '/jp' };
  function base() {
    if (cur === 'tw') return path;
    var p = path.slice(3);
    return p === '' ? '/' : p;
  }
  function counterpart(target) { return PRE[target] + base(); }
  function pref() {
    try { var s = localStorage.getItem(KEY); if (s === 'tw' || s === 'cn' || s === 'jp') return s; } catch (e) {}
    var langs = navigator.languages || [navigator.language || ''];
    for (var i = 0; i < langs.length; i++) {
      var l = String(langs[i]).toLowerCase();
      if (l.indexOf('ja') === 0) return 'jp';
      if (l.indexOf('zh') !== 0) continue;
      if (l.indexOf('hant') > -1 || /zh-(tw|hk|mo)/.test(l)) return 'tw';
      if (l.indexOf('hans') > -1 || /zh-(cn|sg|my)/.test(l) || l === 'zh') return 'cn';
      return 'cn';
    }
    return null;
  }
  if (path.indexOf('404') === -1) {
    var p = pref();
    if (p && p !== cur) {
      location.replace(counterpart(p) + location.search + location.hash);
      return;
    }
  }
  document.addEventListener('DOMContentLoaded', function () {
    function targetOf(href) {
      if (href.indexOf('/cn/') > -1 || /\/cn\/?($|#)/.test(href)) return 'cn';
      if (href.indexOf('/jp/') > -1 || /\/jp\/?($|#)/.test(href)) return 'jp';
      return 'tw';
    }
    function mark(a) {
      a.addEventListener('click', function () {
        try { localStorage.setItem(KEY, targetOf(a.getAttribute('href') || '')); } catch (e) {}
      });
    }
    var links = document.querySelectorAll('.n-lang a');
    for (var i = 0; i < links.length; i++) mark(links[i]);
    if (!document.querySelector('.n-lang') && !document.querySelector('.mj-toggle')) {
      var NAMES = { tw: '繁', cn: '簡', jp: '日' };
      var ORDER = ['tw', 'cn', 'jp'];
      var pill = 'border-radius:999px;padding:2px 9px;';
      var d = document.createElement('div');
      d.className = 'mj-toggle';
      d.setAttribute('style', 'position:fixed;right:14px;bottom:14px;z-index:99;background:#fff;border:1px solid #d4d9e8;border-radius:999px;padding:5px 6px;font-size:13.5px;box-shadow:0 2px 10px rgba(20,30,80,.14)');
      ORDER.forEach(function (t) {
        if (t === cur) {
          var s = document.createElement('span');
          s.textContent = NAMES[t];
          s.setAttribute('style', 'background:#254ce0;color:#fff;font-weight:700;' + pill);
          d.appendChild(s);
        } else {
          var a = document.createElement('a');
          a.href = counterpart(t);
          a.textContent = NAMES[t];
          a.setAttribute('style', 'color:#55555c;text-decoration:none;' + pill);
          d.appendChild(a);
          mark(a);
        }
      });
      document.body.appendChild(d);
    }
  });
})();
