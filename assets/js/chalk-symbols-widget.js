(function () {
  // Slow-drifting field of math symbols, like chalk dust off a blackboard —
  // used on the more informal academic pages (schools, notes, contact)
  // rather than anything data-driven.
  var canvas = document.getElementById("chalk-symbols-canvas");
  if (!canvas) return;
  var container = canvas.parentElement;
  var ctx = canvas.getContext("2d");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var W, H;
  var SYMBOLS = ["∑", "∫", "ε", "δ", "ℙ", "∞", "√", "π", "∂", "σ", "⊆", "⸨"];
  var COUNT = 22;
  var COLOR = "rgba(233, 236, 243, 0.5)";
  var particles = [];
  var lastTs = null;
  var running = false;
  var visible = true;

  function resize() {
    W = container.clientWidth;
    H = container.clientHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = W + "px";
    canvas.style.height = H + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function spawn(fromBottom) {
    return {
      x: Math.random() * W,
      y: fromBottom ? H + 20 : Math.random() * H,
      vy: -(0.012 + Math.random() * 0.02),
      vx: (Math.random() - 0.5) * 0.012,
      size: 14 + Math.random() * 20,
      symbol: SYMBOLS[(Math.random() * SYMBOLS.length) | 0],
      phase: Math.random() * Math.PI * 2,
      baseAlpha: 0.25 + Math.random() * 0.4
    };
  }

  function seed() {
    particles = [];
    for (var i = 0; i < COUNT; i++) particles.push(spawn(false));
  }

  function step(now) {
    var dt = lastTs == null ? 16 : Math.min(now - lastTs, 64);
    lastTs = now;

    ctx.clearRect(0, 0, W, H);

    particles.forEach(function (p, i) {
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      if (p.y < -30) particles[i] = spawn(true);

      var flicker = 0.75 + 0.25 * Math.sin(now / 900 + p.phase);
      ctx.font = p.size + "px 'IBM Plex Serif', 'Iowan Old Style', Georgia, serif";
      ctx.fillStyle = COLOR;
      ctx.globalAlpha = p.baseAlpha * flicker;
      ctx.fillText(p.symbol, p.x, p.y);
      ctx.globalAlpha = 1;
    });
  }

  function loop(ts) {
    if (!running) return;
    step(ts || performance.now());
    requestAnimationFrame(loop);
  }

  function start() {
    if (reduceMotion || running || !visible || document.hidden) return;
    running = true;
    lastTs = null;
    requestAnimationFrame(loop);
  }

  function stop() {
    running = false;
  }

  window.addEventListener("resize", function () {
    resize();
    seed();
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
  seed();

  if (!reduceMotion) start();
  else step(performance.now());
})();
