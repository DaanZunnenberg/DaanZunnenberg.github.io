// Full-page constellation backdrop, ported from the digital business card's
// page background: a field of small drifting/twinkling nodes linked by live
// distance, with traveler pulses hopping node-to-node, plus a handful of
// large soft glow orbs that float slowly and independently across the page
// for a sense of depth. Renders behind every page's content.
(function () {
  var canvas = document.getElementById('site-network-canvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var W, H;
  var LINK_DIST = 150;
  var TRAVELER_COUNT = 4;
  var PULSE_PX_PER_MS = 0.1;

  var NODE_COLOR = 'rgba(24, 33, 54, 0.5)';
  var LINK_COLOR = 'rgba(44, 85, 184, 0.26)';
  var PULSE_COLOR = 'rgba(26, 156, 120, 0.75)';
  var ORB_COLORS = [
    'rgba(48, 89, 201, 0.16)',
    'rgba(26, 156, 120, 0.13)',
    'rgba(207, 59, 76, 0.1)'
  ];

  var nodes = [];
  var travelers = [];
  var links = [];
  var orbs = [];
  var lastTs = null;

  if (reduceMotion) return;

  function resize() {
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    LINK_DIST = Math.max(130, Math.min(W, H) * 0.2);
  }

  function seedNodes() {
    var nodeCount = Math.max(24, Math.floor((W * H) / 34000));
    nodes = [];
    for (var i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: 1.3 + Math.random() * 1.8,
        phase: Math.random() * Math.PI * 2
      });
    }
  }

  function seedOrbs() {
    var orbCount = Math.max(4, Math.floor((W * H) / 380000));
    orbs = [];
    for (var i = 0; i < orbCount; i++) {
      var radius = Math.min(W, H) * (0.14 + Math.random() * 0.16);
      orbs.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.055,
        vy: (Math.random() - 0.5) * 0.055,
        r: radius,
        color: ORB_COLORS[i % ORB_COLORS.length],
        bobPhase: Math.random() * Math.PI * 2,
        bobAmp: 14 + Math.random() * 18
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
    var start = nodes[(Math.random() * nodes.length) | 0];
    var options = neighborsOf(start, null);
    if (!options.length) return null;
    var next = options[(Math.random() * options.length) | 0];
    return { from: start, to: next, t: 0, hopsRemaining: 2 + ((Math.random() * 3) | 0) };
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

    orbs.forEach(function (o) {
      o.x += o.vx * dt;
      o.y += o.vy * dt;
      if (o.x < -o.r) o.x = W + o.r;
      if (o.x > W + o.r) o.x = -o.r;
      if (o.y < -o.r) o.y = H + o.r;
      if (o.y > H + o.r) o.y = -o.r;
    });

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
        tr.to = options[(Math.random() * options.length) | 0];
        tr.t = 0;
      }
    });
    travelers = travelers.filter(function (tr) { return !tr.dead; });

    ctx.clearRect(0, 0, W, H);

    // Large soft glow orbs drift slowly beneath everything else, bobbing
    // vertically on their own sine wave so they feel like they're floating
    // rather than sliding in a straight line.
    orbs.forEach(function (o) {
      var by = o.y + Math.sin(now / 3200 + o.bobPhase) * o.bobAmp;
      var grad = ctx.createRadialGradient(o.x, by, 0, o.x, by, o.r);
      grad.addColorStop(0, o.color);
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(o.x, by, o.r, 0, Math.PI * 2);
      ctx.fill();
    });

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
    step(ts || performance.now());
    requestAnimationFrame(loop);
  }

  window.addEventListener('resize', function () {
    resize();
    seedNodes();
    seedOrbs();
    travelers = [];
  });
  resize();
  seedNodes();
  seedOrbs();
  requestAnimationFrame(loop);
})();
