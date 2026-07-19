(function () {
  var canvas = document.getElementById("metric-network-canvas");
  if (!canvas) return;
  var container = canvas.parentElement;
  var ctx = canvas.getContext("2d");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var W, H;

  // A live particle network: points drifting through a metric space,
  // connected by faint lines whenever two happen to sit within reach of
  // each other. Purely continuous — no growth/fade cycle, no reset, just
  // an ever-reconfiguring web as the points move.
  var LINK_DIST = 130;
  var NODE_COLOR = "rgba(233, 236, 243, 0.6)";
  var LINK_COLOR = "77, 210, 255";

  var nodes = [];

  function seedNodes() {
    nodes = [];
    var n = Math.max(36, Math.floor((W * H) / 11000));
    for (var i = 0; i < n; i++) {
      nodes.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.16,
        vy: (Math.random() - 0.5) * 0.16,
        r: 1 + Math.random() * 2.2,
        phase: Math.random() * Math.PI * 2
      });
    }
  }

  function resize() {
    W = container.clientWidth;
    H = container.clientHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = W + "px";
    canvas.style.height = H + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    seedNodes();
  }

  function step() {
    nodes.forEach(function (n) {
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > W) n.vx *= -1;
      if (n.y < 0 || n.y > H) n.vy *= -1;
    });
  }

  function draw(now) {
    ctx.clearRect(0, 0, W, H);

    for (var i = 0; i < nodes.length; i++) {
      for (var j = i + 1; j < nodes.length; j++) {
        var a = nodes[i], b = nodes[j];
        var dx = a.x - b.x, dy = a.y - b.y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist >= LINK_DIST) continue;
        var t = 1 - dist / LINK_DIST;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = "rgba(" + LINK_COLOR + ", " + (0.05 + 0.22 * t * t) + ")";
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }

    nodes.forEach(function (n) {
      var twinkle = 0.75 + 0.25 * Math.sin(now / 1600 + n.phase);
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = NODE_COLOR;
      ctx.globalAlpha = twinkle;
      ctx.fill();
      ctx.globalAlpha = 1;
    });
  }

  function loop(ts) {
    step();
    draw(ts || performance.now());
    if (!reduceMotion) requestAnimationFrame(loop);
  }

  window.addEventListener("resize", resize);
  resize();

  if (!reduceMotion) {
    requestAnimationFrame(loop);
  } else {
    draw(0);
  }
})();
