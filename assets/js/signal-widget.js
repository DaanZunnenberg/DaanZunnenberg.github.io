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
  var PULSE_MS = 2600;

  var NODE_COLOR = "rgba(233, 236, 243, 0.55)";
  var LINK_COLOR = "rgba(77, 210, 255, 0.16)";
  var PULSE_COLOR = "rgba(60, 255, 94, 0.9)";

  var nodes = [];

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
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        r: 1.4 + Math.random() * 1.6
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
    nodes.forEach(function (n) {
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > W) n.vx *= -1;
      if (n.y < 0 || n.y > H) n.vy *= -1;
    });
    rebuildLinks();

    ctx.clearRect(0, 0, W, H);

    links.forEach(function (l) {
      ctx.strokeStyle = LINK_COLOR;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(l.a.x, l.a.y);
      ctx.lineTo(l.b.x, l.b.y);
      ctx.stroke();
    });

    if (links.length) {
      var phase = (now % PULSE_MS) / PULSE_MS;
      var link = links[Math.floor((now / PULSE_MS) % links.length)];
      if (link) {
        var px = link.a.x + (link.b.x - link.a.x) * phase;
        var py = link.a.y + (link.b.y - link.a.y) * phase;
        ctx.fillStyle = PULSE_COLOR;
        ctx.beginPath();
        ctx.arc(px, py, 2.2, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    nodes.forEach(function (n) {
      ctx.fillStyle = NODE_COLOR;
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fill();
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
