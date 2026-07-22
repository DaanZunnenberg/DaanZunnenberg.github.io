// Full-page constellation backdrop, ported from the digital business card's
// page background: a field of small drifting/twinkling nodes linked by live
// distance, with traveler pulses hopping node-to-node across long chains.
// Renders behind every page's content.
(function () {
  var canvas = document.getElementById('site-network-canvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');

  // Seeded PRNG so the graph's layout is the same on every load/refresh.
  var seed = 0x9e3779b9;
  function random() {
    seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
    var t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }
  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var W, H;
  var LINK_DIST = 150;
  var TRAVELER_COUNT = 7;
  var PULSE_PX_PER_MS = 0.1;

  var NODE_COLOR = 'rgba(24, 33, 54, 0.5)';
  var LINK_COLOR = 'rgba(44, 85, 184, 0.26)';
  var PULSE_COLOR = 'rgba(26, 156, 120, 0.75)';

  var nodes = [];
  var travelers = [];
  var links = [];
  var lastTs = null;
  var frameCount = 0;
  var running = false;
  var visible = true;

  if (reduceMotion) return;

  function resize() {
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    LINK_DIST = Math.max(170, Math.min(W, H) * 0.26);
  }

  function seedNodes() {
    var nodeCount = Math.max(36, Math.floor((W * H) / 22000));
    nodes = [];
    for (var i = 0; i < nodeCount; i++) {
      nodes.push({
        x: random() * W,
        y: random() * H,
        vx: (random() - 0.5) * 0.22,
        vy: (random() - 0.5) * 0.22,
        r: 1.3 + random() * 1.8,
        phase: random() * Math.PI * 2
      });
    }
  }

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
    var start = nodes[(random() * nodes.length) | 0];
    var options = neighborsOf(start, null);
    if (!options.length) return null;
    var next = options[(random() * options.length) | 0];
    return { from: start, to: next, t: 0, hopsRemaining: 6 + ((random() * 6) | 0) };
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
    frameCount++;
    if (frameCount % 3 === 0) rebuildLinks();

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
        if (tr.hopsRemaining <= 0) { tr.dead = true; return; }
        var options = neighborsOf(tr.to, tr.from);
        if (!options.length) options = neighborsOf(tr.to, null);
        if (!options.length) { tr.dead = true; return; }
        tr.from = tr.to;
        tr.to = options[(random() * options.length) | 0];
        tr.t = 0;
      }
    });
    travelers = travelers.filter(function (tr) { return !tr.dead; });

    ctx.clearRect(0, 0, W, H);

    links.forEach(function (l) {
      ctx.strokeStyle = LINK_COLOR;
      ctx.lineWidth = 1.2;
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
      var twinkle = 0.75 + 0.25 * Math.sin(now / 1400 + n.phase);
      ctx.fillStyle = NODE_COLOR;
      ctx.globalAlpha = twinkle;
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    });
  }

  function loop(ts) {
    if (!running) return;
    step(ts || performance.now());
    requestAnimationFrame(loop);
  }

  function start() {
    if (running || !visible || document.hidden) return;
    running = true;
    lastTs = null;
    requestAnimationFrame(loop);
  }

  function stop() {
    running = false;
  }

  window.addEventListener('resize', function () {
    resize();
    seedNodes();
    travelers = [];
  });
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) stop(); else start();
  });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      visible = entries[entries.length - 1].isIntersecting;
      if (visible) start(); else stop();
    }).observe(canvas);
  }
  resize();
  seedNodes();
  start();
})();
