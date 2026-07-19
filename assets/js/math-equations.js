(function () {
  var root = document.getElementById("math-hero");
  if (!root) return;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Real results (informally paraphrased, not verbatim citations) from
  // Talagrand's "The Generic Chaining" — partitioning schemes, the gamma_2
  // functional, the majorizing measure and decomposition theorems, the
  // Bednorz-Latala theorem for Bernoulli processes, and random Fourier
  // series — rendered with KaTeX. Set via textContent as raw LaTeX/plain
  // text, then handed to renderMathInElement (the same call the rest of
  // the site already uses), never innerHTML, so there is no injection
  // surface even though the strings contain backslashes and braces.
  //
  // \asymp is deliberately avoided throughout; two-sided bounds are always
  // spelled out as explicit inequalities with a universal constant L.
  var EQUATIONS = [
    {
      kind: "Definition — Partitioning Scheme",
      prose: "An admissible sequence is built from a partitioning scheme: a sequence of partitions of T, each refining the last, with the n-th partition allowed at most N_n = 2^(2^n) pieces. Writing A_n(t) for the piece containing t pins down a nested chain of neighborhoods shrinking around every point at once.",
      tex: "\\[ |\\mathcal{A}_n| \\le N_n = 2^{2^n}, \\qquad A_{n+1}(t) \\subset A_n(t) \\]"
    },
    {
      kind: "Definition — The gamma_2 Functional",
      prose: "The gamma_2 functional scores an admissible sequence by how quickly its pieces shrink: each level n contributes its diameter weighted by the exponentially growing resolution 2^(n/2), and the functional takes the best sequence achievable.",
      tex: "\\[ \\gamma_2(T,d) = \\inf_{(A_n)} \\sup_{t\\in T} \\sum_{n\\ge 0} 2^{n/2}\\, \\Delta(A_n(t)) \\]"
    },
    {
      kind: "Theorem — Majorizing Measures (Talagrand)",
      prose: "For every metric space there is a universal constant L such that the gamma_2 functional can always be certified from below by a single probability measure on T, and that same measure never overstates the true chaining cost by more than a factor of L.",
      tex: "\\[ \\frac{1}{L}\\,\\gamma_2(T,d) \\;\\le\\; \\sup_{t\\in T} \\int_0^{\\infty} \\sqrt{\\log \\frac{1}{\\mu(B(t,\\varepsilon))}}\\; d\\varepsilon \\;\\le\\; L\\,\\gamma_2(T,d) \\]"
    },
    {
      kind: "Theorem — Decomposition",
      prose: "When a process has increments controlled jointly by two different metrics, it can be split into two pieces, each governed by a single metric on its own, in such a way that the total chaining cost never exceeds the sum of the two separate costs.",
      tex: "\\[ X_t = Y_t + Z_t, \\qquad \\mathbb{E}\\sup_{t\\in T} Y_t \\le L\\,\\gamma_2(T,d_1), \\quad \\mathbb{E}\\sup_{t\\in T} Z_t \\le L\\,\\gamma_1(T,d_2) \\]"
    },
    {
      kind: "Theorem — Bednorz & Latala",
      prose: "Resolving Talagrand's long-standing Bernoulli conjecture: for a Bernoulli process indexed by a subset of a vector space, the expected supremum is controlled, up to a universal constant, by splitting the index set into a part governed by the Euclidean metric and a part governed by the supremum metric.",
      tex: "\\[ \\mathbb{E}\\sup_{t\\in T} \\sum_i \\xi_i t_i \\;\\le\\; L \\inf_{T \\subset T_1+T_2} \\Big( \\gamma_1(T_1,\\ell^\\infty) + \\gamma_2(T_2,\\ell^2) \\Big) \\]"
    },
    {
      kind: "Proposition — Random Fourier Series",
      prose: "A random trigonometric sum with independent symmetric coefficients stays almost surely bounded exactly when its frequencies satisfy the same entropy condition that governs generic chaining for the supremum metric on the circle.",
      tex: "\\[ \\mathbb{E}\\sup_{t} \\Big| \\sum_{i=1}^{n} \\xi_i a_i \\cos(k_i t) \\Big| \\;\\le\\; L \\int_0^{\\infty} \\sqrt{\\log N(K, d_\\infty, \\varepsilon)}\\; d\\varepsilon \\]"
    }
  ];

  function el(tag, cls) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    return e;
  }

  var order = [];
  var lastIdx = -1;
  function nextItem() {
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

  // Two nested wrappers: the outer one handles the enter/leave drift
  // (translate + fade, driven by is-active/is-leaving classes below), the
  // inner one runs a slow, continuous bob via a CSS keyframe animation —
  // together the slide actually floats rather than just fading in place.
  function renderSlide(item, renderFn) {
    var wrap = el("div", "hero-math-eq");
    var floatBox = el("div", "hero-math-float");
    var kindEl = el("div", "hero-math-kind");
    kindEl.textContent = item.kind;
    var proseEl = el("p", "hero-math-prose");
    proseEl.textContent = item.prose;
    var eqBox = el("div", "hero-math-tex");
    eqBox.textContent = item.tex; // plain text node — no HTML parsing of the source

    floatBox.appendChild(kindEl);
    floatBox.appendChild(proseEl);
    floatBox.appendChild(eqBox);
    wrap.appendChild(floatBox);
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
      var slide = renderSlide(nextItem(), renderFn);
      slide.classList.add("is-active");
      return;
    }

    var current = null;
    function cycle() {
      var next = renderSlide(nextItem(), renderFn);
      requestAnimationFrame(function () {
        next.classList.add("is-active");
      });
      var prev = current;
      current = next;
      if (prev) {
        prev.classList.remove("is-active");
        prev.classList.add("is-leaving");
        setTimeout(function () { prev.remove(); }, 1300);
      }
      setTimeout(cycle, 7200);
    }
    cycle();
  });
})();
