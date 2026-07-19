(function () {
  var root = document.getElementById("research-terminal");
  if (!root) return;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var MAX_LINES = 40; // DOM nodes kept around; older ones are pruned, not just hidden

  // Static, hardcoded transcript fragments — never derived from user input,
  // never parsed as HTML. Every line is written with textContent, so there
  // is no injection surface even though the text looks like shell output.
  var SESSIONS = [
    [
      "$ pip install -e .",
      "Obtaining file:///Users/daan/FunctionalScale",
      "Collecting numpy>=1.24",
      "  Using cached numpy-1.26.4-cp311-cp311-macosx.whl (14.0 MB)",
      "Collecting scipy>=1.11",
      "  Downloading scipy-1.13.0-cp311-cp311-macosx.whl (30.3 MB)",
      "Collecting numba>=0.59",
      "  Downloading numba-0.59.1-cp311-cp311-macosx.whl (2.7 MB)",
      "Building wheel for funcgarch (pyproject.toml): started",
      "Building wheel for funcgarch (pyproject.toml): finished with status 'done'",
      "Successfully installed funcgarch-0.3.0 numba-0.59.1 numpy-1.26.4 scipy-1.13.0"
    ],
    [
      "$ python scripts/gas_vol_surface_container.py",
      "── Simulating data ──────────────────────────",
      "Return matrix shape : (25, 500)",
      "True sigma^2 range  : [2.00, 15.76]",
      "── Estimating diagonal GAS-GARCH ────────────",
      "Initial neg-log-lik: 64.9596",
      "  call   500 | neg-log-lik: 60.2607",
      "  call  1500 | neg-log-lik: 56.8845",
      "  call  3400 | neg-log-lik: 56.5583",
      "Final neg-log-lik: 56.5583 | converged: True | iters: 125",
      "[OK] nu_hat=50.000  delta_hat=0.00180"
    ],
    [
      "$ python -m pytest tests/ -q",
      "collecting ... collected 42 items",
      "tests/test_chaining_bound.py ..........          [ 24%]",
      "tests/test_majorizing_measure.py ........         [ 43%]",
      "tests/test_gas_filter.py ..............           [ 76%]",
      "tests/test_weak_convergence.py ..........         [100%]",
      "[OK] 42 passed in 8.31s"
    ],
    [
      "$ python -c \"import empirical_processes as ep\"",
      "[INFO] loading generic chaining bound utilities",
      "[INFO] constructing admissible sequence (A_n) via majorizing measure",
      "[INFO] gamma_2(T, d) <= L * sup_t E[sup_s |X_s - X_t|]",
      "[OK] chaining bound verified on 12 test metric spaces"
    ],
    [
      "$ latexmk -pdf chapters/generic_chaining.tex",
      "Latexmk: applying rule 'pdflatex'",
      "Rule 'pdflatex': the auxiliary file has been updated",
      "[INFO] 41 pages, 128 references resolved",
      "Latexmk: All targets (generic_chaining.pdf) are up-to-date"
    ],
    [
      "$ git log --oneline -5",
      "a49b4f1 redesign order-book hero, brighten research hero",
      "06b3409 add matching hero sections to research, experience, contact",
      "bbfb77f allow multiple project accordions open at once",
      "32c5775 tighten spacing between volatility surface subplots",
      "08e4178 use shared blue-red diverging palette for both surfaces"
    ],
    [
      "$ python fit_dependent_process.py --kernel ou --n 500",
      "[INFO] fitting Ornstein-Uhlenbeck covariance kernel",
      "[INFO] estimating dependence parameter delta via profile likelihood",
      "  iter  1 | delta=0.02000 | loglik=-812.44",
      "  iter 12 | delta=0.00184 | loglik=-611.02",
      "[OK] converged | delta_hat=0.00180 | se=0.00021"
    ]
  ];

  var order = [];
  var lastSession = -1;
  function nextSession() {
    if (!order.length) {
      order = SESSIONS.map(function (_, i) { return i; });
      for (var i = order.length - 1; i > 0; i--) {
        var j = (Math.random() * (i + 1)) | 0;
        var tmp = order[i]; order[i] = order[j]; order[j] = tmp;
      }
      if (order[0] === lastSession && order.length > 1) {
        order.push(order.shift());
      }
    }
    var idx = order.shift();
    lastSession = idx;
    return SESSIONS[idx];
  }

  function classify(line) {
    if (line.indexOf("$ ") === 0) return "term-prompt";
    if (line.indexOf("[OK]") === 0 || line.indexOf("Successfully") === 0) return "term-ok";
    if (line.indexOf("[INFO]") === 0) return "term-info";
    return "term-dim";
  }

  function prune() {
    while (root.children.length > MAX_LINES) {
      root.removeChild(root.firstChild);
    }
  }

  function appendLine(text) {
    var el = document.createElement("div");
    el.className = "hero-terminal-line " + classify(text);
    el.textContent = text; // never innerHTML — plain text node, no markup parsing
    root.appendChild(el);
    prune();
  }

  // Command lines are "typed" character by character, like someone actually
  // driving the shell, rather than just fading in with the rest of the
  // output — the one bit of extra flourish, kept to just the "$ " lines.
  function typeLine(text, cb) {
    var el = document.createElement("div");
    el.className = "hero-terminal-line term-typing term-prompt";
    var textNode = document.createTextNode("");
    el.appendChild(textNode);
    var cursor = document.createElement("span");
    cursor.className = "hero-terminal-cursor";
    el.appendChild(cursor);
    root.appendChild(el);
    prune();

    var i = 0;
    (function tick() {
      if (i < text.length) {
        textNode.data += text.charAt(i);
        i += 1;
        setTimeout(tick, 16 + Math.random() * 28);
      } else {
        cursor.remove();
        if (cb) cb();
      }
    })();
  }

  function idlePrompt(cb) {
    var el = document.createElement("div");
    el.className = "hero-terminal-line term-prompt term-typing";
    el.textContent = "$ ";
    var cursor = document.createElement("span");
    cursor.className = "hero-terminal-cursor";
    el.appendChild(cursor);
    root.appendChild(el);
    prune();
    setTimeout(function () {
      el.remove();
      cb();
    }, 900 + Math.random() * 700);
  }

  function playSession(lines, i) {
    if (i >= lines.length) {
      idlePrompt(function () { playSession(nextSession(), 0); });
      return;
    }
    var text = lines[i];
    if (text.indexOf("$ ") === 0) {
      typeLine(text, function () {
        setTimeout(function () { playSession(lines, i + 1); }, 180 + Math.random() * 160);
      });
      return;
    }
    appendLine(text);
    var delay = text.indexOf("  ") === 0 ? 55 + Math.random() * 70 : 220 + Math.random() * 260;
    setTimeout(function () { playSession(lines, i + 1); }, delay);
  }

  if (reduceMotion) {
    var session = nextSession();
    session.slice(0, 6).forEach(appendLine);
    return;
  }

  playSession(nextSession(), 0);
})();
