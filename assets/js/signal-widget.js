(function () {
  var canvas = document.getElementById("signal-widget-canvas");
  if (!canvas) return;
  var container = canvas.parentElement;
  var ctx = canvas.getContext("2d");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var W, H;
  var NODE_COUNT = 30;
  var LINK_DIST = 160;
  var SPAWN_CHANCE = 0.045; // per link, per frame — keeps several pulses in flight at once
  var PULSE_SPEED = 0.00042; // fraction of link traveled per ms

  var NODE_COLOR = "rgba(233, 236, 243, 0.55)";
  var LINK_COLOR = "rgba(77, 210, 255, 0.18)";
  var PULSE_COLORS = ["rgba(60, 255, 94, 0.95)", "rgba(77, 210, 255, 0.95)"];

  var nodes = [];
  var pulses = [];
  var lastTs = null;

  function resize() {
    W = container.clientWidth;
    H = container.clientHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = W + "px";
    canvas.style.height = H + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function seedNodes() {
    nodes = [];
    for (var i = 0; i < NODE_COUNT; i++) {
      nodes.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        r: 1.4 + Math.random() * 1.6,
        phase: Math.random() * Math.PI * 2
      });
    }
  }

  var links = [];
  function rebuildLinks() {
    links = [];
    for (var i = 0; i < nodes.length; i++) {
      for (var j = i + 1; j < nodes.length; j++) {
        var dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < LINK_DIST) links.push({ a: nodes[i], b: nodes[j], dist: dist });
      }
    }
  }

  function step(now) {
    var dt = lastTs == null ? 16 : Math.min(now - lastTs, 64);
    lastTs = now;

    nodes.forEach(function (n) {
      n.x += n.vx * (dt / 16);
      n.y += n.vy * (dt / 16);
      if (n.x < 0 || n.x > W) n.vx *= -1;
      if (n.y < 0 || n.y > H) n.vy *= -1;
    });
    rebuildLinks();

    links.forEach(function (l) {
      if (Math.random() < SPAWN_CHANCE) {
        pulses.push({
          link: l,
          t: 0,
          color: PULSE_COLORS[(Math.random() * PULSE_COLORS.length) | 0],
          reverse: Math.random() < 0.5
        });
      }
    });
    pulses = pulses.filter(function (p) { return p.t < 1; });
    pulses.forEach(function (p) { p.t += PULSE_SPEED * dt; });

    ctx.clearRect(0, 0, W, H);

    links.forEach(function (l) {
      ctx.strokeStyle = LINK_COLOR;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(l.a.x, l.a.y);
      ctx.lineTo(l.b.x, l.b.y);
      ctx.stroke();
    });

    pulses.forEach(function (p) {
      var t = p.reverse ? 1 - p.t : p.t;
      var px = p.link.a.x + (p.link.b.x - p.link.a.x) * t;
      var py = p.link.a.y + (p.link.b.y - p.link.a.y) * t;
      var fade = p.t < 0.5 ? 1 : (1 - p.t) * 2;
      ctx.globalAlpha = Math.max(fade, 0);
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(px, py, 2.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    });

    nodes.forEach(function (n) {
      var twinkle = 0.7 + 0.3 * Math.sin(now / 900 + n.phase);
      ctx.fillStyle = NODE_COLOR;
      ctx.globalAlpha = twinkle;
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    });
  }

  function loop(ts) {
    step(ts || performance.now());
    if (!reduceMotion) requestAnimationFrame(loop);
  }

  window.addEventListener("resize", function () {
    resize();
    seedNodes();
  });
  resize();
  seedNodes();

  if (!reduceMotion) requestAnimationFrame(loop);
  else step(performance.now());
})();
