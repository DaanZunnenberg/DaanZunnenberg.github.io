(function () {
  var canvas = document.getElementById("metric-network-canvas");
  if (!canvas) return;
  var container = canvas.parentElement;
  var ctx = canvas.getContext("2d");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var W, H;

  // A single random geometric graph, a small Vietoris-Rips-style complex:
  // points drift within a star-shaped (not circular) domain whose harmonics
  // slowly rotate and wobble, so the silhouette reads as an irregular,
  // faceted region rather than a ball. Edges appear when two points are
  // within reach, triangles fill in as 2-simplices whenever three points
  // are all mutually close, and the system tracks its own live Euler
  // characteristic V - E + F. Occasionally (rarely) the domain's harmonics
  // jump to a new random configuration all at once — a sudden pulse in the
  // silhouette — before settling back into the usual smooth drift.
  var MONO_FONT = "'SF Mono', Menlo, Consolas, monospace";
  var LABEL_COLOR = "224, 168, 82";

  // Same magma-style palette as the functional volatility surface figures:
  // warm yellow for stable/low-activity elements, shifting to purple
  // wherever a node has just changed direction (a boundary bounce, a local
  // jitter, or the reshape pulse), fading back to yellow as it settles.
  var STABLE_RGB = [240, 205, 90];
  var CHANGE_RGB = [96, 40, 120];

  function lerp(a, b, t) { return a + (b - a) * t; }
  function rand(lo, hi) { return lo + Math.random() * (hi - lo); }
  function activityColor(t) {
    return Math.round(lerp(STABLE_RGB[0], CHANGE_RGB[0], t)) + ", " +
      Math.round(lerp(STABLE_RGB[1], CHANGE_RGB[1], t)) + ", " +
      Math.round(lerp(STABLE_RGB[2], CHANGE_RGB[2], t));
  }

  // Domain: an anisotropic, multi-lobed star shape. radiusMultiplier(theta)
  // gives the normalized boundary distance at angle theta in the shape's
  // own (unrotated, unstretched) frame; 1.0 is the base radius.
  function randomLobes() {
    var count = 2 + Math.floor(Math.random() * 2); // 2-3 harmonics
    var lobes = [];
    for (var i = 0; i < count; i++) {
      lobes.push({
        amp: rand(0.14, 0.34),
        freq: 2 + Math.floor(Math.random() * 4), // 2-5 lobes per harmonic
        phase: rand(0, Math.PI * 2)
      });
    }
    return lobes;
  }

  function createField() {
    var field = {
      nodes: [],
      edgeAlpha: {}, // "i-j" -> smoothed alpha, so links fade in/out instead of snapping
      shape: {
        cx: 0, cy: 0, baseR: 0,
        aspectX: 1, aspectY: 0.7,
        rot: 0, rotSpeed: rand(0.00006, 0.00014),
        lobes: randomLobes()
      },
      pulseAt: performance.now() + rand(9000, 16000)
    };

    field.seed = function (x0, x1, y0, y1) {
      field.x0 = x0; field.x1 = x1; field.y0 = y0; field.y1 = y1;
      field.shape.cx = (x0 + x1) / 2;
      field.shape.cy = (y0 + y1) / 2;
      field.shape.baseR = Math.min(x1 - x0, y1 - y0) * 0.46;
      field.shape.aspectX = (x1 - x0) / Math.min(x1 - x0, y1 - y0);
      field.shape.aspectY = (y1 - y0) / Math.min(x1 - x0, y1 - y0) * rand(0.55, 0.8);

      var area = (x1 - x0) * (y1 - y0);
      var n = Math.max(28, Math.floor(area / 6200));
      field.nodes = [];
      for (var i = 0; i < n; i++) {
        var a = Math.random() * Math.PI * 2;
        var r = Math.sqrt(Math.random()) * 0.9; // biased slightly inward of the boundary
        var w = fromShapeSpace(field.shape, Math.cos(a) * r, Math.sin(a) * r);
        var vx = (Math.random() - 0.5) * 0.16, vy = (Math.random() - 0.5) * 0.16;
        field.nodes.push({
          x: w.x,
          y: w.y,
          vx: vx,
          vy: vy,
          prevVx: vx,
          prevVy: vy,
          activity: 0,
          r: 0.8 + Math.random() * 2.6,
          phase: Math.random() * Math.PI * 2
        });
      }
      field.edgeAlpha = {};
      // Warm the edge/face topology up to its steady-state values immediately,
      // so the Euler characteristic starts near its usual resting point
      // instead of drifting there over the first few seconds on-screen.
      field.buildComplex(true);
    };

    field.radiusAt = function (theta) {
      var r = 1;
      field.shape.lobes.forEach(function (l) {
        r *= (1 + l.amp * Math.cos(l.freq * theta + l.phase));
      });
      return r;
    };

    field.step = function (now) {
      var shape = field.shape;
      shape.rot += shape.rotSpeed;

      if (now >= field.pulseAt) {
        // Sudden reshape: new harmonics and aspect land instantly, then the
        // usual smooth drift/rotation resumes on top of the new silhouette.
        shape.lobes = randomLobes();
        shape.aspectY = shape.aspectX * rand(0.55, 0.85);
        shape.rotSpeed = rand(-0.00014, 0.00014) || 0.00008;
        field.pulseAt = now + rand(14000, 30000);
      }

      field.nodes.forEach(function (n) {
        n.x += n.vx;
        n.y += n.vy;

        var s = toShapeSpace(shape, n.x, n.y);
        var theta = Math.atan2(s.uy, s.ux);
        var rho = Math.hypot(s.ux, s.uy);
        var limit = field.radiusAt(theta);
        if (rho > limit) {
          var scale = limit / rho;
          var w = fromShapeSpace(shape, s.ux * scale, s.uy * scale);
          n.x = w.x; n.y = w.y;
          n.vx *= -1; n.vy *= -1;
        }

        // Small, frequent local jitters — independent of the shared domain
        // shape — so individual nodes flicker "changing" often even while
        // the silhouette as a whole sits still between pulses.
        if (Math.random() < 0.02) {
          n.vx = Math.max(-0.22, Math.min(0.22, n.vx + (Math.random() - 0.5) * 0.16));
          n.vy = Math.max(-0.22, Math.min(0.22, n.vy + (Math.random() - 0.5) * 0.16));
        }

        // Activity flashes to 1 the instant a node's velocity changes (a
        // bounce, a local jitter, or a pulse reshaping the domain out from
        // under it), then decays back toward stable yellow as it resumes
        // drifting steadily.
        var changed = Math.hypot(n.vx - n.prevVx, n.vy - n.prevVy) > 0.05;
        n.activity = lerp(n.activity, changed ? 1 : 0, changed ? 0.6 : 0.02);
        n.prevVx = n.vx; n.prevVy = n.vy;
      });
    };

    // Builds the graph for this frame, smoothing each possible edge's
    // alpha toward 0 or 1 (in reach / not) rather than snapping, so
    // connections fade in and out over a few hundred ms instead of
    // popping instantly as points cross the link radius.
    field.buildComplex = function (warm) {
      var nodes = field.nodes, n = nodes.length;
      var adj = new Array(n);
      for (var i = 0; i < n; i++) adj[i] = [];
      var edges = [];
      var seen = {};
      var linkDist = 128;

      for (i = 0; i < n; i++) {
        for (var j = i + 1; j < n; j++) {
          var dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          var key = i + "-" + j;
          var target = dist < linkDist ? (1 - dist / linkDist) : 0;
          var current = field.edgeAlpha[key] || 0;
          current = lerp(current, target, warm ? 1 : 0.08);
          if (current < 0.003) { delete field.edgeAlpha[key]; continue; }
          field.edgeAlpha[key] = current;
          seen[key] = true;
          edges.push({ i: i, j: j, alpha: current });
          if (dist < linkDist) { adj[i].push(j); adj[j].push(i); }
        }
      }
      Object.keys(field.edgeAlpha).forEach(function (k) { if (!seen[k]) delete field.edgeAlpha[k]; });

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

    return field;
  }

  function toShapeSpace(shape, x, y) {
    var dx = x - shape.cx, dy = y - shape.cy;
    var cos = Math.cos(-shape.rot), sin = Math.sin(-shape.rot);
    var rx = dx * cos - dy * sin, ry = dx * sin + dy * cos;
    return { ux: rx / (shape.baseR * shape.aspectX), uy: ry / (shape.baseR * shape.aspectY) };
  }

  function fromShapeSpace(shape, ux, uy) {
    var rx = ux * shape.baseR * shape.aspectX, ry = uy * shape.baseR * shape.aspectY;
    var cos = Math.cos(shape.rot), sin = Math.sin(shape.rot);
    return { x: shape.cx + (rx * cos - ry * sin), y: shape.cy + (rx * sin + ry * cos) };
  }

  var field = createField();

  function resize() {
    W = container.clientWidth;
    H = container.clientHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = W + "px";
    canvas.style.height = H + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    field.seed(W * 0.04, W * 0.96, H * 0.1, H * 0.9);
  }

  function draw(now, complex) {
    complex.faces.forEach(function (f) {
      var a = field.nodes[f[0]], b = field.nodes[f[1]], c = field.nodes[f[2]];
      // Smaller, tighter triangles read as denser local structure, so give
      // them a touch more fill than large, loose ones — adds depth without
      // a uniform flat wash across every face.
      var area = Math.abs((b.x - a.x) * (c.y - a.y) - (c.x - a.x) * (b.y - a.y)) / 2;
      var fillT = Math.max(0.04, Math.min(0.12, 900 / (area + 900) * 0.12));
      var faceActivity = (a.activity + b.activity + c.activity) / 3;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.lineTo(c.x, c.y);
      ctx.closePath();
      ctx.fillStyle = "rgba(" + activityColor(faceActivity) + ", " + fillT.toFixed(3) + ")";
      ctx.fill();
    });

    complex.edges.forEach(function (e) {
      var a = field.nodes[e.i], b = field.nodes[e.j];
      var edgeActivity = (a.activity + b.activity) / 2;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.strokeStyle = "rgba(" + activityColor(edgeActivity) + ", " + (0.16 + 0.4 * e.alpha * e.alpha).toFixed(3) + ")";
      ctx.lineWidth = 1;
      ctx.stroke();
    });

    field.nodes.forEach(function (n) {
      var twinkle = 0.75 + 0.25 * Math.sin(now / 1600 + n.phase);
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(" + activityColor(n.activity) + ", " + (0.55 + 0.35 * n.activity).toFixed(3) + ")";
      ctx.globalAlpha = twinkle;
      ctx.fill();
      ctx.globalAlpha = 1;
    });

    var V = field.nodes.length, E = complex.edges.filter(function (e) { return e.alpha > 0.4; }).length, F = complex.faces.length;
    var chi = V - E + F;
    ctx.font = "11px " + MONO_FONT;
    ctx.textAlign = "right";
    ctx.fillStyle = "rgba(" + LABEL_COLOR + ", 0.65)";
    ctx.fillText("χ = V − E + F = " + chi, field.x1, field.y1 + H * 0.055);
  }

  function frame(now) {
    field.step(now);
    ctx.clearRect(0, 0, W, H);
    draw(now, field.buildComplex());
    if (!reduceMotion) requestAnimationFrame(frame);
  }

  window.addEventListener("resize", resize);
  resize();

  if (!reduceMotion) {
    requestAnimationFrame(frame);
  } else {
    ctx.clearRect(0, 0, W, H);
    draw(0, field.buildComplex());
  }
})();
