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
  // space T. The tree regrows with a new random shape on each cycle,
  // rather than a fixed diagram, so it stays visibly alive.
  var LEVEL_BRANCH = [3, 3, 2, 2]; // children per node at each depth
  var LEVEL_COLOR = [
    "rgba(77, 210, 255, 0.8)",
    "rgba(96, 200, 220, 0.7)",
    "rgba(120, 190, 170, 0.6)",
    "rgba(150, 190, 130, 0.55)",
    "rgba(224, 168, 82, 0.55)"
  ];

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

  // Organic, radial branching (angle + shrinking edge length) rather than
  // a fixed row grid, so the tree fans out in multiple directions like an
  // actual branching structure instead of only growing downward. Positions
  // are softly clamped to a bounding box so it stays readable next to the
  // hero copy rather than drifting off-canvas.
  function buildTree() {
    var idCounter = 0;
    var marginX0 = W * 0.03, marginX1 = W * 0.58;
    var marginY0 = H * 0.1, marginY1 = H * 0.9;
    var baseLen = Math.min(W, H) * 0.16;

    function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

    function makeNode(depth, x, y, angle) {
      var node = { id: idCounter++, depth: depth, x: x, y: y, children: [] };
      if (depth < LEVEL_BRANCH.length) {
        var branch = LEVEL_BRANCH[depth];
        // Wide fan near the root (multi-directional growth), narrowing at
        // deeper levels so leaves don't scatter completely at random.
        var spread = depth === 0 ? Math.PI * 1.7 : Math.PI * 0.8 - depth * 0.12;
        var len = baseLen * Math.pow(0.72, depth) * (0.85 + Math.random() * 0.3);
        for (var i = 0; i < branch; i++) {
          var frac = branch === 1 ? 0.5 : i / (branch - 1);
          var childAngle = angle + (frac - 0.5) * spread + (Math.random() - 0.5) * 0.35;
          var cx = clamp(x + Math.cos(childAngle) * len, marginX0, marginX1);
          var cy = clamp(y + Math.sin(childAngle) * len, marginY0, marginY1);
          node.children.push(makeNode(depth + 1, cx, cy, childAngle));
        }
      }
      return node;
    }

    var rootAngle = -Math.PI / 2 + (Math.random() - 0.5) * 0.6;
    var root = makeNode(0, W * 0.3, H * 0.5, rootAngle);
    return root;
  }

  // Ball radius for a node: the farthest any of its descendants sits from
  // it — the covering-ball geometry generic chaining is named for.
  function coveringRadius(node) {
    var max = 0;
    (function walk(n) {
      var dx = n.x - node.x, dy = n.y - node.y;
      max = Math.max(max, Math.sqrt(dx * dx + dy * dy));
      n.children.forEach(walk);
    })(node);
    return max;
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
  var phase, phaseStart, tree, flat;

  function startCycle(now) {
    tree = buildTree();
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

  // Faint covering balls (B(t, radius)) around the depth-1 pieces, plus one
  // loosely around the whole tree — the "covering" side of generic
  // chaining, not just the tree side. Only fades in once growth is mostly
  // done, and only at two levels, to keep it from getting busy.
  function drawCoveringBalls(growT, globalAlpha) {
    if (growT < 0.7) return;
    var ballAlpha = Math.min(1, (growT - 0.7) / 0.3) * globalAlpha;
    ctx.globalAlpha = ballAlpha;

    ctx.beginPath();
    ctx.arc(tree.x, tree.y, coveringRadius(tree), 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(77, 210, 255, 0.14)";
    ctx.lineWidth = 1;
    ctx.stroke();

    tree.children.forEach(function (child) {
      ctx.beginPath();
      ctx.arc(child.x, child.y, coveringRadius(child), 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(150, 190, 130, 0.16)";
      ctx.lineWidth = 1;
      ctx.stroke();
    });
    ctx.globalAlpha = 1;
  }

  // Reveal the tree level by level: edges draw as growing line segments
  // from parent to child, nodes pop in once their edge completes.
  function drawTree(growT, globalAlpha) {
    var maxDepth = LEVEL_BRANCH.length;
    var perLevel = 1 / (maxDepth + 1);

    drawCoveringBalls(growT, globalAlpha);

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
        if (child.depth === maxDepth) {
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
