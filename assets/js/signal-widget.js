(function () {
  var canvas = document.getElementById("signal-widget-canvas");
  if (!canvas) return;
  var container = canvas.parentElement;
  var ctx = canvas.getContext("2d");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var W, H;
  var NODE_COUNT = 26;
  var LINK_DIST = 150;
  var TRAVELER_COUNT = 3;
  var PULSE_PX_PER_MS = 0.075; // constant on-screen speed, independent of hop length

  var NODE_COLOR = "rgba(233, 236, 243, 0.55)";
  var LINK_COLOR = "rgba(77, 210, 255, 0.16)";
  var PULSE_COLOR = "rgba(60, 255, 94, 0.9)";

  var nodes = [];
  var travelers = [];
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
        vx: (Math.random() - 0.5) * 0.19,
        vy: (Math.random() - 0.5) * 0.19,
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

  function neighborsOf(node, exclude) {
    var out = [];
    links.forEach(function (l) {
      if (l.a === node && l.b !== exclude) out.push(l.b);
      else if (l.b === node && l.a !== exclude) out.push(l.a);
    });
    return out;
  }

  function spawnTraveler() {
    var start = nodes[(Math.random() * nodes.length) | 0];
    var options = neighborsOf(start, null);
    if (!options.length) return null;
    var next = options[(Math.random() * options.length) | 0];
    return {
      from: start,
      to: next,
      t: 0,
      hopsRemaining: 2 + ((Math.random() * 3) | 0) // 2–4 hops before despawning
    };
  }

  function step(now) {
    var dt = lastTs == null ? 16 : Math.min(now - lastTs, 64);
    lastTs = now;

    nodes.forEach(function (n) {
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > W) n.vx *= -1;
      if (n.y < 0 || n.y > H) n.vy *= -1;
    });
    rebuildLinks();

    while (travelers.length < TRAVELER_COUNT) {
      var t = spawnTraveler();
      if (!t) break;
      travelers.push(t);
    }

    travelers.forEach(function (tr) {
      var dx = tr.to.x - tr.from.x, dy = tr.to.y - tr.from.y;
      var hopDist = Math.max(1, Math.sqrt(dx * dx + dy * dy));
      tr.t += (PULSE_PX_PER_MS * dt) / hopDist;
      if (tr.t >= 1) {
        tr.hopsRemaining -= 1;
        if (tr.hopsRemaining <= 0) {
          tr.dead = true;
          return;
        }
        var options = neighborsOf(tr.to, tr.from);
        if (!options.length) options = neighborsOf(tr.to, null);
        if (!options.length) {
          tr.dead = true;
          return;
        }
        tr.from = tr.to;
        tr.to = options[(Math.random() * options.length) | 0];
        tr.t = 0;
      }
    });
    travelers = travelers.filter(function (tr) { return !tr.dead; });

    ctx.clearRect(0, 0, W, H);

    links.forEach(function (l) {
      ctx.strokeStyle = LINK_COLOR;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(l.a.x, l.a.y);
      ctx.lineTo(l.b.x, l.b.y);
      ctx.stroke();
    });

    travelers.forEach(function (tr) {
      var px = tr.from.x + (tr.to.x - tr.from.x) * tr.t;
      var py = tr.from.y + (tr.to.y - tr.from.y) * tr.t;
      ctx.fillStyle = PULSE_COLOR;
      ctx.beginPath();
      ctx.arc(px, py, 2.2, 0, Math.PI * 2);
      ctx.fill();
    });

    nodes.forEach(function (n) {
      var twinkle = 0.85 + 0.15 * Math.sin(now / 1100 + n.phase);
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
    travelers = [];
  });
  resize();
  seedNodes();

  if (!reduceMotion) requestAnimationFrame(loop);
  else step(performance.now());
})();
