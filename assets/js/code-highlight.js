(function () {
  var blocks = document.querySelectorAll("pre.code-block code");
  if (!blocks.length) return;

  var KEYWORDS = "from|import|def|return|for|in|if|else|elif|class|as|with|while|not|and|or|None|True|False|print";
  var TOKEN_RE = new RegExp(
    "(#.*$)" +
    "|('(?:[^'\\\\]|\\\\.)*'|\"(?:[^\"\\\\]|\\\\.)*\")" +
    "|(\\b\\d+\\.?\\d*\\b)" +
    "|([A-Za-z_][A-Za-z0-9_]*)(?=\\()" +
    "|(\\b(?:" + KEYWORDS + ")\\b)",
    "gm"
  );

  function escapeHtml(s) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function highlight(src) {
    var out = "";
    var last = 0;
    var m;
    while ((m = TOKEN_RE.exec(src))) {
      out += escapeHtml(src.slice(last, m.index));
      if (m[1]) out += '<span class="tok-comment">' + escapeHtml(m[1]) + "</span>";
      else if (m[2]) out += '<span class="tok-string">' + escapeHtml(m[2]) + "</span>";
      else if (m[3]) out += '<span class="tok-number">' + escapeHtml(m[3]) + "</span>";
      else if (m[4]) out += '<span class="tok-func">' + escapeHtml(m[4]) + "</span>";
      else if (m[5]) out += '<span class="tok-keyword">' + escapeHtml(m[5]) + "</span>";
      last = TOKEN_RE.lastIndex;
    }
    out += escapeHtml(src.slice(last));
    return out;
  }

  blocks.forEach(function (block) {
    block.innerHTML = highlight(block.textContent);
  });
})();
