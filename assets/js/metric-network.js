(function () {
  var canvas = document.getElementById("metric-network-canvas");
  if (!canvas) return;
  var container = canvas.parentElement;
  var ctx = canvas.getContext("2d");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var W, H;

  // Two random geometric graphs whose domains overlap slightly at the
  // seam, each a small Vietoris-Rips-style complex: points drifting within
  // their own (interlocking) half of the hero, edges when two points are
  // within reach, triangles filled in as 2-simplices whenever three points
  // are all mutually close. Each system's convex hull is drawn as a sharp
  // polygon and tracks its own live Euler characteristic V - E + F and
  // isoperimetric ratio P^2 / 4*pi*A (planar Brunn-Minkowski).
  var MONO_FONT = "'SF Mono', Menlo, Consolas, monospace";
  var NODE_COLOR = "rgba(233, 236, 243, 0.6)";

  function lerp(a, b, t) { return a + (b - a) * t; }

  // Andrew's monotone chain: convex hull of a point set, used to draw each
  // system as a sharp faceted polygon (rather than the loose triangle
  // cloud alone) and to compute the isoperimetric ratio below.
  function convexHull(points) {
    var pts = points.slice().sort(function (a, b) { return a.x - b.x || a.y - b.y; });
    var n = pts.length;
    if (n < 3) return pts;
    function cross(o, a, b) { return (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x); }
    var lower = [];
    for (var i = 0; i < n; i++) {
      while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], pts[i]) <= 0) lower.pop();
      lower.push(pts[i]);
    }
    var upper = [];
    for (i = n - 1; i >= 0; i--) {
      while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], pts[i]) <= 0) upper.pop();
      upper.push(pts[i]);
    }
    lower.pop(); upper.pop();
    return lower.concat(upper);
  }

  function polygonPerimeter(hull) {
    var p = 0;
    for (var i = 0; i < hull.length; i++) {
      var a = hull[i], b = hull[(i + 1) % hull.length];
      p += Math.hypot(b.x - a.x, b.y - a.y);
    }
    return p;
  }

  function polygonArea(hull) {
    var a = 0;
    for (var i = 0; i < hull.length; i++) {
      var p = hull[i], q = hull[(i + 1) % hull.length];
      a += p.x * q.y - q.x * p.y;
    }
    return Math.abs(a) / 2;
  }

  function createSystem(opts) {
    var sys = {
      linkDist: opts.linkDist,
      edgeColor: opts.edgeColor,
      faceColor: opts.faceColor,
      labelColor: opts.labelColor,
      nodes: [],
      edgeAlpha: {} // "i-j" -> smoothed alpha, so links fade in/out instead of snapping
    };

    sys.seed = function (x0, x1, y0, y1) {
      sys.x0 = x0; sys.x1 = x1; sys.y0 = y0; sys.y1 = y1;
      var area = (x1 - x0) * (y1 - y0);
      var n = Math.max(24, Math.floor(area / 7500)); // denser than before -> richer, more intricate complex
      sys.nodes = [];
      for (var i = 0; i < n; i++) {
        sys.nodes.push({
          x: x0 + Math.random() * (x1 - x0),
          y: y0 + Math.random() * (y1 - y0),
          vx: (Math.random() - 0.5) * 0.14,
          vy: (Math.random() - 0.5) * 0.14,
          r: 0.8 + Math.random() * 2.6,
          phase: Math.random() * Math.PI * 2
        });
      }
      sys.edgeAlpha = {};
    };

    sys.step = function () {
      sys.nodes.forEach(function (n) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < sys.x0 || n.x > sys.x1) n.vx *= -1;
        if (n.y < sys.y0 || n.y > sys.y1) n.vy *= -1;
      });
    };

    // Builds the graph for this frame, smoothing each possible edge's
    // alpha toward 0 or 1 (in reach / not) rather than snapping, so
    // connections fade in and out over a few hundred ms instead of
    // popping instantly as points cross the link radius.
    sys.buildComplex = function () {
      var nodes = sys.nodes, n = nodes.length;
      var adj = new Array(n);
      for (var i = 0; i < n; i++) adj[i] = [];
      var edges = [];
      var seen = {};

      for (i = 0; i < n; i++) {
        for (var j = i + 1; j < n; j++) {
          var dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          var key = i + "-" + j;
          var target = dist < sys.linkDist ? (1 - dist / sys.linkDist) : 0;
          var current = sys.edgeAlpha[key] || 0;
          current = lerp(current, target, 0.08);
          if (current < 0.003) { delete sys.edgeAlpha[key]; continue; }
          sys.edgeAlpha[key] = current;
          seen[key] = true;
          edges.push({ i: i, j: j, alpha: current });
          if (dist < sys.linkDist) { adj[i].push(j); adj[j].push(i); }
        }
      }
      // keep fading out edges whose pair is no longer even iterated over
      // (can't happen here since we always iterate all pairs, but guards
      // against stale keys if node count ever changes mid-cycle)
      Object.keys(sys.edgeAlpha).forEach(function (k) { if (!seen[k]) delete sys.edgeAlpha[k]; });

      var faces = [];
      for (i = 0; i < n; i++) {
        var ai = adj[i];
        for (var a = 0; a < ai.length; a++) {
          var j = ai[a];
          if (j <= i) continue;
          var aj = adj[j];
          for (var b = 0; b < aj.length; b++) {
            var k = aj[b];
            if (k <= j) continue;
            if (adj[i].indexOf(k) !== -1) faces.push([i, j, k]);
          }
        }
      }

      return { edges: edges, faces: faces };
    };

    return sys;
  }

  var left = createSystem({ linkDist: 128, edgeColor: "77, 210, 255", faceColor: "150, 190, 130", labelColor: "224, 168, 82" });
  var right = createSystem({ linkDist: 128, edgeColor: "200, 140, 190", faceColor: "224, 168, 82", labelColor: "77, 210, 255" });

  function resize() {
    W = container.clientWidth;
    H = container.clientHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = W + "px";
    canvas.style.height = H + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // The two halves overlap slightly at the seam so their convex hulls can
    // interlock in the middle rather than sitting as two separate blobs.
    var overlap = W * 0.05;
    left.seed(W * 0.02, W * 0.51 + overlap / 2, H * 0.08, H * 0.92);
    right.seed(W * 0.49 - overlap / 2, W * 0.98, H * 0.08, H * 0.92);
  }

  function drawSystem(sys, now, complex, labelAlign) {
    var hull = convexHull(sys.nodes);
    if (hull.length >= 3) {
      ctx.beginPath();
      ctx.moveTo(hull[0].x, hull[0].y);
      for (var h = 1; h < hull.length; h++) ctx.lineTo(hull[h].x, hull[h].y);
      ctx.closePath();
      ctx.strokeStyle = "rgba(" + sys.faceColor + ", 0.4)";
      ctx.lineWidth = 1.1;
      ctx.stroke();
    }

    complex.faces.forEach(function (f) {
      var a = sys.nodes[f[0]], b = sys.nodes[f[1]], c = sys.nodes[f[2]];
      // Smaller, tighter triangles read as denser local structure, so give
      // them a touch more fill than large, loose ones — adds depth without
      // a uniform flat wash across every face.
      var area = Math.abs((b.x - a.x) * (c.y - a.y) - (c.x - a.x) * (b.y - a.y)) / 2;
      var fillT = Math.max(0.04, Math.min(0.12, 900 / (area + 900) * 0.12));
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.lineTo(c.x, c.y);
      ctx.closePath();
      ctx.fillStyle = "rgba(" + sys.faceColor + ", " + fillT.toFixed(3) + ")";
      ctx.fill();
    });

    complex.edges.forEach(function (e) {
      var a = sys.nodes[e.i], b = sys.nodes[e.j];
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.strokeStyle = "rgba(" + sys.edgeColor + ", " + (0.05 + 0.24 * e.alpha * e.alpha).toFixed(3) + ")";
      ctx.lineWidth = 1;
      ctx.stroke();
    });

    sys.nodes.forEach(function (n) {
      var twinkle = 0.75 + 0.25 * Math.sin(now / 1600 + n.phase);
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = NODE_COLOR;
      ctx.globalAlpha = twinkle;
      ctx.fill();
      ctx.globalAlpha = 1;
    });

    var V = sys.nodes.length, E = complex.edges.filter(function (e) { return e.alpha > 0.4; }).length, F = complex.faces.length;
    var chi = V - E + F;
    var P = polygonPerimeter(hull), A = polygonArea(hull);
    // Isoperimetric inequality P^2 >= 4*pi*A (the planar case of Brunn-Minkowski);
    // the quotient is 1 only for a circle and grows as the hull gets more jagged.
    var isoq = A > 0 ? (P * P) / (4 * Math.PI * A) : 0;
    ctx.font = "11px " + MONO_FONT;
    ctx.textAlign = labelAlign;
    ctx.fillStyle = "rgba(" + sys.labelColor + ", 0.65)";
    var tx = labelAlign === "left" ? sys.x0 : sys.x1;
    ctx.fillText("χ = V − E + F = " + chi, tx, H - 30);
    ctx.fillText("P² ⁄ 4πA = " + isoq.toFixed(2) + "  (≥ 1)", tx, H - 16);
  }

  function frame(now) {
    left.step();
    right.step();
    ctx.clearRect(0, 0, W, H);
    // Labels anchored toward the inner edge of each half (near the gap
    // between the two systems) — away from the hero copy on the far left
    // and the outer canvas edge on the far right.
    drawSystem(left, now, left.buildComplex(), "right");
    drawSystem(right, now, right.buildComplex(), "left");
    if (!reduceMotion) requestAnimationFrame(frame);
  }

  window.addEventListener("resize", resize);
  resize();

  if (!reduceMotion) {
    requestAnimationFrame(frame);
  } else {
    ctx.clearRect(0, 0, W, H);
    drawSystem(left, 0, left.buildComplex(), "right");
    drawSystem(right, 0, right.buildComplex(), "left");
  }
})();
