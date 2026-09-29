// Click-to-copy for any ".copy-email" button. The address is split across
// data-u/data-d (user/domain) so it never appears as a plain string in the
// page source, then reassembled here at click time.
(function () {
  var buttons = document.querySelectorAll('.copy-email');
  if (!buttons.length) return;

  buttons.forEach(function (button) {
    button.addEventListener('click', async function () {
      var text = button.dataset.u + '@' + button.dataset.d;
      var toast = button.querySelector('.copy-toast');
      try {
        await navigator.clipboard.writeText(text);
      } catch (err) {
        var ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      if (toast) {
        toast.classList.add('show');
        setTimeout(function () { toast.classList.remove('show'); }, 1300);
      }
    });
  });
})();
