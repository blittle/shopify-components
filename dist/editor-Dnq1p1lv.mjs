var j = {}, U = Symbol(), _ = Symbol(), oe = (e) => typeof e == "string" ? w[e] : e, w = {
  plain: j,
  plaintext: j,
  text: j,
  txt: j
}, de = (e, t) => (t[_] || he)(e, t), he = (e, t) => {
  for (var i = [e], s, r = [], c = 0; s = oe(t[U]); )
    delete t[U], Object.assign(t, s);
  for (ue(e, t, i, 0); r[c++] = i[0], i = i[1]; )
    ;
  return r;
}, ie = "</span>", F = "", q = "", ce = (e) => {
  for (var t = "", i = e.length, s = 0; s < i; )
    t += pe(e[s++]);
  return t;
}, pe = (e) => {
  if (e instanceof B) {
    var { type: t, alias: i, content: s } = e, r = F, c = q, p = `<span class="token ${t + (i ? " " + i : "") + (t == "keyword" && typeof s == "string" ? " keyword-" + s : "")}">`;
    q += ie, F += p;
    var o = pe(s);
    return F = r, q = c, p + o + ie;
  }
  return typeof e != "string" ? ce(e) : (e = e.replace(/&/g, "&amp;").replace(/</g, "&lt;"), q && e.includes(`
`) ? e.replace(/\n/g, q + `
` + F) : e);
}, ue = (e, t, i, s, r) => {
  for (var c in t)
    if (t[c])
      for (var p = 0, o = t[c], W = Array.isArray(o) ? o : [o]; p < W.length; ++p) {
        if (r && r[0] == c && r[1] == p)
          return;
        for (var E = W[p], A = E.pattern || E, L = oe(E.inside), k = E.lookbehind, $ = E.greedy && A.global, M = E.alias, d = i, f = s; d && (!r || f < r[2]); f += d[0].length, d = d[1]) {
          var m = d[0], O = 0, l, v;
          if (!(m instanceof B)) {
            if (A.lastIndex = $ ? f : 0, l = A.exec($ ? e : m), l && k && l[1] && (v = l[1].length, l.index += v, l[0] = l[0].slice(v)), $) {
              if (!l)
                break;
              if (l[0]) {
                for (var h = l.index, G = h + l[0].length, S; h >= f + (S = d[0].length); d = d[1], f += S)
                  ;
                if (d[0] instanceof B)
                  continue;
                for (var H = d, o = f; (o += H[0].length) < G; H = H[1], O++)
                  ;
                m = e.slice(f, o), l.index -= f;
              }
            }
            if (l && l[0]) {
              for (var h = l.index, D = l[0], C = m.slice(h + D.length), b = f + m.length, z = new B(c, L ? de(D, L) : D, D, M), g = d, K = 0, I; g = g[1], K++ < O; )
                ;
              C && (!g || g[0] instanceof B ? g = [C, g] : g[0] = C + g[0]), f += h, d[0] = h ? m.slice(0, h) : z, h ? d = d[1] = [z, g] : d[1] = g, O && (ue(e, t, d, f, I = [c, p, b]), b = I[2]), r && b > r[2] && (r[2] = b);
            }
          }
        }
      }
};
function B(e, t, i, s) {
  this.type = e, this.content = t, this.alias = s, this.length = i.length;
}
const ye = (e, t, ...i) => {
  var te;
  let s, r, c = [], p, o = "", W, E = !1, A = !1, L = !0, k = [], $, M = 0;
  const d = Ae(), f = d.firstChild, m = f.children, O = m[0], l = O.firstChild, v = { language: "text", value: o }, G = new Set(i), S = {}, H = (n) => {
    if (Object.assign(v, n), o = n.value ?? o, s = v.language, !w[s])
      throw Error(`Language '${s}' has no grammar.`);
    $ = !!v.readOnly, d.style.tabSize = v.tabSize || 2, l.inputMode = $ ? "none" : "", l.setAttribute("aria-readonly", $), C(), D(), (r != (r = w[s]) || o != l.value) && (K(), l.value = o, l.selectionEnd = 0, h());
  }, h = () => {
    k = de(o = l.value, r), I("tokenize", k, s, o);
    let n = ce(k).split(`
`), a = 0, u = M, T = M = n.length;
    for (; n[a] == c[a] && a < T; )
      ++a;
    for (; T && n[--T] == c[--u]; )
      ;
    if (a == T && a == u)
      m[a + 1].innerHTML = n[a] + `
`;
    else {
      let R = u < a ? u : a - 1, x = R, V = "";
      for (; x < T; )
        V += `<div class=pce-line aria-hidden=true>${n[++x]}
</div>`;
      for (x = T < a ? T : a - 1; x < u; x++)
        m[a + 1].remove();
      for (V && m[R + 1].insertAdjacentHTML("afterend", V), x = R + 1; x < M; )
        m[++x].setAttribute("data-line", x);
      d.style.setProperty(
        "--number-width",
        Math.ceil(Math.log10(M + 1)) + ".001ch"
      );
    }
    I("update", o), Q(!0), L && setTimeout(setTimeout, 0, () => L = !0), c = n, L = !1;
  }, D = (n) => {
    (n || G).forEach((a) => {
      typeof a == "object" ? (a.update(y, v), n && G.add(a)) : (a(y, v), n || G.delete(a));
    });
  }, C = ([n, a] = b()) => {
    d.className = `prism-code-editor language-${s}${v.lineNumbers == !1 ? "" : " show-line-numbers"} pce-${v.wordWrap ? "" : "no"}wrap${v.rtl ? " pce-rtl" : ""} pce-${n < a ? "has" : "no"}-selection${A ? " pce-focus" : ""}${$ ? " pce-readonly" : ""}`;
  }, b = () => [
    l.selectionStart,
    l.selectionEnd,
    l.selectionDirection
  ], z = {
    Escape() {
      l.blur();
    }
  }, g = {}, K = () => Te && !A && P(
    y,
    "focus",
    (n) => {
      let a = n.relatedTarget;
      a ? a.focus() : l.blur();
    },
    { once: !0 }
  ), I = (n, ...a) => {
    var u, T;
    (u = S[n]) == null || u.forEach((R) => R.apply(y, a)), (T = v["on" + n[0].toUpperCase() + n.slice(1)]) == null || T.apply(y, a);
  }, Q = (n) => {
    if (n || L) {
      const a = b(), u = m[W = Ee(o, 0, a[a[2] < "f" ? 0 : 1])];
      u != p && (p == null || p.classList.remove("active-line"), u.classList.add("active-line"), p = u), C(a), I("selectionChange", a, o);
    }
  }, y = {
    scrollContainer: d,
    wrapper: f,
    overlays: O,
    textarea: l,
    get activeLine() {
      return p;
    },
    get activeLineNumber() {
      return W;
    },
    get value() {
      return o;
    },
    options: v,
    get focused() {
      return A;
    },
    get removed() {
      return E;
    },
    get tokens() {
      return k;
    },
    inputCommandMap: g,
    keyCommandMap: z,
    extensions: {},
    setOptions: H,
    update: h,
    getSelection: b,
    setSelection(n, a = n, u) {
      K(), l.setSelectionRange(n, a, u), Q(!0);
    },
    addExtensions(...n) {
      D(n);
    },
    addListener(n, a) {
      (S[n] || (S[n] = /* @__PURE__ */ new Set())).add(a);
    },
    removeListener(n, a) {
      var u;
      (u = S[n]) == null || u.delete(a);
    },
    remove() {
      d.remove(), E = !0;
    }
  };
  return P(y, "keydown", (n) => {
    var a;
    (a = z[n.key]) != null && a.call(z, n, b(), o) && X(n);
  }), P(y, "beforeinput", (n) => {
    var a;
    ($ || n.inputType == "insertText" && ((a = g[n.data]) != null && a.call(g, n, b(), o))) && X(n);
  }), P(y, "input", h), P(y, "blur", () => {
    Y = null, A = !1, C();
  }), P(y, "focus", () => {
    Y = Q, A = !0, C();
  }), P(y, "selectionchange", (n) => {
    Q(), X(n);
  }), (te = ve(e)) == null || te.append(d), y;
}, ne = /* @__PURE__ */ document.createElement("div"), we = (e) => {
  ne.innerHTML = e;
  const t = ne.firstChild;
  return () => t.cloneNode(!0);
}, P = (e, t, i, s) => e.textarea.addEventListener(t, i, s), ve = (e) => typeof e == "string" ? document.querySelector(e) : e, ge = navigator.userAgent, Me = /Mac|iPhone|iPod|iPad/i.test(navigator.platform), be = /Chrome\//.test(ge), Te = !be && /AppleWebKit\//.test(ge), Ee = (e, t = 0, i = 1 / 0) => {
  let s = 1;
  for (; (t = e.indexOf(`
`, t) + 1) && t <= i; s++)
    ;
  return s;
}, Oe = {}, Ae = /* @__PURE__ */ we(
  "<div><div class=pce-wrapper><div class=pce-overlays><textarea spellcheck=false autocapitalize=off autocomplete=off>"
), X = (e) => {
  e.preventDefault(), e.stopImmediatePropagation();
};
let Y;
document.addEventListener("selectionchange", () => Y == null ? void 0 : Y());
const Z = /* @__PURE__ */ Object.assign({ "./atom-one-dark.css": () => import("./atom-one-dark-Bp9oDGI-.mjs"), "./dracula.css": () => import("./dracula-_0zFogoU.mjs"), "./github-dark-dimmed.css": () => import("./github-dark-dimmed-DCRfTfBe.mjs"), "./github-dark.css": () => import("./github-dark-D265eVYF.mjs"), "./github-light.css": () => import("./github-light-BtEuE7NG.mjs"), "./night-owl.css": () => import("./night-owl-EBGmqg49.mjs"), "./prism-okaidia.css": () => import("./prism-okaidia-DRSkOZLP.mjs"), "./prism-solarized-light.css": () => import("./prism-solarized-light-B6jCbo7l.mjs"), "./prism-tomorrow.css": () => import("./prism-tomorrow-C-lNPfrz.mjs"), "./prism-twilight.css": () => import("./prism-twilight-2zxFPsi0.mjs"), "./prism.css": () => import("./prism-6F6wFRi--BEh9mRHS.mjs"), "./vs-code-dark.css": () => import("./vs-code-dark-Ck-wRyqI-DCn6tx_y.mjs"), "./vs-code-light.css": () => import("./vs-code-light-CWhVSaDu.mjs") }), $e = async (e) => {
  var t, i;
  return (i = await ((t = Z[`./${e}.css`]) == null ? void 0 : t.call(Z))) == null ? void 0 : i.default;
}, ae = (e, t, i) => {
  const s = document.createElement("style");
  s.textContent = t, i && (s.id = i), e.append(s);
}, xe = (e, t, i) => {
  const s = ve(e), r = s.shadowRoot || s.attachShadow({ mode: "open" }), c = ye();
  return Promise.all([import("./styles-BkdUywD_-Xt8EAhnp.mjs"), $e(t.theme)]).then(([p, o]) => {
    c.removed || (ae(r, p.default), ae(r, o || "", "theme"), r.append(c.scrollContainer), c.setOptions(t), i && i());
  }), c;
}, Ce = (e, t, i) => {
  import("./common-DCv-f2YW-0iobTbiI.mjs").then((r) => {
    s.addExtensions(...r.common());
  });
  const s = xe(e, t, i);
  return s;
};
var J = (e, t) => {
  if (t.has(e))
    return t.get(e);
  var i = e, s = De.call(e).slice(8, -1);
  if (s == "Object") {
    t.set(e, i = {});
    for (var r in e)
      i[r] = J(e[r], t);
    e[U] && (i[U] = J(e[U], t)), e[_] && (i[_] = e[_]);
  } else if (s == "Array") {
    t.set(e, i = []);
    for (var c = 0, p = e.length; c < p; c++)
      i[c] = J(e[c], t);
  }
  return i;
}, Le = (e) => J(e, /* @__PURE__ */ new Map()), Se = (e, t, i) => {
  var s = {};
  for (var r in e)
    s[r] = e[r], delete e[r];
  for (var r in s)
    r == t && Object.assign(e, i), i.hasOwnProperty(r) || (e[r] = s[r]);
}, De = {}.toString, fe = [
  {
    pattern: /&[a-z\d]{1,8};/i,
    alias: "named-entity"
  },
  /&#x?[a-f\d]{1,8};/i
], ze = {
  pattern: /<\/?(?!\d)[^\s/=>$<%]+(?:\s(?:\s*[^\s/=>]+(?:\s*=\s*(?!\s)(?:"[^"]*"|'[^']*'|[^\s"'=>]+(?=[\s>]))?|(?=[\s/>])))+)?\s*\/?>/g,
  greedy: !0,
  inside: {
    punctuation: /^<\/?|\/?>$/,
    tag: {
      pattern: /^\S+/,
      inside: {
        namespace: /^[^:]+:/
      }
    },
    "attr-value": [{
      pattern: /(=\s*)(?:"[^"]*"|'[^']*'|[^\s"'=>]+)/g,
      lookbehind: !0,
      greedy: !0,
      inside: {
        punctuation: /^["']|["']$/,
        entity: fe
      }
    }],
    "attr-equals": /=/,
    "attr-name": {
      pattern: /\S+/,
      inside: {
        namespace: /^[^:]+:/
      }
    }
  }
};
w.rss = w.atom = w.ssml = w.xml = {
  comment: {
    pattern: /<!--(?:(?!<!--)[^])*?-->/g,
    greedy: !0
  },
  prolog: {
    pattern: /<\?[^]+?\?>/g,
    greedy: !0
  },
  doctype: {
    // https://www.w3.org/TR/xml/#NT-doctypedecl
    pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/gi,
    greedy: !0,
    inside: {
      "internal-subset": {
        pattern: /(\[)[^]+(?=\]\s*>$)/,
        lookbehind: !0,
        inside: "xml"
      },
      string: /"[^"]*"|'[^']*'/,
      punctuation: /^<!|[>[\]]/,
      "doctype-tag": /^DOCTYPE/i,
      name: /\S+/
    }
  },
  cdata: {
    pattern: /<!\[CDATA\[[^]*?\]\]>/gi,
    greedy: !0
  },
  tag: ze,
  entity: fe,
  "markup-bracket": {
    pattern: /[()[\]{}]/,
    alias: "punctuation"
  }
};
var N = (e, t) => (e["language-" + t] = {
  pattern: /[^]+/,
  inside: t
}, e), se = (e, t) => ({
  pattern: RegExp(`(<${e}[^>]*>)(?!</${e}>)(?:<!\\[CDATA\\[(?:[^\\]]|\\](?!\\]>))*\\]\\]>|(?!<!\\[CDATA\\[)[^])+?(?=</${e}>)`, "gi"),
  lookbehind: !0,
  greedy: !0,
  inside: N({
    "included-cdata": {
      pattern: /<!\[CDATA\[[^]*?\]\]>/i,
      inside: N({
        cdata: /^<!\[CDATA\[|\]\]>$/i
      }, t)
    }
  }, t)
}), re = (e, t) => ({
  pattern: RegExp(`((?:^|["'\\s])(?:${e})\\s*=\\s*)(?:"[^"]*"|'[^']*'|[^\\s"'=>]+)`, "gi"),
  lookbehind: !0,
  greedy: !0,
  inside: N({
    punctuation: /^["']|["']$/
  }, t)
}), me = w.svg = w.mathml = w.html = w.markup = Le(w.xml);
me.tag.inside["attr-value"].unshift(
  re("style", "css"),
  re("on[a-z]+", "javascript")
);
Se(me, "cdata", {
  style: se("style", "css"),
  script: se("script", "javascript")
});
const Pe = `
<shopify-collection handle="freestyle">
  <template name="loading"><div>Loading...</div></template>
  <template name="empty"><div>Collection doesn't exist</div></template>
  <template name="error"
    ><div>Error loading collection: {{message}}</div></template
  >
  <template>
    <div>
      <h1>{{ collection.title }}</h1>
      <p>{{ collection.description }}</p>
      <shopify-repeat type="collection.products" first="2">
        <template>
          <div>
            <h3>{{ product.title }}</h3>
            <p>{{ product.description }}</p>
            <shopify-repeat
              type="product.variants"
              first="2"
              style="display: flex"
            >
              <template>
                <div>
                  <h4>{{ variant.title }}</h4>
                  <div>
                    <img src="{{ variant.image.url }}" height="300" />
                  </div>
                  <div><button>Add to cart</button></div>
                </div>
              </template>
            </shopify-repeat>
          </div>
        </template>
      </shopify-repeat>
    </div>
  </template>
</shopify-collection>
    `.trim(), ke = Ce(
  "#code-editor",
  {
    language: "html",
    theme: "github-dark",
    value: Pe,
    onUpdate: (e) => {
      ee(e);
    }
  },
  () => console.log("ready")
);
let le;
ke.getModel().onDidChangeContent(ee);
ee();
function ee(e) {
  clearTimeout(le), le = setTimeout(() => {
    const t = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script type="module" src="./dist/shopify-components.es.js"><\/script>
  </head>
  <body style="position: relative">
    ${e}
    <div
      style="
        right: 0;
        bottom: 0;
        position: fixed;
        width: 50%;
        height: 80px;
        overflow: auto;
        background-color: black;
        color: #ddd;
        padding: 12px;
        font-size: 12px;
        font-family: monospace;
      "
    >
      <div style="margin-bottom: 4px"><strong>GraphQL Query: </strong></div>
      <div id="query"></div>
    </div>
  </body>
</html>

    `, i = document.createElement("iframe");
    i.style.width = "100%", i.style.height = "100%", i.setAttribute("frameborder", "0"), document.getElementById("preview").replaceChild(i, document.getElementById("preview").firstChild), i.contentWindow.document.open(), i.contentWindow.document.write(t), i.contentWindow.document.close();
  }, 500);
}
export {
  Te as a,
  P as b,
  we as c,
  Me as d,
  be as i,
  Oe as l,
  Ee as n,
  X as p
};
