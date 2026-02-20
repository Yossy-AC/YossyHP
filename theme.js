/* theme.js — ダークモード切り替え */
(function () {
  const KEY = 'theme';

  function saved() {
    return localStorage.getItem(KEY) || 'light';
  }

  function apply(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const btn = document.getElementById('theme-toggle');
    if (btn) btn.textContent = theme === 'dark' ? '☀️' : '🌙';
  }

  function toggle() {
    const next = saved() === 'dark' ? 'light' : 'dark';
    localStorage.setItem(KEY, next);
    apply(next);
  }

  // DOM 構築後にボタンを配線
  document.addEventListener('DOMContentLoaded', function () {
    apply(saved());
    const btn = document.getElementById('theme-toggle');
    if (btn) btn.addEventListener('click', toggle);
  });
})();
