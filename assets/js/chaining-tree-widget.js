(function () {
  // Visual metaphor for generic chaining: a fixed dyadic tree (successive
  // partitions of an index set into finer and finer pieces), with pulses
  // descending random root-to-leaf paths — the "chain" of increments summed
  // across scales that the theory bounds.
  var canvas = document.getElementById("chaining-tree-canvas");
  if (!canvas) return;
  var container = canvas.parentElement;
  var ctx = canvas.getContext("2d");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var W, H;
  var DEPTH = 6;
  var BASE_R = 7;
  var R_SCALE = 0.78;
  var TRAVELER_COUNT = 4;
  var PULSE_PX_PER_MS = 0.1;

  var NODE_COLOR = "rgba(219, 228, 250, 0.55)";
  var EDGE_COLOR = "rgba(77, 210, 255, 0.16)";
  var PULSE_COLOR = "rgba(226, 230, 240, 0.95)";

  var levels = [];
  var edges = [];
  var travelers = [];
  var lastTs = null;
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
  }

  function buildTree() {
    levels = [];
    var marginY = H * 0.16;
    for (var l = 0; l < DEPTH; l++) {
      var count = Math.pow(2, l);
      var y = marginY + (H - 2 * marginY) * (DEPTH === 1 ? 0 : l / (DEPTH - 1));
      var arr = [];
      for (var i = 0; i < count; i++) {
        arr.push({
          x: ((i + 0.5) / count) * W,
          y: y,
          r: Math.max(1.6, BASE_R * Math.pow(R_SCALE, l)),
          phase: Math.random() * Math.PI * 2
        });
      }
      levels.push(arr);
    }
    edges = [];
    for (var l2 = 0; l2 < DEPTH - 1; l2++) {
      for (var i2 = 0; i2 < levels[l2].length; i2++) {
        edges.push({ a: levels[l2][i2], b: levels[l2 + 1][2 * i2] });
        edges.push({ a: levels[l2][i2], b: levels[l2 + 1][2 * i2 + 1] });
      }
    }
  }

  function spawnTraveler() {
    var path = [levels[0][0]];
    var idx = 0;
    for (var l = 1; l < DEPTH; l++) {
      idx = idx * 2 + (Math.random() < 0.5 ? 0 : 1);
      path.push(levels[l][idx]);
    }
    return { path: path, segment: 0, t: 0 };
  }

  function step(now) {
    var dt = lastTs == null ? 16 : Math.min(now - lastTs, 64);
    lastTs = now;

    while (travelers.length < TRAVELER_COUNT) travelers.push(spawnTraveler());

    travelers.forEach(function (tr) {
      var a = tr.path[tr.segment];
      var b = tr.path[tr.segment + 1];
      var dx = b.x - a.x, dy = b.y - a.y;
      var hopDist = Math.max(1, Math.sqrt(dx * dx + dy * dy));
      tr.t += (PULSE_PX_PER_MS * dt) / hopDist;
      if (tr.t >= 1) {
        tr.segment += 1;
        tr.t = 0;
        if (tr.segment >= tr.path.length - 1) tr.dead = true;
      }
    });
    travelers = travelers.filter(function (tr) { return !tr.dead; });

    ctx.clearRect(0, 0, W, H);

    edges.forEach(function (e) {
      ctx.strokeStyle = EDGE_COLOR;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(e.a.x, e.a.y);
      ctx.lineTo(e.b.x, e.b.y);
      ctx.stroke();
    });

    travelers.forEach(function (tr) {
      var a = tr.path[tr.segment];
      var b = tr.path[tr.segment + 1];
      var px = a.x + (b.x - a.x) * tr.t;
      var py = a.y + (b.y - a.y) * tr.t;
      ctx.fillStyle = PULSE_COLOR;
      ctx.beginPath();
      ctx.arc(px, py, 2.4, 0, Math.PI * 2);
      ctx.fill();
    });

    levels.forEach(function (level) {
      level.forEach(function (n) {
        var twinkle = 0.82 + 0.18 * Math.sin(now / 1200 + n.phase);
        ctx.fillStyle = NODE_COLOR;
        ctx.globalAlpha = twinkle;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      });
    });
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
    buildTree();
    travelers = [];
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
  buildTree();

  if (!reduceMotion) start();
  else step(performance.now());
})();
