(function () {
  var KEY = 'mj-lang';
  var path = location.pathname;
  var isCN = path.indexOf('/cn/') === 0 || path === '/cn';
  function counterpart() {
    if (isCN) { var p = path.slice(3); return p === '' ? '/' : p; }
    return '/cn' + path;
  }
  function pref() {
    try { var s = localStorage.getItem(KEY); if (s === 'cn' || s === 'tw') return s; } catch (e) {}
    var langs = navigator.languages || [navigator.language || ''];
    for (var i = 0; i < langs.length; i++) {
      var l = String(langs[i]).toLowerCase();
      if (l.indexOf('zh') !== 0) continue;
      if (l.indexOf('hans') > -1 || /zh-(cn|sg|my)/.test(l) || l === 'zh') return 'cn';
      if (l.indexOf('hant') > -1 || /zh-(tw|hk|mo)/.test(l)) return 'tw';
      return 'cn';
    }
    return null;
  }
  if (path.indexOf('404') === -1) {
    var p = pref();
    if (p && ((p === 'cn') !== isCN)) {
      location.replace(counterpart() + location.search + location.hash);
      return;
    }
  }
  document.addEventListener('DOMContentLoaded', function () {
    function mark(a) {
      a.addEventListener('click', function () {
        var href = a.getAttribute('href') || '';
        try { localStorage.setItem(KEY, (href.indexOf('/cn/') > -1 || href.indexOf('/cn') === 0) ? 'cn' : 'tw'); } catch (e) {}
      });
    }
    var links = document.querySelectorAll('.n-lang a');
    for (var i = 0; i < links.length; i++) mark(links[i]);
    if (!document.querySelector('.n-lang') && !document.querySelector('.mj-toggle')) {
      var pill = 'border-radius:999px;padding:2px 9px;';
      var d = document.createElement('div');
      d.className = 'mj-toggle';
      d.setAttribute('style', 'position:fixed;right:14px;bottom:14px;z-index:99;background:#fff;border:1px solid #d4d9e8;border-radius:999px;padding:5px 6px;font-size:13.5px;box-shadow:0 2px 10px rgba(20,30,80,.14)');
      var other = document.createElement('a');
      other.href = counterpart();
      other.textContent = isCN ? '繁' : '簡';
      other.setAttribute('style', 'color:#55555c;text-decoration:none;' + pill);
      var cur = document.createElement('span');
      cur.textContent = isCN ? '簡' : '繁';
      cur.setAttribute('style', 'background:#254ce0;color:#fff;font-weight:700;' + pill);
      if (isCN) { d.appendChild(other); d.appendChild(cur); } else { d.appendChild(cur); d.appendChild(other); }
      document.body.appendChild(d);
      mark(other);
    }
  });
})();
