(function () {
  var track = document.querySelector(".ticker-track");
  if (!track) return;
  var speed = window.SITE_SCROLL_SPEED || 34;
  var halfWidth = track.scrollWidth / 2;
  var durationSec = halfWidth / speed;
  track.style.animationDuration = durationSec + "s";
})();
