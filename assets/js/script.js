// Theme toggle (remembers choice), older-news toggle, footer year.
(function () {
  var root = document.documentElement;
  try {
    var saved = localStorage.getItem('theme');
    if (saved) root.setAttribute('data-theme', saved);
  } catch (e) {}

  var toggle = document.getElementById('theme-toggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var current = root.getAttribute('data-theme') ||
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      var next = current === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  }

  var older = document.querySelectorAll('.news li.older');
  var btn = document.getElementById('news-toggle');
  older.forEach(function (li) { li.hidden = true; });
  if (btn) {
    btn.addEventListener('click', function () {
      var show = older.length && older[0].hidden;
      older.forEach(function (li) { li.hidden = !show; });
      btn.textContent = show ? 'Hide older news' : 'Show older news';
    });
  }

  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
