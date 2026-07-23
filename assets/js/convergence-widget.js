(function () {
  // Several fixed source points around the edges, each occasionally sending
  // a pulse arcing in toward a central point — a loose metaphor for
  // inbound messages converging on one inbox, with no finance content.
  var canvas = document.getElementById("convergence-widget-canvas");
  if (!canvas) return;
  var container = canvas.parentElement;
  var ctx = canvas.getContext("2d");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var W, H, cx, cy;
  var SOURCE_COUNT = 7;
  var LINE_COLOR = "rgba(77, 210, 255, 0.14)";
  var PULSE_COLOR = "rgba(226, 230, 240, 0.95)";
  var HUB_COLOR = "rgba(233, 236, 243, 0.6)";

  var sources = [];
  var pulses = [];
  var lastTs = null;
  var spawnTimer = 0;
  var running = false;
  var visible = true;

  function resize() {
    W = container.clientWidth;
    H = container.clientHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = W + "px";
    canvas.style.height = H + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    cx = W * 0.5;
    cy = H * 0.52;
  }

  function buildSources() {
    sources = [];
    var rx = W * 0.42, ry = H * 0.4;
    for (var i = 0; i < SOURCE_COUNT; i++) {
      var a = (i / SOURCE_COUNT) * Math.PI * 2 + 0.3;
      sources.push({ x: cx + Math.cos(a) * rx, y: cy + Math.sin(a) * ry });
    }
  }

  function control(a) {
    var mx = (a.x + cx) / 2, my = (a.y + cy) / 2;
    var dx = cx - a.x, dy = cy - a.y;
    var bow = 0.22;
    return { x: mx - dy * bow, y: my + dx * bow };
  }

  function bezier(a, c, b, t) {
    var u = 1 - t;
    return {
      x: u * u * a.x + 2 * u * t * c.x + t * t * b.x,
      y: u * u * a.y + 2 * u * t * c.y + t * t * b.y
    };
  }

  function step(now) {
    var dt = lastTs == null ? 16 : Math.min(now - lastTs, 64);
    lastTs = now;

    spawnTimer -= dt;
    if (spawnTimer <= 0) {
      spawnTimer = 500 + Math.random() * 700;
      var src = sources[(Math.random() * sources.length) | 0];
      pulses.push({ from: src, t: 0 });
    }

    ctx.clearRect(0, 0, W, H);

    sources.forEach(function (s) {
      ctx.strokeStyle = LINE_COLOR;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(s.x, s.y);
      var c = control(s);
      ctx.quadraticCurveTo(c.x, c.y, cx, cy);
      ctx.stroke();

      ctx.fillStyle = HUB_COLOR;
      ctx.globalAlpha = 0.7;
      ctx.beginPath();
      ctx.arc(s.x, s.y, 2.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    });

    pulses.forEach(function (p) {
      p.t += dt / 900;
      var c = control(p.from);
      var pos = bezier(p.from, c, { x: cx, y: cy }, Math.min(p.t, 1));
      ctx.fillStyle = PULSE_COLOR;
      ctx.globalAlpha = Math.max(0, 1 - p.t);
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, 2.6, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
      if (p.t >= 1) p.dead = true;
    });
    pulses = pulses.filter(function (p) { return !p.dead; });

    ctx.fillStyle = HUB_COLOR;
    ctx.beginPath();
    ctx.arc(cx, cy, 4, 0, Math.PI * 2);
    ctx.fill();
  }

  function loop(ts) {
    if (!running) return;
    step(ts || performance.now());
    requestAnimationFrame(loop);
  }

  function start() {
    if (reduceMotion || running || !visible || document.hidden) return;
    running = true;
    lastTs = null;
    requestAnimationFrame(loop);
  }

  function stop() {
    running = false;
  }

  window.addEventListener("resize", function () {
    resize();
    buildSources();
  });
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) stop(); else start();
  });
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      visible = entries[entries.length - 1].isIntersecting;
      if (visible) start(); else stop();
    }).observe(canvas);
  }
  resize();
  buildSources();

  if (!reduceMotion) start();
  else step(performance.now());
})();
