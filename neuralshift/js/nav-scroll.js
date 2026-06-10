// Adds .scrolled to the top nav once the page has scrolled past a small threshold.
// Listens passively so it does not interfere with scroll performance.

(function () {
  var SCROLL_THRESHOLD = 30;

  function onScroll() {
    var nav = document.getElementById('mainNav');
    if (!nav) return;
    nav.classList.toggle('scrolled', window.scrollY > SCROLL_THRESHOLD);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  // Run once on load in case the page is restored mid-scroll.
  if (document.readyState === 'complete') {
    onScroll();
  } else {
    window.addEventListener('load', onScroll);
  }
})();
