(function () {
  var note = document.getElementById("sent-note");
  if (!note) return;
  if (window.location.search.indexOf("sent=1") !== -1) {
    note.classList.add("visible");
    var form = document.querySelector(".contact-form");
    if (form) form.style.display = "none";
  }
})();
