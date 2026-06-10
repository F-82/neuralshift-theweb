// Fade-in on scroll. Each .fi element becomes .visible the first time it crosses
// the viewport threshold, then the observer stops watching it.

(function () {
  function init() {
    if (!('IntersectionObserver' in window)) {
      // Fallback: just reveal everything.
      var all = document.querySelectorAll('.fi');
      for (var i = 0; i < all.length; i++) all[i].classList.add('visible');
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -32px 0px' });

    var els = document.querySelectorAll('.fi');
    for (var i = 0; i < els.length; i++) io.observe(els[i]);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
