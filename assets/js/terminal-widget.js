(function () {
  var root = document.getElementById("research-terminal");
  if (!root) return;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var MAX_LINES = 44; // DOM nodes kept around; older ones are pruned, not just hidden
  var HOST = "research";
  var USER = "daan";

  // Static, hardcoded transcript fragments — never derived from user input,
  // never parsed as HTML. Every fragment is written with textContent onto
  // plain <span> elements, so there is no injection surface even though the
  // text looks like shell/log output.
  //
  // Kali-shell style: a two-line prompt (box-drawing + user@host), and
  // otherwise mostly monochrome output — color is reserved for warnings
  // and errors, not sprinkled across ordinary lines.
  var SESSIONS = [
    [
      "$ pip install -e .",
      "Obtaining file:///home/daan/FunctionalScale",
      "Collecting numpy>=1.24",
      "  Using cached numpy-1.26.4-cp311-cp311-linux_x86_64.whl (14.0 MB)",
      "Collecting scipy>=1.11",
      "  Downloading scipy-1.13.0-cp311-cp311-linux_x86_64.whl (30.3 MB)",
      "Collecting numba>=0.59",
      "  Downloading numba-0.59.1-cp311-cp311-linux_x86_64.whl (2.7 MB)",
      "Building wheel for funcgarch (pyproject.toml): started",
      "Building wheel for funcgarch (pyproject.toml): finished with status 'done'",
      "[OK] installed funcgarch-0.3.0 numba-0.59.1 numpy-1.26.4 scipy-1.13.0"
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
      "[WARN] 2 undefined citations, rerun after updating bibliography",
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
    ],
    [
      "$ python check_moment_bounds.py --process fbm --hurst 0.35",
      "[INFO] simulating fractional Brownian motion, H=0.35, n=2000 paths",
      "[INFO] estimating E[sup_t |X_t|^p] via empirical maxima",
      "[INFO] comparing against Dudley entropy integral bound",
      "[WARN] empirical/bound ratio 0.81 — bound not tight at this sample size",
      "[OK] moment check complete"
    ],
    [
      "$ df -h ~/data",
      "Filesystem       Size  Used Avail Use%",
      "/dev/nvme0n1p2   238G  142G   84G  63%",
      "$ free -h",
      "               total    used    free   shared",
      "Mem:            32Gi    11Gi    14Gi   1.2Gi"
    ],
    [
      "$ git status",
      "On branch main",
      "nothing to commit, working tree clean"
    ],
    [
      "$ python -c \"import scipy; print(scipy.__version__)\"",
      "1.13.0"
    ],
    [
      "$ wc -l funcgarch/*.py",
      "  312 funcgarch/gas.py",
      "  289 funcgarch/garch.py",
      "   94 funcgarch/basis.py",
      "  695 total"
    ],
    [
      "$ python scripts/taq_cleaner.py --date 2025-06-02",
      "[INFO] loading raw TAQ CSV (18.4M rows)",
      "[INFO] filtering to regular trading hours (09:30-16:00)",
      "[INFO] removing trades flagged as corrected/cancelled",
      "[INFO] removing trades outside NBBO by > 5 sigma",
      "[INFO] aligning trades to 25-point intraday grid",
      "[INFO] computing log-returns per grid point",
      "  grid point  1/25 done",
      "  grid point 13/25 done",
      "  grid point 25/25 done",
      "[INFO] writing (25, 500) return matrix to returns.npy",
      "[WARN] 3 trading days had > 10% missing grid points, flagged for review",
      "[OK] pipeline complete, 497/500 days usable"
    ],
    [
      "$ python scripts/simulation_study.py --reps 500 --n 200",
      "[INFO] running Monte Carlo simulation study",
      "  rep   50/500 | rejection rate so far: 0.048",
      "  rep  100/500 | rejection rate so far: 0.051",
      "  rep  200/500 | rejection rate so far: 0.049",
      "  rep  300/500 | rejection rate so far: 0.052",
      "  rep  400/500 | rejection rate so far: 0.050",
      "  rep  500/500 | rejection rate so far: 0.049",
      "[INFO] empirical size at nominal 5%: 0.049 (500 reps)",
      "[INFO] power under H1 (delta=0.5): 0.812",
      "[OK] simulation study complete, results written to sim_results.csv"
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

  // A fake but steadily-advancing clock, journalctl-style, rather than a
  // real timestamp — purely decorative.
  var clockMs = Date.now();
  function tick() {
    clockMs += 1200 + Math.random() * 2800;
    var d = new Date(clockMs);
    function pad(n) { return (n < 10 ? "0" : "") + n; }
    return pad(d.getHours()) + ":" + pad(d.getMinutes()) + ":" + pad(d.getSeconds());
  }

  function prune() {
    while (root.children.length > MAX_LINES) {
      root.removeChild(root.firstChild);
    }
  }

  function span(text, cls) {
    var el = document.createElement("span");
    if (cls) el.className = cls;
    el.textContent = text; // never innerHTML — plain text node, no markup parsing
    return el;
  }

  function appendRow(children, extraCls) {
    var el = document.createElement("div");
    el.className = "hero-terminal-line" + (extraCls ? " " + extraCls : "");
    children.forEach(function (c) { el.appendChild(c); });
    root.appendChild(el);
    prune();
    return el;
  }

  // Ordinary output line: gray timestamp, then an optional [TAG] (colored
  // only for WARN/ERR), then the message in the default muted color.
  function appendOutputLine(text) {
    var tagMatch = text.match(/^\[(INFO|OK|WARN|ERR)\]\s*/);
    var children = [span(tick() + "  ", "term-time")];
    if (tagMatch) {
      var level = tagMatch[1];
      var tagCls = level === "WARN" ? "term-warn" : level === "ERR" ? "term-err" : "term-tag";
      children.push(span("[" + level + "] ", tagCls));
      text = text.slice(tagMatch[0].length);
    }
    children.push(span(text));
    appendRow(children);
  }

  // Two-line Kali-style prompt. First line is the box/user/host frame,
  // second line types out the command character by character.
  function typePrompt(cmd, cb) {
    appendRow([
      span("┌──(", "term-box"),
      span(USER, "term-user"),
      span("㉿" + HOST + ")-[~]", "term-box")
    ]);

    var textNode = document.createTextNode("");
    var cursor = document.createElement("span");
    cursor.className = "hero-terminal-cursor";
    var el = appendRow([span("└─$ ", "term-box")], "term-typing");
    el.appendChild(textNode);
    el.appendChild(cursor);

    var i = 0;
    (function step() {
      if (i < cmd.length) {
        textNode.data += cmd.charAt(i);
        i += 1;
        setTimeout(step, 16 + Math.random() * 28);
      } else {
        cursor.remove();
        if (cb) cb();
      }
    })();
  }

  function idlePrompt(cb) {
    appendRow([
      span("┌──(", "term-box"),
      span(USER, "term-user"),
      span("㉿" + HOST + ")-[~]", "term-box")
    ]);
    var el = appendRow([span("└─$ ", "term-box")], "term-typing");
    var cursor = document.createElement("span");
    cursor.className = "hero-terminal-cursor";
    el.appendChild(cursor);
    setTimeout(function () {
      el.previousSibling && el.previousSibling.remove();
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
      typePrompt(text.slice(2), function () {
        setTimeout(function () { playSession(lines, i + 1); }, 180 + Math.random() * 160);
      });
      return;
    }
    appendOutputLine(text);
    var delay = text.indexOf("  ") === 0 ? 55 + Math.random() * 70 : 220 + Math.random() * 260;
    setTimeout(function () { playSession(lines, i + 1); }, delay);
  }

  if (reduceMotion) {
    var session = nextSession();
    session.slice(0, 6).forEach(function (line) {
      if (line.indexOf("$ ") === 0) {
        appendRow([span("┌──(", "term-box"), span(USER, "term-user"), span("㉿" + HOST + ")-[~]", "term-box")]);
        appendRow([span("└─$ ", "term-box"), span(line.slice(2))]);
      } else {
        appendOutputLine(line);
      }
    });
    return;
  }

  playSession(nextSession(), 0);
})();
