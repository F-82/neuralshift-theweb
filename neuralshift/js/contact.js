// Contact form button — the form is static (no backend). Clicking the button
// gives short-lived "Sent" feedback so the page feels responsive.

(function () {
  function init() {
    var btn = document.getElementById('contactSendBtn');
    if (!btn) return;

    var originalText = btn.textContent;

    btn.addEventListener('click', function () {
      btn.textContent = 'Sent ✓';
      btn.classList.add('sent');
      setTimeout(function () {
        btn.textContent = originalText;
        btn.classList.remove('sent');
      }, 3000);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
