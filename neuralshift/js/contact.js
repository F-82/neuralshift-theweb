// Contact form handler. There is no backend: on submit we build a pre-filled
// WhatsApp deep-link from the field values and open it, so the enquiry lands in
// the same WhatsApp inbox the rest of the site points to. Nothing is stored.

(function () {
  var WA_NUMBER = '94762874856';

  function init() {
    var form = document.getElementById('contactForm');
    if (!form) return;

    var btn = document.getElementById('contactSendBtn');
    var originalText = btn ? btn.textContent : '';

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Native `required` validation still runs before submit fires; guard anyway.
      if (typeof form.reportValidity === 'function' && !form.reportValidity()) return;

      var name = (form.elements.name.value || '').trim();
      var business = (form.elements.business.value || '').trim();
      var industry = (form.elements.industry.value || '').trim();
      var phone = (form.elements.phone.value || '').trim();
      var message = (form.elements.message.value || '').trim();

      // Build a readable summary; only include the parts the visitor filled in.
      var who = name + (business ? ' (' + business + ')' : '');
      var text = 'New enquiry from ' + who + ': ' + message;
      if (industry) text += '\nIndustry: ' + industry;
      if (phone) text += '\nWhatsApp: ' + phone;

      var url = 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(text);
      // Navigate the current tab rather than window.open: a popup can be blocked
      // (in-app browsers, popup blockers) and 'noopener' makes the failure
      // undetectable, so same-tab navigation is the only reliable open.
      window.location.href = url;

      // Keep the existing success-state feedback as a confirmation.
      if (btn) {
        btn.textContent = 'Opening WhatsApp…';
        btn.classList.add('sent');
        setTimeout(function () {
          btn.textContent = originalText;
          btn.classList.remove('sent');
        }, 3000);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
