// Light/dark theme. Light is the default; html.dark is added when the user opts in.
// The initial class is applied by an inline blocking script in each page <head> to
// avoid a flash of the wrong theme — see the snippet near the top of every .html file.

(function (global) {
  var STORAGE_KEY = 'ns-theme';

  function applyStoredTheme() {
    try {
      if (localStorage.getItem(STORAGE_KEY) === 'dark') {
        document.documentElement.classList.add('dark');
      }
    } catch (e) {
      // localStorage may be unavailable (private mode, blocked storage). Fall through.
    }
  }

  function toggleTheme() {
    var isDark = document.documentElement.classList.toggle('dark');
    try {
      localStorage.setItem(STORAGE_KEY, isDark ? 'dark' : 'light');
    } catch (e) { /* ignore */ }
  }

  global.NSTheme = {
    apply: applyStoredTheme,
    toggle: toggleTheme
  };
})(window);
