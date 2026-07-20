// Click-to-copy for any ".copy-email" button (data-copy holds the address),
// with a small toast in its ".copy-toast" child confirming the copy.
(function () {
  var buttons = document.querySelectorAll('.copy-email');
  if (!buttons.length) return;

  buttons.forEach(function (button) {
    button.addEventListener('click', async function () {
      var text = button.dataset.copy;
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
