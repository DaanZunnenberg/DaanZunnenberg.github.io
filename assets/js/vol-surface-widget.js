(function () {
  // Abstract implied-volatility surface: a fixed isometric mesh (strike x
  // tenor x level) with an almost imperceptibly slow undulation — no live
  // data, no price feed, nothing crypto-flavored. Quantitative in subject,
  // static enough in motion to read as an institutional exhibit rather
  // than a live dashboard.
  var canvas = document.getElementById("vol-surface-canvas");
  if (!canvas) return;
  var container = canvas.parentElement;
  var ctx = canvas.getContext("2d");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var W, H;
  var COLS = 22;
  var ROWS = 13;

  var LINE_COLOR = "rgba(159, 176, 201, 0.32)";
  var LINE_COLOR_FAINT = "rgba(159, 176, 201, 0.14)";
  var FILL_BASE = [10, 15, 26];

  var running = false;
  var visible = true;
  var startTs = null;

  function resize() {
    W = container.clientWidth;
    H = container.clientHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = W + "px";
    canvas.style.height = H + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function heightAt(i, j, t) {
    var u = (i / (COLS - 1) - 0.5) * 2; // -1..1 across strikes
    var v = j / (ROWS - 1); // 0..1 across tenor
    var smile = 0.16 + 0.4 * u * u;
    var termDecay = 1 - 0.55 * v;
    var wobble = reduceMotion ? 0 : 0.02 * Math.sin(t * 0.00018 + i * 0.32 + j * 0.24);
    return (smile * termDecay + wobble) * 0.62;
  }

  function project(i, j, z) {
    var cellW = (W * 0.66) / COLS;
    var cellH = (H * 0.34) / ROWS;
    var originX = W * 0.5;
    var originY = H * 0.28;
    var x = originX + (i - j * 0.9) * (cellW * 0.5);
    var y = originY + (i * 0.42 + j) * (cellH * 0.62) - z * H * 0.42;
    return [x, y];
  }

  function draw(t) {
    ctx.clearRect(0, 0, W, H);

    var pts = [];
    for (var j = 0; j < ROWS; j++) {
      pts[j] = [];
      for (var i = 0; i < COLS; i++) {
        var z = heightAt(i, j, t);
        pts[j][i] = { p: project(i, j, z), z: z };
      }
    }

    // Filled cells first, shaded slightly lighter with height, so the
    // surface reads with depth without any bright highlight.
    for (var j2 = 0; j2 < ROWS - 1; j2++) {
      for (var i2 = 0; i2 < COLS - 1; i2++) {
        var a = pts[j2][i2], b = pts[j2][i2 + 1], c = pts[j2 + 1][i2 + 1], d = pts[j2 + 1][i2];
        var avgZ = (a.z + b.z + c.z + d.z) / 4;
        var shade = Math.min(1, Math.max(0, avgZ)) * 26;
        ctx.fillStyle = "rgba(" + (FILL_BASE[0] + shade) + "," + (FILL_BASE[1] + shade) + "," + (FILL_BASE[2] + shade) + ", 0.9)";
        ctx.beginPath();
        ctx.moveTo(a.p[0], a.p[1]);
        ctx.lineTo(b.p[0], b.p[1]);
        ctx.lineTo(c.p[0], c.p[1]);
        ctx.lineTo(d.p[0], d.p[1]);
        ctx.closePath();
        ctx.fill();
      }
    }

    // Wireframe on top: full lines along tenor (j), faint cross-lines along
    // strike (i) every couple of rows so it doesn't turn into a dense grid.
    for (var j3 = 0; j3 < ROWS; j3++) {
      ctx.strokeStyle = j3 % 2 === 0 ? LINE_COLOR : LINE_COLOR_FAINT;
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (var i3 = 0; i3 < COLS; i3++) {
        var pt = pts[j3][i3].p;
        if (i3 === 0) ctx.moveTo(pt[0], pt[1]); else ctx.lineTo(pt[0], pt[1]);
      }
      ctx.stroke();
    }
    for (var i4 = 0; i4 < COLS; i4 += 3) {
      ctx.strokeStyle = LINE_COLOR_FAINT;
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (var j4 = 0; j4 < ROWS; j4++) {
        var pt2 = pts[j4][i4].p;
        if (j4 === 0) ctx.moveTo(pt2[0], pt2[1]); else ctx.lineTo(pt2[0], pt2[1]);
      }
      ctx.stroke();
    }
  }

  function loop(ts) {
    if (!running) return;
    if (startTs == null) startTs = ts;
    draw(ts - startTs);
    requestAnimationFrame(loop);
  }

  function start() {
    if (running || !visible || document.hidden) return;
    running = true;
    if (reduceMotion) {
      draw(0);
      return;
    }
    requestAnimationFrame(loop);
  }

  function stop() {
    running = false;
  }

  window.addEventListener("resize", function () {
    resize();
    draw(startTs == null ? 0 : performance.now() - startTs);
  });
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) stop(); else start();
  });
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      visible = entries[entries.length - 1].isIntersecting;
      if (visible) start(); else stop();
    }).observe(canvas);
  }

  resize();
  draw(0);
  start();
})();
