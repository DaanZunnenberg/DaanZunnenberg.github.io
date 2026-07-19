(function () {
  var canvas = document.getElementById("chaining-tree-canvas");
  if (!canvas) return;
  var container = canvas.parentElement;
  var ctx = canvas.getContext("2d");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var W, H;

  // A generic-chaining-flavored visual: a growing tree of nested pieces
  // (an admissible sequence A_0, A_1, ... refining down to leaves), drawn
  // over a loose scatter of points standing in for the underlying metric
  // space T. Every cycle regenerates a genuinely different tree — root
  // position, depth, branch counts, and angles are all randomized, rather
  // than one fixed shape replaying with cosmetic jitter.
  var LEVEL_COLOR = [
    "rgba(77, 210, 255, 0.8)",
    "rgba(96, 200, 220, 0.7)",
    "rgba(120, 190, 170, 0.6)",
    "rgba(150, 190, 130, 0.55)",
    "rgba(224, 168, 82, 0.55)",
    "rgba(200, 140, 190, 0.5)"
  ];
  var REGION_FILL = ["rgba(77, 210, 255, 0.05)", "rgba(150, 190, 130, 0.05)", "rgba(224, 168, 82, 0.05)"];
  var REGION_STROKE = ["rgba(77, 210, 255, 0.22)", "rgba(150, 190, 130, 0.22)", "rgba(224, 168, 82, 0.22)"];

  var dots = [];
  function seedDots() {
    dots = [];
    var n = Math.max(30, Math.floor((W * H) / 9000));
    for (var i = 0; i < n; i++) {
      dots.push({
        x: Math.random() * W,
        y: H * 0.62 + Math.random() * H * 0.34,
        r: 0.9 + Math.random() * 1.3,
        phase: Math.random() * Math.PI * 2
      });
    }
  }

  // Organic, radial branching: each node picks its own child count and
  // scatters their angles unevenly within a wide arc (rather than an
  // evenly-spaced fan), so no two subtrees look alike.
  function buildTree() {
    var idCounter = 0;
    var marginX0 = W * 0.03, marginX1 = W * 0.58;
    var marginY0 = H * 0.1, marginY1 = H * 0.9;
    var baseLen = Math.min(W, H) * 0.17;
    var maxDepth = 3 + ((Math.random() * 3) | 0); // 3, 4, or 5 levels deep

    function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

    function makeNode(depth, x, y, angle) {
      var node = { id: idCounter++, depth: depth, x: x, y: y, children: [] };
      if (depth < maxDepth) {
        var branch = 2 + ((Math.random() * 3) | 0); // 2-4 children, per node
        var spread = depth === 0 ? Math.PI * (1.3 + Math.random() * 0.6) : Math.PI * (0.55 + Math.random() * 0.4) - depth * 0.06;
        var len = baseLen * Math.pow(0.7, depth);
        for (var i = 0; i < branch; i++) {
          // Fully random placement within the arc rather than evenly
          // spaced fractions — avoids the symmetric fan-blade look.
          var childAngle = angle + (Math.random() - 0.5) * spread;
          var childLen = len * (0.7 + Math.random() * 0.55);
          var cx = clamp(x + Math.cos(childAngle) * childLen, marginX0, marginX1);
          var cy = clamp(y + Math.sin(childAngle) * childLen, marginY0, marginY1);
          node.children.push(makeNode(depth + 1, cx, cy, childAngle));
        }
      }
      return node;
    }

    var rootX = marginX0 + Math.random() * (marginX1 - marginX0) * 0.75;
    var rootY = marginY0 + Math.random() * (marginY1 - marginY0);
    var rootAngle = Math.random() * Math.PI * 2;
    var root = makeNode(0, rootX, rootY, rootAngle);
    return { root: root, maxDepth: maxDepth };
  }

  function flatten(root) {
    var nodes = [], edges = [];
    (function walk(n) {
      nodes.push(n);
      n.children.forEach(function (c) {
        edges.push([n, c]);
        walk(c);
      });
    })(root);
    return { nodes: nodes, edges: edges };
  }

  // Andrew's monotone-chain convex hull: turns a cluster's leaf positions
  // into an irregular polygon "region" — a piece of the partition, not a
  // uniform ball — which reads as noticeably more geometric than a circle.
  function convexHull(pts) {
    var points = pts.slice().sort(function (a, b) { return a.x - b.x || a.y - b.y; });
    if (points.length < 3) return points;
    function cross(o, a, b) { return (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x); }
    var lower = [];
    for (var i = 0; i < points.length; i++) {
      while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], points[i]) <= 0) lower.pop();
      lower.push(points[i]);
    }
    var upper = [];
    for (var j = points.length - 1; j >= 0; j--) {
      while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], points[j]) <= 0) upper.pop();
      upper.push(points[j]);
    }
    lower.pop(); upper.pop();
    return lower.concat(upper);
  }

  function leafDescendants(node) {
    var out = [];
    (function walk(n) {
      if (!n.children.length) out.push(n); else n.children.forEach(walk);
    })(node);
    return out;
  }

  function resize() {
    W = container.clientWidth;
    H = container.clientHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = W + "px";
    canvas.style.height = H + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    seedDots();
  }

  var GROW_MS = 2800, HOLD_MS = 2600, FADE_MS = 1000;
  var phase, phaseStart, tree, flat, maxDepth;

  function startCycle(now) {
    var built = buildTree();
    tree = built.root;
    maxDepth = built.maxDepth;
    flat = flatten(tree);
    phase = "growing";
    phaseStart = now;
  }

  function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

  function drawDots(now) {
    dots.forEach(function (d) {
      var tw = 0.5 + 0.5 * Math.sin(now / 1500 + d.phase);
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(233, 236, 243, " + (0.12 + 0.1 * tw) + ")";
      ctx.fill();
    });
  }

  // Faceted regions: a convex-hull polygon over each depth-1 subtree's
  // leaves, filled and dashed-outlined — the "covering piece" side of
  // generic chaining, drawn as an actual irregular region instead of a
  // uniform circle. Only fades in once growth is mostly done.
  function drawRegions(growT, globalAlpha) {
    if (growT < 0.65 || !tree.children.length) return;
    var regionAlpha = Math.min(1, (growT - 0.65) / 0.35) * globalAlpha;
    ctx.globalAlpha = regionAlpha;
    ctx.setLineDash([4, 4]);

    tree.children.forEach(function (child, i) {
      var leaves = leafDescendants(child);
      var pts = leaves.length >= 3 ? leaves : leaves.concat([child]);
      var hull = convexHull(pts);
      if (hull.length < 3) return;
      ctx.beginPath();
      ctx.moveTo(hull[0].x, hull[0].y);
      for (var k = 1; k < hull.length; k++) ctx.lineTo(hull[k].x, hull[k].y);
      ctx.closePath();
      ctx.fillStyle = REGION_FILL[i % REGION_FILL.length];
      ctx.fill();
      ctx.strokeStyle = REGION_STROKE[i % REGION_STROKE.length];
      ctx.lineWidth = 1;
      ctx.stroke();
    });

    ctx.setLineDash([]);
    ctx.globalAlpha = 1;
  }

  // Reveal the tree level by level: edges draw as growing line segments
  // from parent to child, nodes pop in once their edge completes.
  function drawTree(growT, globalAlpha) {
    var perLevel = 1 / (maxDepth + 1);

    drawRegions(growT, globalAlpha);

    flat.edges.forEach(function (edge) {
      var parent = edge[0], child = edge[1];
      var levelStart = child.depth * perLevel;
      var t = (growT - levelStart) / perLevel;
      if (t <= 0) return;
      t = Math.min(1, t);
      var te = easeOutCubic(t);
      var ex = parent.x + (child.x - parent.x) * te;
      var ey = parent.y + (child.y - parent.y) * te;

      ctx.beginPath();
      ctx.moveTo(parent.x, parent.y);
      ctx.lineTo(ex, ey);
      ctx.strokeStyle = LEVEL_COLOR[child.depth] || LEVEL_COLOR[LEVEL_COLOR.length - 1];
      ctx.globalAlpha = globalAlpha;
      ctx.lineWidth = Math.max(0.8, 2.4 - child.depth * 0.4);
      ctx.stroke();

      if (t >= 1) {
        ctx.beginPath();
        ctx.arc(child.x, child.y, Math.max(2, 4.5 - child.depth * 0.7), 0, Math.PI * 2);
        ctx.fillStyle = LEVEL_COLOR[child.depth] || LEVEL_COLOR[LEVEL_COLOR.length - 1];
        ctx.fill();

        // faint line from each leaf down toward the scattered metric-space
        // points, suggesting the tree organizes those points.
        if (!child.children.length) {
          var nearest = null, best = Infinity;
          for (var i = 0; i < dots.length; i++) {
            var dx = dots[i].x - child.x, dy = dots[i].y - child.y;
            var dist = dx * dx + dy * dy;
            if (dist < best) { best = dist; nearest = dots[i]; }
          }
          if (nearest) {
            ctx.beginPath();
            ctx.moveTo(child.x, child.y);
            ctx.lineTo(nearest.x, nearest.y);
            ctx.strokeStyle = "rgba(224, 168, 82, 0.18)";
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
    });

    ctx.beginPath();
    ctx.arc(tree.x, tree.y, 5, 0, Math.PI * 2);
    ctx.fillStyle = LEVEL_COLOR[0];
    ctx.globalAlpha = globalAlpha;
    ctx.fill();
    ctx.globalAlpha = 1;
  }

  function frame(now) {
    if (phase == null) startCycle(now);
    var elapsed = now - phaseStart;

    ctx.clearRect(0, 0, W, H);
    drawDots(now);

    if (phase === "growing") {
      var t = Math.min(1, elapsed / GROW_MS);
      drawTree(t, 1);
      if (t >= 1) { phase = "holding"; phaseStart = now; }
    } else if (phase === "holding") {
      drawTree(1, 1);
      if (elapsed >= HOLD_MS) { phase = "fading"; phaseStart = now; }
    } else if (phase === "fading") {
      var alpha = Math.max(0, 1 - elapsed / FADE_MS);
      drawTree(1, alpha);
      if (elapsed >= FADE_MS) startCycle(now);
    }

    if (!reduceMotion) requestAnimationFrame(frame);
  }

  window.addEventListener("resize", resize);
  resize();

  if (!reduceMotion) {
    requestAnimationFrame(frame);
  } else {
    startCycle(0);
    ctx.clearRect(0, 0, W, H);
    drawDots(0);
    drawTree(1, 1);
  }
})();
