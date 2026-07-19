(function () {
  var root = document.getElementById("math-hero");
  if (!root) return;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Real results from generic chaining theory (Talagrand, "The Generic
  // Chaining", and the classical entropy-integral results it supersedes),
  // matching the theory this page is actually about. Rendered with KaTeX —
  // set via textContent as raw LaTeX source, then handed to
  // renderMathInElement (the same call the rest of the site already uses),
  // never innerHTML, so there is no injection surface even though the
  // strings contain backslashes and braces.
  var EQUATIONS = [
    {
      tex: "\\[ \\gamma_2(T,d) \\;=\\; \\inf_{(A_n)} \\; \\sup_{t \\in T} \\; \\sum_{n \\ge 0} 2^{n/2}\\, \\Delta(A_n(t)) \\]",
      label: "γ₂ functional — infimum over admissible sequences (Aₙ)"
    },
    {
      tex: "\\[ \\gamma_2(T,d) \\;\\asymp\\; \\sup_{t \\in T} \\int_0^{\\infty} \\sqrt{\\log \\frac{1}{\\mu(B(t,\\varepsilon))}} \\; d\\varepsilon \\]",
      label: "majorizing measure theorem — Talagrand (1987, 1996)"
    },
    {
      tex: "\\[ \\frac{1}{L}\\, \\gamma_2(T,d) \\;\\le\\; \\mathbb{E} \\sup_{t \\in T} X_t \\;\\le\\; L\\, \\gamma_2(T,d) \\]",
      label: "Talagrand's theorem — comparison for Gaussian processes"
    },
    {
      tex: "\\[ \\mathbb{E} \\sup_{t \\in T} X_t \\;\\le\\; L \\int_0^{\\infty} \\sqrt{\\log N(T,d,\\varepsilon)} \\; d\\varepsilon \\]",
      label: "Dudley's entropy integral bound"
    },
    {
      tex: "\\[ N(T,d,\\varepsilon) \\;=\\; \\min \\Big\\{ n : T \\subset \\bigcup_{i=1}^{n} B(t_i,\\varepsilon) \\Big\\} \\]",
      label: "covering number N(T, d, ε)"
    },
    {
      tex: "\\[ \\mathbb{P}\\Big( \\sup_{t \\in T} |X_s - X_t| \\ge u \\, d(s,t) \\Big) \\;\\le\\; \\exp\\!\\Big(-\\frac{u^2}{2}\\Big) \\]",
      label: "sub-Gaussian increment condition"
    }
  ];

  function el(tag, cls) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    return e;
  }

  var order = [];
  var lastIdx = -1;
  function nextEq() {
    if (!order.length) {
      order = EQUATIONS.map(function (_, i) { return i; });
      for (var i = order.length - 1; i > 0; i--) {
        var j = (Math.random() * (i + 1)) | 0;
        var tmp = order[i]; order[i] = order[j]; order[j] = tmp;
      }
      if (order[0] === lastIdx && order.length > 1) order.push(order.shift());
    }
    var idx = order.shift();
    lastIdx = idx;
    return EQUATIONS[idx];
  }

  function renderSlide(item, renderFn) {
    var wrap = el("div", "hero-math-eq");
    var eqBox = el("div", "hero-math-tex");
    eqBox.textContent = item.tex; // plain text node — no HTML parsing of the source
    var label = el("div", "hero-math-label");
    label.textContent = item.label;
    wrap.appendChild(eqBox);
    wrap.appendChild(label);
    root.appendChild(wrap);
    renderFn(eqBox);
    return wrap;
  }

  function waitForKatex(cb) {
    if (window.renderMathInElement) {
      cb();
      return;
    }
    setTimeout(function () { waitForKatex(cb); }, 80);
  }

  waitForKatex(function () {
    var renderOpts = {
      delimiters: [
        { left: "$$", right: "$$", display: true },
        { left: "\\[", right: "\\]", display: true },
        { left: "\\(", right: "\\)", display: false }
      ]
    };
    var renderFn = function (node) { window.renderMathInElement(node, renderOpts); };

    if (reduceMotion) {
      var slide = renderSlide(nextEq(), renderFn);
      slide.classList.add("is-active");
      return;
    }

    var current = null;
    function cycle() {
      var next = renderSlide(nextEq(), renderFn);
      requestAnimationFrame(function () {
        next.classList.add("is-active");
      });
      var prev = current;
      current = next;
      if (prev) {
        prev.classList.remove("is-active");
        setTimeout(function () { prev.remove(); }, 950);
      }
      setTimeout(cycle, 4200);
    }
    cycle();
  });
})();
