// Builds mailto: hrefs and the formsubmit.co form action at runtime from
// data-u/data-d (+ optional data-subject), so the address doesn't sit as a
// plain string in the HTML source for scrapers to harvest.
(function () {
  document.querySelectorAll('a[data-u][data-d]').forEach(function (a) {
    var address = a.dataset.u + '@' + a.dataset.d;
    var href = 'mailto:' + address;
    if (a.dataset.subject) href += '?subject=' + a.dataset.subject;
    a.setAttribute('href', href);
    if (a.textContent.trim() === '') a.textContent = address;
  });

  document.querySelectorAll('form[data-u][data-d]').forEach(function (form) {
    form.setAttribute('action', 'https://formsubmit.co/' + form.dataset.u + '@' + form.dataset.d);
  });
})();
