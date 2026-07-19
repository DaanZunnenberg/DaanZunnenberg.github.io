(function () {
  var canvas = document.getElementById("metric-network-canvas");
  if (!canvas) return;
  var container = canvas.parentElement;
  var ctx = canvas.getContext("2d");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var W, H;

  // A random geometric graph: points drifting through a metric space,
  // joined by an edge whenever two sit within a fixed radius of each other
  // (a Vietoris-Rips-style proximity graph). Whenever three points are
  // all mutually within reach, the triangle between them is filled in as
  // a 2-simplex. From that live complex we track V - E + F, the Euler
  // characteristic, updating continuously as the graph reconfigures.
  var LINK_DIST = 130;
  var MONO_FONT = "'SF Mono', Menlo, Consolas, monospace";
  var NODE_COLOR = "rgba(233, 236, 243, 0.6)";
  var EDGE_COLOR = "77, 210, 255";
  var FACE_COLOR = "150, 190, 130";

  var nodes = [];

  function seedNodes() {
    nodes = [];
    var n = Math.max(30, Math.floor((W * H) / 13000));
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

  // Build the proximity graph for this frame, then find its triangles by
  // walking edges through a per-node adjacency list rather than checking
  // every triple of points, which keeps this cheap enough for 60fps.
  function buildComplex() {
    var n = nodes.length;
    var adj = new Array(n);
    for (var i = 0; i < n; i++) adj[i] = [];
    var edges = [];

    for (i = 0; i < n; i++) {
      for (var j = i + 1; j < n; j++) {
        var dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist >= LINK_DIST) continue;
        edges.push({ i: i, j: j, t: 1 - dist / LINK_DIST });
        adj[i].push(j);
        adj[j].push(i);
      }
    }

    var faces = [];
    edges.forEach(function (e) {
      var neighborsI = adj[e.i], neighborsJ = adj[e.j];
      for (var a = 0; a < neighborsI.length; a++) {
        var k = neighborsI[a];
        if (k <= e.j) continue; // k > j keeps each triangle counted once
        if (neighborsJ.indexOf(k) !== -1) faces.push([e.i, e.j, k]);
      }
    });

    return { edges: edges, faces: faces };
  }

  function draw(now, complex) {
    ctx.clearRect(0, 0, W, H);

    complex.faces.forEach(function (f) {
      var a = nodes[f[0]], b = nodes[f[1]], c = nodes[f[2]];
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.lineTo(c.x, c.y);
      ctx.closePath();
      ctx.fillStyle = "rgba(" + FACE_COLOR + ", 0.07)";
      ctx.fill();
    });

    complex.edges.forEach(function (e) {
      var a = nodes[e.i], b = nodes[e.j];
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.strokeStyle = "rgba(" + EDGE_COLOR + ", " + (0.05 + 0.22 * e.t * e.t) + ")";
      ctx.lineWidth = 1;
      ctx.stroke();
    });

    nodes.forEach(function (n) {
      var twinkle = 0.75 + 0.25 * Math.sin(now / 1600 + n.phase);
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = NODE_COLOR;
      ctx.globalAlpha = twinkle;
      ctx.fill();
      ctx.globalAlpha = 1;
    });

    var V = nodes.length, E = complex.edges.length, F = complex.faces.length;
    var chi = V - E + F;
    ctx.font = "11px " + MONO_FONT;
    ctx.textAlign = "left";
    ctx.fillStyle = "rgba(224, 168, 82, 0.6)";
    ctx.fillText(
      "χ = V − E + F = " + V + " − " + E + " + " + F + " = " + chi,
      12, H - 14
    );
  }

  function loop(ts) {
    step();
    draw(ts || performance.now(), buildComplex());
    if (!reduceMotion) requestAnimationFrame(loop);
  }

  window.addEventListener("resize", resize);
  resize();

  if (!reduceMotion) {
    requestAnimationFrame(loop);
  } else {
    draw(0, buildComplex());
  }
})();
