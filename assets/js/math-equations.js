(function () {
  var root = document.getElementById("math-hero");
  if (!root) return;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Real results and proof fragments (informally paraphrased, not verbatim
  // citations) from Talagrand's "The Generic Chaining" — partitioning
  // schemes, the gamma_2 functional, the majorizing measure and
  // decomposition theorems, growth conditions, the Bednorz-Latala theorem
  // for Bernoulli processes, and random Fourier series.
  //
  // Everything is rendered by calling katex.render(source, node, opts)
  // directly — for the display equation as a whole, and per \(...\) span
  // inside the prose sentences (see renderMixedProse below) — rather than
  // through the text-scanning auto-render helper. Every source string
  // here is a hardcoded literal handed to katex.render, and every
  // surrounding text fragment goes through textContent/createTextNode;
  // nothing is ever parsed as HTML, so there is no injection surface.
  //
  // \asymp is deliberately avoided throughout; two-sided bounds are always
  // spelled out as explicit inequalities with a universal constant L.
  var ITEMS = [
    {
      kind: "Definition — Partitioning Scheme",
      prose: "An admissible sequence is built from a partitioning scheme: a sequence of partitions of \\(T\\), each refining the last, with the \\(n\\)-th partition allowed at most \\(N_n = 2^{2^n}\\) pieces. \\(A_n(t)\\) denotes the piece containing \\(t\\).",
      tex: "|\\mathcal{A}_n| \\le N_n = 2^{2^n}, \\qquad A_{n+1}(t) \\subset A_n(t)"
    },
    {
      kind: "Proof sketch — building the partition",
      prose: "Fix \\(n\\) and suppose \\(A_n\\) has already been constructed. To pass to level \\(n+1\\), split each piece of \\(A_n\\) into at most \\(N_n\\) further pieces of at most half the diameter, using total boundedness; repeating this for every piece of \\(A_n\\) produces the refinement \\(A_{n+1}\\).",
      tex: "N_{n+1} = N_n^2, \\qquad \\operatorname{diam}\\big(A_{n+1}(t)\\big) \\le \\tfrac{1}{2}\\operatorname{diam}\\big(A_n(t)\\big)"
    },
    {
      kind: "Definition — The gamma_2 Functional",
      prose: "The \\(\\gamma_2\\) functional scores an admissible sequence by how quickly its pieces shrink: level \\(n\\) contributes its diameter weighted by the exponentially growing resolution \\(2^{n/2}\\), and the functional takes the best sequence achievable.",
      tex: "\\gamma_2(T,d) = \\inf_{(A_n)} \\sup_{t\\in T} \\sum_{n\\ge 0} 2^{n/2}\\, \\Delta(A_n(t))"
    },
    {
      kind: "Theorem — Majorizing Measures (Talagrand)",
      prose: "For every metric space there is a universal constant \\(L\\) such that \\(\\gamma_2\\) can always be certified from below by a single probability measure on \\(T\\), and that same measure never overstates the true chaining cost by more than a factor of \\(L\\).",
      tex: "\\frac{1}{L}\\,\\gamma_2(T,d) \\;\\le\\; \\sup_{t\\in T} \\int_0^{\\infty} \\sqrt{\\log \\frac{1}{\\mu(B(t,\\varepsilon))}}\\; d\\varepsilon \\;\\le\\; L\\,\\gamma_2(T,d)"
    },
    {
      kind: "Theorem — Decomposition",
      prose: "When a process has increments controlled jointly by two metrics \\(d_1\\) and \\(d_2\\), it splits into two pieces, each governed by a single metric on its own, so the total chaining cost never exceeds the sum of the two separate costs.",
      tex: "X_t = Y_t + Z_t, \\qquad \\mathbb{E}\\sup_{t\\in T} Y_t \\le L\\,\\gamma_2(T,d_1), \\quad \\mathbb{E}\\sup_{t\\in T} Z_t \\le L\\,\\gamma_1(T,d_2)"
    },
    {
      kind: "Proof sketch — decomposition",
      prose: "Split the increment at each level of the joint admissible sequence into whichever of \\(d_1\\), \\(d_2\\) dominates there. Summing the two resulting sub-series separately, instead of the single mixed series, yields the two independent chaining bounds.",
      tex: "\\Delta(A_n(t)) \\le \\Delta_1(A_n(t)) + \\Delta_2(A_n(t)) \\;\\Longrightarrow\\; \\sum_n 2^{n/2}\\Delta(A_n(t)) \\le \\sum_n 2^{n/2}\\Delta_1(A_n(t)) + \\sum_n 2^{n/2}\\Delta_2(A_n(t))"
    },
    {
      kind: "Growth Condition",
      prose: "A metric space satisfies a growth condition of order \\(\\alpha\\) when balls of radius \\(\\varepsilon\\) cannot contain too many \\(\\varepsilon\\)-separated points — a purely combinatorial condition that lets the chaining functional be estimated straight from volume, without building an admissible sequence by hand.",
      tex: "N\\big(B(t,\\varepsilon), d, \\varepsilon/2\\big) \\;\\le\\; \\exp\\!\\big(L\\,\\varepsilon^{-\\alpha}\\big)"
    },
    {
      kind: "Proof sketch — telescoping the chain",
      prose: "Write \\(X_t - X_{t_0}\\) as a telescoping sum of increments between successive approximations \\(\\pi_n(t)\\). Each increment is controlled individually by its sub-Gaussian tail; a union bound over the at most \\(N_n\\) increments at level \\(n\\), summed over all \\(n\\), recovers the full chaining bound.",
      tex: "X_t - X_{t_0} \\;=\\; \\sum_{n\\ge 1} \\Big( X_{\\pi_n(t)} - X_{\\pi_{n-1}(t)} \\Big)"
    },
    {
      kind: "Theorem — Bednorz & Latala",
      prose: "Resolving Talagrand's long-standing Bernoulli conjecture: for a Bernoulli process indexed by a subset of a vector space, the expected supremum is controlled, up to a universal constant, by splitting the index set into a part governed by the Euclidean metric and a part governed by the supremum metric.",
      tex: "\\mathbb{E}\\sup_{t\\in T} \\sum_i \\xi_i t_i \\;\\le\\; L \\inf_{T \\subset T_1+T_2} \\Big( \\gamma_1(T_1,\\ell^\\infty) + \\gamma_2(T_2,\\ell^2) \\Big)"
    },
    {
      kind: "Proposition — Random Fourier Series",
      prose: "A random trigonometric sum with independent symmetric coefficients stays almost surely bounded exactly when its frequencies satisfy the same entropy condition that governs generic chaining for the supremum metric on the circle.",
      tex: "\\mathbb{E}\\sup_{t} \\Big| \\sum_{i=1}^{n} \\xi_i a_i \\cos(k_i t) \\Big| \\;\\le\\; L \\int_0^{\\infty} \\sqrt{\\log N(K, d_\\infty, \\varepsilon)}\\; d\\varepsilon"
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
      order = ITEMS.map(function (_, i) { return i; });
      for (var i = order.length - 1; i > 0; i--) {
        var j = (Math.random() * (i + 1)) | 0;
        var tmp = order[i]; order[i] = order[j]; order[j] = tmp;
      }
      if (order[0] === lastIdx && order.length > 1) order.push(order.shift());
    }
    var idx = order.shift();
    lastIdx = idx;
    return ITEMS[idx];
  }

  function renderMath(source, node, displayMode) {
    try {
      window.katex.render(source, node, { displayMode: displayMode, throwOnError: false, strict: false });
    } catch (e) {
      // fail quietly — leave the node empty rather than showing raw TeX
    }
  }

  // Splits prose on \(...\) spans, appending plain text nodes for the
  // surrounding English and a katex-rendered <span> for each math span —
  // built node by node (textContent / createElement only), never innerHTML.
  var INLINE_MATH_RE = /\\\((.+?)\\\)/g;
  function renderMixedProse(container, text) {
    var re = new RegExp(INLINE_MATH_RE.source, "g");
    var lastIndex = 0, m;
    while ((m = re.exec(text))) {
      if (m.index > lastIndex) {
        container.appendChild(document.createTextNode(text.slice(lastIndex, m.index)));
      }
      var span = el("span", "hero-math-inline");
      renderMath(m[1], span, false);
      container.appendChild(span);
      lastIndex = re.lastIndex;
    }
    if (lastIndex < text.length) {
      container.appendChild(document.createTextNode(text.slice(lastIndex)));
    }
  }

  // Two nested wrappers: the outer one handles the enter/leave drift
  // (translate + fade, driven by is-active/is-leaving classes below), the
  // inner one runs a slow, continuous drift via a CSS keyframe animation —
  // together the slide actually flows rather than just fading in place.
  function renderSlide(item) {
    var wrap = el("div", "hero-math-eq");
    var floatBox = el("div", "hero-math-float");
    var kindEl = el("div", "hero-math-kind");
    kindEl.textContent = item.kind;
    var proseEl = el("p", "hero-math-prose");
    renderMixedProse(proseEl, item.prose);
    var eqBox = el("div", "hero-math-tex");
    renderMath(item.tex, eqBox, true);

    floatBox.appendChild(kindEl);
    floatBox.appendChild(proseEl);
    floatBox.appendChild(eqBox);
    wrap.appendChild(floatBox);
    root.appendChild(wrap);
    return wrap;
  }

  function waitForKatex(cb) {
    if (window.katex && typeof window.katex.render === "function") {
      cb();
      return;
    }
    setTimeout(function () { waitForKatex(cb); }, 60);
  }

  waitForKatex(function () {
    if (reduceMotion) {
      var slide = renderSlide(nextItem());
      slide.classList.add("is-active");
      return;
    }

    var current = null;
    function cycle() {
      var next = renderSlide(nextItem());
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
      setTimeout(cycle, 6200);
    }
    cycle();
  });
})();
