import { l as e, n as Se, i as me, a as ie, b as J, c as te, p as X, d as fe } from "./editor-Dnq1p1lv.mjs";
e.abap = {
  comments: {
    line: '"'
  }
};
const Ee = (t, l, s = 0) => {
  const m = t.scrollContainer.style, u = document.documentElement.style;
  m.scrollPaddingBlock = u.scrollPaddingBlock = `${s}px ${me && !l.textContent ? l.offsetHeight : 0}px`, l.scrollIntoView({ block: "nearest" }), m.scrollPaddingBlock = u.scrollPaddingBlock = "";
}, ce = (t, l) => l ? t.lastIndexOf(`
`, l - 1) + 1 : 0, ge = (t, l) => (l = t.indexOf(`
`, l)) + 1 ? l : t.length, qe = (t, l, s) => (t.addListener(l, s), () => t.removeListener(l, s));
let ee;
const Z = (t) => t.replace(/[$+?|.^*()[\]{}\\]/g, "\\$&"), V = (t, l) => t.slice(ce(t, l), l), K = (t, l, s = l) => [
  t.slice(l = ce(t, l), s = ge(t, s)).split(`
`),
  l,
  s
], U = (t, l, s = 0, m = s, u = t.getSelection()[0]) => {
  var x;
  const h = t.value, d = t.wrapper.children[Se(h, 0, u)], T = document.createTreeWalker(d, 5);
  let b = T.lastChild(), f = ge(h, u) + 1 - u - b.length;
  for (; -f <= m && (b = T.previousNode()); )
    if (!b.lastChild && (f -= b.length || 0, f <= s)) {
      for (; b != d; b = b.parentNode)
        if ((x = b.matches) != null && x.call(b, l))
          return b;
    }
}, ae = (t, l) => {
  var s;
  return ((s = U(t, '[class*="language-"]', 0, 0, l)) == null ? void 0 : s.className.match(
    /language-(\S*)/
  )[1]) || t.options.language;
}, B = (t, l, s, m, u, h) => {
  if (t.options.readOnly)
    return;
  ee = t.getSelection(), m ?? (m = s);
  let d = t.textarea, T = t.value, b = me && !T[m ?? ee[1]] && /\n$/.test(l) && /^$|\n$/.test(T), f;
  t.focused || d.focus(), s != null && d.setSelectionRange(s, m), u != null && (f = qe(t, "update", () => {
    d.setSelectionRange(
      u,
      h ?? u,
      ee[2]
    ), f();
  })), ie || d.dispatchEvent(new InputEvent("beforeinput", { data: l })), me || ie ? (b && (d.selectionEnd--, l = l.slice(0, -1)), ie && (l += `
`), document.execCommand(
    l ? "insertHTML" : "delete",
    !1,
    l.replace(/&/g, "&amp;").replace(/</g, "&lt;")
  ), b && d.selectionStart++) : document.execCommand(l ? "insertText" : "delete", !1, l), ee = 0;
}, ne = (t) => t.altKey + t.ctrlKey * 2 + t.metaKey * 4 + t.shiftKey * 8, q = /[([{][^)\]}]*$|^[^.]*\b(?:case .+?|default):\s*$/, Be = /\[]|\(\)|{}/, M = /<(?![?!\d#@])([^\s/=>$<%]+)(?:\s(?:\s*[^\s/"'=>]+(?:\s*=\s*(?!\s)(?:"[^"]*"|'[^']*'|[^\s"'=>]+(?=[\s>]))?|(?=[\s/>])))+)?\s*>[ 	]*$/, we = /^<\/(?!\d)[^\s/=>$<%]+\s*>/, Ce = /[([{][^)\]}]*$/, ue = ([t, l], s) => Be.test(s[t - 1] + s[l]), I = {
  line: "//",
  block: ["/*", "*/"]
}, R = /^(?:area|base|w?br|col|embed|hr|img|input|link|meta|source|track)$/i, de = (t, l) => !!t && !(l != null && l.test(t[1])), he = (t, l) => [
  ([s], m) => de(m.slice(0, s).match(t), l) || Ce.test(V(m, s)),
  (s, m) => ue(s, m) || de(m.slice(0, s[0]).match(t), l) && we.test(m.slice(s[1]))
], le = {
  block: ["<!--", "-->"]
}, A = (t = le, l = M, s) => ({
  comments: t,
  autoIndent: he(l, s),
  autoCloseTags: ([m, u], h, d) => oe(d, m, u, h, l, s)
}), oe = (t, l, s, m, u, h) => {
  if (l == s) {
    let d = u.exec(m.slice(0, l) + ">"), T = t.extensions.matchTags;
    if (d && (d = d[1] || "", !(h != null && h.test(d)))) {
      if (T) {
        let { pairs: b, tags: f } = T;
        for (let x = f.length; x; ) {
          let k = f[--x];
          if (k[1] >= l && k[4] && k[5] && k[3] == d && b[x] == null)
            return;
        }
      }
      return `</${d}>`;
    }
  }
}, n = (t = I, l = Ce) => ({
  comments: t,
  autoIndent: [
    ([s], m) => l.test(V(m, s)),
    ue
  ]
}), _ = (t, l) => e[t] = {
  comments: l,
  autoIndent: he(we, R),
  autoCloseTags: ([s, m], u, h) => U(h, "." + t, 0, 0, s) ? "" : oe(h, s, m, u, M, R)
};
e.abnf = n({ line: ";" });
e.actionscript = A(I);
e.ada = n({ line: "--" });
e.agda = {
  comments: {
    line: "--"
  }
};
e.al = n();
e.g4 = e.antlr4 = n();
e.apacheconf = {
  comments: {
    line: "#"
  },
  autoIndent: [
    ([t], l) => /<\w+\b.*>[ 	]*$/.test(V(l, t)),
    ([t, l], s) => /<\w+\b.*>$/.test(V(s, t)) && /^<\/\w+\b.*>/.test(s.slice(l))
  ],
  autoCloseTags([t], l) {
    let s = /<(\w+)\b.*>/.exec(V(l, t) + ">");
    return s && `</${s[1]}>`;
  }
};
e.apex = n();
e.apl = n({ line: "⍝" });
e.applescript = {
  comments: {
    line: "--",
    block: ["(*", "*)"]
  }
};
e.aql = n();
e.ino = e.arduino = n(I, q);
e.arff = {
  comments: {
    line: "%"
  }
};
e.art = e.arturo = {
  comments: {
    line: ";"
  }
};
e.adoc = e.asciidoc = {
  comments: {
    line: "//"
  }
};
e["arm-asm"] = e.armasm = e.asm6502 = e.asmatmel = e.nasm = { comments: { line: ";" } };
e.aspnet = A({ block: ["<%--", "--%>"] }, M, R);
e.autohotkey = n({
  line: ";",
  block: ["/*", "*/"]
});
e.autoit = {
  comments: {
    line: ";",
    block: ["#cs", "#ce"]
  }
};
e.avs = e.avisynth = n({
  line: "#",
  block: ["/*", "*/"]
});
e.avdl = e["avro-idl"] = n();
e.awk = n({
  line: "#"
});
e.sh = e.shell = e.bash = n({ line: "#" });
e.basic = {
  comments: {
    line: "!"
  }
};
e.batch = {
  comments: {
    line: "::"
  }
};
e.bbj = {
  comments: {
    line: "REM"
  }
};
e.bicep = n();
e.birb = n(I, q);
e.bison = n(I, q);
e.bqn = n({ line: "#" });
e.brightscript = {
  comments: { line: "'" }
};
e.bro = n({
  line: "#"
});
e.bsl = n({
  line: "//"
});
e.cfscript = n();
e.chaiscript = n();
e.cil = n({
  line: "//"
});
e["cilk-c"] = e.cilkc = e.cilk = e["cilk-cpp"] = e.cilkcpp = n(I, q);
e.clike = e.js = e.javascript = e.ts = e.typescript = e.java = e.cs = e.csharp = e.c = e.cpp = e.go = e.d = e.dart = e.flow = e.haxe = n(I, q);
e.clojure = n({
  line: ";"
});
e.cmake = n({ line: "#", block: ["#[[", "]]"] });
e.cobol = {
  comments: {
    line: "*"
  }
};
e.coffee = e.coffeescript = n({
  line: "#",
  block: ["###", "###"]
});
e.conc = e.concurnas = n();
e.cooklang = {
  comments: {
    line: "--",
    block: ["[-", "-]"]
  }
};
e.coq = n({ block: ["(*", "*)"] });
e.razor = e.cshtml = A(
  { block: ["@*", "*@"] },
  M,
  R
);
e.css = n({
  block: ["/*", "*/"]
});
e.less = e.scss = n();
e.sass = {
  comments: I
  // Let's not bother with auto-indenting for sass
};
e.cue = n({ line: "//" });
e.cypher = n({ line: "//" });
e.dataweave = n();
e.dax = n();
e.dhall = n({
  line: "--",
  block: ["{-", "-}"]
});
e.jinja2 = _("django", {
  block: ["{#", "#}"]
});
e["dns-zone"] = e["dns-zone-file"] = {
  comments: {
    line: ";"
  }
};
e.dockerfile = e.docker = {
  comments: {
    line: "#"
  }
};
e.gv = e.dot = n();
e.ebnf = n({
  block: ["(*", "*)"]
});
e.editorconfig = {
  comments: {
    line: "#"
  }
};
e.eiffel = n({
  line: "--"
});
e.ejs = A({ block: ["<%#", "%>"] }, M, R);
e.elixir = {
  comments: {
    line: "#"
  }
};
e.elm = {
  comments: {
    line: "--",
    block: ["{-", "-}"]
  }
};
e.markup = e.html = e.markdown = e.md = A(le, M, R);
e.erb = e.html;
e.erlang = {
  comments: {
    line: "%"
  }
};
e.etlua = e.html;
e.xlsx = e.xls = e["excel-formula"] = n({
  block: ['N("', '")']
});
e.factor = n({
  line: "!",
  block: ["/*", "*/"]
});
e.false = {
  comments: {
    block: ["{", "}"]
  }
};
e["firestore-security-rules"] = n({
  line: "//"
});
e.fortran = {
  comments: {
    line: "!"
  }
};
e.fsharp = n({ line: "//", block: ["(*", "*)"] });
_("ftl", {
  block: ["<#--", "-->"]
});
e.gap = {
  comments: {
    line: "#"
  }
};
e.gcode = {
  comments: {
    line: ";"
  }
};
e.gdscript = n({
  line: "#"
});
e.gettext = {
  comments: {
    line: "#"
  }
};
e.gherkin = {
  comments: {
    line: "#"
  }
};
e.git = {
  comments: {
    line: "#"
  }
};
e.glsl = e.hlsl = n(I, q);
e.gamemakerlanguage = e.gml = n(I, q);
e.gni = e.gn = n({
  line: "#"
});
e["go-mod"] = e["go-module"] = n({
  line: "//"
});
e.gradle = n();
e.graphql = n({ line: "#" });
e.groovy = n();
e.haml = n({ line: "-#" });
e.mustache = e.hbs = _("handlebars", {
  block: ["{{!", "}}"]
});
e.idr = e.idris = e.hs = e.haskell = e.purs = e.purescript = n({
  line: "--",
  block: ["{-", "-}"]
});
e.hcl = n({
  line: "#",
  block: ["/*", "*/"]
});
e.hoon = {
  comments: {
    line: "::"
  }
};
e.ichigojam = n({
  line: "'"
});
e.icon = n({
  line: "#"
});
e.iecst = n({
  line: "//",
  block: ["(*", "*)"]
});
e.npmignore = e.hgignore = e.gitignore = e.ignore = {
  comments: {
    line: "#"
  }
};
e.inform7 = n({
  block: ["[", "]"]
});
e.ini = {
  comments: {
    line: ";"
  }
};
e.io = n();
e.j = {
  comments: {
    line: "NB."
  }
};
e.jolie = n();
e.jq = n({
  line: "#"
});
e.json = e.json5 = e.jsonp = n();
var $e = (t, l) => t.replace(/<(\d+)>/g, (s, m) => `(?:${l[+m]})`), Me = (t, l, s) => RegExp($e(t, l), s), Te = "\\s|//.*(?!.)|/\\*(?:[^*]|\\*(?!/))*\\*/", Le = "\\{(?:[^{}]|\\{(?:[^{}]|\\{[^}]*\\})*\\})*\\}", Re = $e("\\{<0>*\\.{3}(?:[^{}]|<1>)*\\}", [Te, Le]);
const re = Me(
  `(?:^|[^$\\w])<(?:(?!\\d)([^\\s/=><%]+)(?:<0>(?:<0>*(?:[^\\s"'{=<>/*]+(?:<0>*=<0>*(?!\\s)(?:"[^"]*"|'[^']*'|<1>)?|(?=[\\s/>]))|<2>))+)?<0>*)?>[ 	]*$`,
  [Te, Le, Re]
), Ae = /^<\/(?!\d)[^\s/=><%]*\s*>/, Pe = ({ tags: t, pairs: l }, { brackets: s, pairs: m }, u) => {
  var h, d;
  for (let T = t.length, b, f = 0; b = t[--T]; )
    if (b[2] > u && b[1] < u)
      f = b[1];
    else if (!b[4] && b[5] && b[1] >= f && b[2] <= u && !(((h = t[l[T]]) == null ? void 0 : h[1]) < u)) {
      for (let x = s.length, k; k = s[--x]; )
        if (k[1] >= b[2] && k[1] < u && k[3] == "{" && !(((d = s[m[x]]) == null ? void 0 : d[1]) < u))
          return;
      return !0;
    }
}, Ne = {
  block: ["{/*", "*/}"]
};
e.jsx = e.tsx = {
  comments: I,
  getComments(t, l) {
    const { matchBrackets: s, matchTags: m } = t.extensions;
    return (s && m ? Pe(m, s, l) : U(t, ".plain-text", 0, 0, l)) ? Ne : I;
  },
  autoIndent: [
    ([t], l) => re.test(l.slice(0, t)) || q.test(V(l, t)),
    (t, l) => ue(t, l) || re.test(l.slice(0, t[0])) && Ae.test(l.slice(t[1]))
  ],
  autoCloseTags: ([t, l], s, m) => oe(m, t, l, s, re)
};
e.julia = n({
  line: "#",
  block: ["#=", "=#"]
});
e.keepalived = n({
  line: "#"
});
e.keyman = {
  comments: {
    line: "c"
  }
};
e.kts = e.kt = e.kotlin = n();
e.kumir = n({
  line: "|"
});
e.kusto = n({
  line: "//"
});
e.context = e.tex = e.latex = n({ line: "%" });
_("latte", {
  block: ["{*", "*}"]
});
e.ly = e.lilypond = n({
  line: "%",
  block: ["%{", "%}"]
});
e.ld = e["linker-script"] = n({
  block: ["/*", "*/"]
});
_("liquid", {
  block: ["{% comment %}", "{% endcomment %}"]
});
e["emacs-lisp"] = e.emacs = e.elisp = e.lisp = n({ line: ";" });
e.livescript = n({
  line: "#",
  block: ["/*", "*/"]
});
e.llvm = n({
  line: ";"
});
e.lolcode = {
  comments: {
    line: "BTW",
    block: ["OBTW", "TLDR"]
  }
};
e.lua = n({ line: "--", block: ["--[[", "]]"] });
e.magma = n();
e.makefile = {
  comments: {
    line: "#"
  }
};
e.mata = n();
e.matlab = n({
  line: "%",
  block: ["%{", "}%"]
});
e.maxscript = n({
  line: "--",
  block: ["/*", "*/"]
});
e.mel = n(I, q);
e.mermaid = n({
  line: "%%"
});
e.metafont = n({
  line: "%"
});
e.mizar = n({
  line: "::"
});
e.mongodb = n(I, q);
e.monkey = n({
  line: "'"
});
e.moon = e.moonscript = n({
  line: "--"
});
e.n1ql = n({
  line: "--",
  block: ["/*", "*/"]
});
e.n4jsd = e.n4js = n(I, q);
e["nand2tetris-hdl"] = n();
e.nani = e.naniscript = n({
  line: ";"
});
e.neon = n({
  line: "#"
});
e.nevod = n();
e.nginx = n({
  line: "#"
});
e.nim = n({
  line: "#"
});
e.nix = n({
  line: "#",
  block: ["/*", "*/"]
});
e.nsis = n({
  line: "#",
  block: ["/*", "*/"]
});
e.objc = e.objectivec = n(I, q);
e.ocaml = n({
  block: ["(*", "*)"]
});
e.odin = n();
e.opencl = n(I, q);
e.qasm = e.openqasm = n();
e.oz = n({
  line: "%",
  block: ["/*", "*/"]
});
e.parigp = n({
  line: "\\\\",
  block: ["/*", "*/"]
});
e.parser = A(
  {
    line: "#",
    block: ["<!--", "-->"]
  },
  M,
  R
);
e.pascaligo = e.objectpascal = e.pascal = n({
  line: "//",
  block: ["(*", "*)"]
});
e.pcode = e.peoplecode = {
  comments: {
    block: ["/*", "*/"]
  }
};
e.perl = n({ line: "#" });
e.php = {
  comments: I,
  getComments: (t, l) => U(t, ".php", 0, 0, l) ? I : le,
  autoIndent: he(M, R),
  autoCloseTags: ([t, l], s, m) => !s.includes("<?") || U(m, ".php", 0, 0, t) ? "" : oe(m, t, l, s, M, R)
};
e.plantuml = e["plant-uml"] = n({
  line: "'",
  block: ["/'", "'/"]
});
e.mscript = e.pq = e.powerquery = n();
e.powershell = n({
  line: "#",
  block: ["<#", "#>"]
});
e.processing = n();
e.prolog = n({
  line: "%",
  block: ["/*", "*/"]
});
e.promql = n({
  line: "#"
});
e.properties = {
  comments: {
    line: "#"
  }
};
e.protobuf = n();
e.psl = n({
  line: "#"
});
e.pug = n({
  line: "//-"
});
e.puppet = n({
  line: "#",
  block: ["/*", "*/"]
});
e.pure = n();
e.pbfasm = e.purebasic = n({
  line: ";"
});
e.rpy = e.renpy = e.py = e.python = n({ line: "#" }, /[([{][^)\]}]*$|:\s*$/);
e.q = n({
  line: "/"
});
e.qml = n();
e.qore = n();
e.qs = e.qsharp = n({
  line: "//"
});
e.r = n({
  line: "#"
});
e.reason = n();
e.rego = n({
  line: "#"
});
e.res = e.rescript = n();
e.rest = {
  comments: {
    line: ".."
  }
};
e.rip = n({
  line: "#"
});
e.roboconf = n({
  line: "#"
});
e.robot = e.robotframework = {
  comments: {
    line: "#"
  }
};
e.crystal = e.rb = e.ruby = n({ line: "#", block: ["=begin", "=end"] });
e.rust = n();
e.sas = n({
  block: ["/*", "*/"]
});
e.scala = n();
e.racket = e.scheme = n({
  line: ";",
  block: ["#|", "|#"]
});
e.smali = {
  comments: {
    line: "#"
  }
};
e.smalltalk = n({
  block: ['"', '"']
});
_("smarty", {
  block: ["{*", "*}"]
});
e.smlnj = e.sml = n({
  block: ["(*", "*)"]
});
e.sol = e.solidity = n(I, q);
e.sln = e["solution-file"] = {
  comments: {
    line: "#"
  }
};
_("soy", I);
e["splunk-spl"] = n({
  block: ['`comment("', '")`']
});
e.sqf = n();
e.plsql = e.sql = n({
  line: "--",
  block: ["/*", "*/"]
});
e.squirrel = n(I, q);
e.stan = n();
e.stata = n();
e.stylus = n();
e.sclang = e.supercollider = n();
e.swift = n();
e.systemd = {
  comments: {
    line: "#"
  }
};
e.tcl = n({
  line: "#"
});
e.textile = A(le, M, R);
e.toml = n({
  line: "#"
});
e.trickle = e.troy = e.tremor = {
  comments: {
    line: "#"
  }
};
_("tt2", {
  block: ["[%#", "%]"]
}).getComments = (t, l) => ({
  line: U(t, ".tt2", 0, 0, l) && "#",
  block: ["[%#", "%]"]
});
e.rq = e.sparql = e.trig = e.turtle = n({ line: "#" });
_("twig", {
  block: ["{#", "#}"]
});
e.tsconfig = e.typoscript = n();
e.uc = e.uscript = e.unrealscript = n(I, q);
e.uorazor = {
  comments: {
    line: "#"
  }
};
e.v = n();
e.vala = n(I, q);
e.vbnet = {
  comments: {
    line: "'"
  }
};
e.velocity = A(
  {
    line: "##",
    block: ["#*", "*#"]
  },
  M,
  R
);
e.verilog = n();
e.vhdl = n({
  line: "--"
});
e.vim = n({
  line: '"'
});
e.vba = e.vb = e["visual-basic"] = n({
  line: "'"
});
e.warpscript = n();
e.wasm = {
  comments: {
    line: ";;",
    block: ["(;", ";)"]
  }
};
e.webidl = e["web-idl"] = n();
e.wgsl = n();
e.wiki = A(
  {
    block: ["/*", "*/"]
  },
  M,
  R
);
e.nb = e.wl = e.mathematica = e.wolfram = n({ block: ["(*", "*)"] });
e.wren = n();
e.xeoracube = e.xeora = A(le, M, R);
e.xml = e.ssml = e.atom = e.rss = e.mathml = e.svg = A();
e.xojo = {
  comments: {
    line: "//"
  }
};
const je = ["(:", ":)"], Oe = e.xquery = A(
  { block: je },
  /<(?!!|\d)([^\s/=>$<%]+)(?:\s+[^\s/=>]+(?:\s*=\s*(["'])(?:\{\{|\{(?!\{)(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})*\}|(?!\2)[^{])*\2)?)*\s*>[ 	]*$/
);
Oe.getComments = (t, l) => ({
  block: U(t, ".plain-text", 0, 0, l) ? ["{(:", ":)}"] : je
});
e.yml = e.yaml = n({ line: "#" });
e.yang = n();
e.zig = n({
  line: "//"
});
const ze = (t = !0, l = "([{", s = ")]}") => {
  let m;
  const u = (f) => {
    f.extensions.matchBrackets = u, f.addListener("tokenize", T), t && f.tokens[0] ? f.update() : T(f.tokens);
  }, h = u.brackets = [], d = u.pairs = [], T = (f) => {
    if (d.length = h.length = m = 0, b(f, 0, 0), t)
      for (let x = 0, k; k = h[x]; ) {
        let $ = k[0].alias;
        k[0].alias = ($ ? $ + " " : "") + `bracket-${d[x++] == null ? "error" : "level-" + k[2] % 12}`;
      }
  }, b = (f, x, k) => {
    let $ = [], C = 0, c;
    for (let o = 0; c = f[o++]; ) {
      let a = c.length;
      if (typeof c != "string") {
        let r = c.content;
        if (Array.isArray(r))
          b(r, x, C + k);
        else if ((c.alias || c.type) == "punctuation") {
          let i = ye(r, l, a - 1), g = i || ye(r, s, a - 1);
          if (g) {
            if (h[m] = [c, x, 0, r, !!i, x + a], i)
              $[C++] = [m, i];
            else
              for (let y = C; y; ) {
                let [p, w] = $[--y];
                g == w && (d[d[m] = p] = m, h[m][2] = h[p][2] = y + k, C = y, y = 0);
              }
            m++;
          }
        }
      }
      x += a;
    }
  };
  return u;
}, ye = (t, l, s) => l.indexOf(t[0]) + 1 || s && l.indexOf(t[s]) + 1, De = () => (t) => {
  let l, s, m, u = -1, h = [], d = () => {
    s || (s = t.extensions.matchBrackets);
    let [f, x] = t.getSelection(), k = f == x && t.focused && s && T(x) || -1;
    if (k != u) {
      if (b(), k + 1) {
        let $ = l[m[k]], C = l[k];
        h = [$, C].map(
          (c) => U(t, ".punctuation", 0, -1, c[1])
        ), h[0] != h[1] && $[1] + $[3].length == C[1] && (h[0].textContent += h[1].textContent, h[1].textContent = "", h[1] = h[0]), b(!0);
      } else
        h = [];
      u = k;
    }
  }, T = (f) => {
    var x;
    ({ brackets: l, pairs: m } = s);
    for (let k = 0, $; $ = l[++k]; )
      if (!$[4] && $[5] >= f && ((x = l[m[k]]) == null ? void 0 : x[1]) <= f)
        return k;
  }, b = (f) => h.forEach((x) => x.classList.toggle("active-bracket", !!f));
  J(t, "focus", d), J(t, "blur", d), t.addListener("selectionChange", d), t.addListener("update", () => {
    b(), u = -1;
  });
}, We = te(
  "<div class=guide-indents style=left:var(--padding-left);bottom:auto;right:auto> "
), Ke = te(
  "<div style=width:1px;position:absolute;background:var(--bg-guide-indent)>"
), Ve = () => {
  let t, l = 0, s, m = -1, u;
  const h = [], d = [], T = We(), b = [], f = (C) => {
    s = [];
    const c = k(C.split(`
`)), o = c.length;
    for (let a = 0, r = [], i = c[0]; i; a++) {
      const g = (h[a] || (h[a] = Ke())).style, [y, p, w] = i, v = d[a];
      i = c[a + 1], y != (v == null ? void 0 : v[0]) && (g.top = y + "00%"), p != (v == null ? void 0 : v[1]) && (g.height = p + "00%"), w != (v == null ? void 0 : v[2]) && (g.left = w * 100 + "%");
      const j = r[0] != y && (i == null ? void 0 : i[0]) != y, L = r[0] + r[1] != y + p && (i == null ? void 0 : i[0]) + (i == null ? void 0 : i[1]) != y + p;
      for (let S = -j, E = p + L; S < E; S++)
        s[S + y] = a;
      r = d[a] = c[a];
    }
    for (let a = l; a > o; )
      h[--a].remove();
    T.append(...h.slice(l, l = o));
  }, x = () => {
    const C = s[u.activeLineNumber - 1] ?? -1;
    C != m && (m > -1 && (h[m].className = ""), C > -1 && (h[C].className = "active")), m = C;
  }, k = (C) => {
    const c = C.length, o = [], a = [];
    for (let r = 0, i = -1, g = 0, y = 0; ; g++) {
      const p = g == c, w = p ? 0 : b[g] = $(C[g]);
      if (w < 0)
        i < 0 && (i = g);
      else {
        for (let v = w; v < r; v++)
          o[v][1] = (i < 0 || v == w && !p ? g : i) - o[v][0];
        for (let v = r; v < w; )
          a[y++] = o[v] = [
            i < 0 || v > r ? g : i,
            0,
            v++ * t
          ];
        i = -1, r = w;
      }
      if (p)
        break;
    }
    return b.length = c, a;
  }, $ = (C) => {
    let c = C.search(/\S/), o = 0;
    if (c < 0)
      return c;
    for (let a = 0; a < c; )
      o += C[a++] == "	" ? t - o % t : 1;
    return Math.ceil(o / t);
  };
  return {
    lines: T.children,
    indentLevels: b,
    update(C, c) {
      u || (u = C, C.extensions.indentGuides = this, C.overlays.append(T), C.addListener("update", f), C.addListener("selectionChange", x)), T.style.display = c.wordWrap ? "none" : "", t != (t = c.tabSize || 2) && (f(C.value), x());
    }
  };
}, _e = te(
  "<div style=position:absolute;top:0;opacity:0;padding:inherit> <span><span></span> "
), He = () => {
  let t, l = " ", s = " ";
  const m = _e(), [u, h] = m.childNodes, [d, T] = h.childNodes, b = (k) => {
    let { value: $, activeLine: C } = t, c = k[k[2] < "f" ? 0 : 1], o = V($, c), a = $.slice(c, ge($, c));
    !o && !a && (a = " "), l != o && (u.data = l = o), s != a && (T.data = s = a), m.parentNode != C && C.prepend(m);
  }, f = () => Ee(t, d), x = (k) => {
    k.addListener("selectionChange", b), t = k, k.extensions.cursor = x, J(k, "input", ($) => {
      /history/.test($.inputType) && f();
    }), k.activeLine && b(k.getSelection());
  };
  return x.getPosition = () => {
    const k = d.getBoundingClientRect(), $ = t.overlays.getBoundingClientRect();
    return {
      top: k.y - $.y,
      bottom: $.bottom - k.bottom,
      left: k.x - $.x,
      right: $.right - k.x,
      height: k.height
    };
  }, x.scrollIntoView = f, x.element = d, x;
};
let pe = !1;
const xe = navigator.clipboard, Y = fe ? 4 : 2, Je = (t) => pe = t, F = (t) => t.search(/\S|$/), Ue = (t = ['""', "''", "``", "()", "[]", "{}"], l = /([^$\w'"`]["'`]|.[[({])[.,:;\])}>\s]|.[[({]`/s) => (s, m) => {
  let u;
  const { keyCommandMap: h, inputCommandMap: d, getSelection: T } = s, b = ({ insertSpaces: c = !0, tabSize: o } = m) => [c ? " " : "	", c ? o || 2 : 1], f = () => {
    var c;
    return !m.readOnly && !((c = s.extensions.cursor) != null && c.scrollIntoView());
  }, x = ([c, o], [a, r], i, g) => (c < o || !g && l.test((i[o - 1] || " ") + a + (i[o] || " "))) && !B(s, a + i.slice(c, o) + r, null, null, c + 1, o + 1), k = ([c, o], a, r) => c == o && r[o] == a && !s.setSelection(c + 1), $ = (c, o, a, r, i, g) => {
    let y = o.join(`
`);
    if (y != c.join(`
`)) {
      const p = c.length - 1, w = o[p], v = c[p], j = v.length - w.length, L = o[0].length - c[0].length, S = a + F((L < 0 ? o : c)[0]), E = r - v.length + F(j > 0 ? w : v), D = a - r + y.length + j, H = S > i ? i : Math.max(S, i + L), G = g + a - r + y.length;
      B(
        s,
        y,
        a,
        r,
        H,
        g < E ? G + j : Math.max(E + D, G)
      );
    }
  }, C = (c, o, a, r, i, g, y, p) => {
    $(
      o,
      o.map(
        c ? (w) => w.slice(F(w) ? p - F(w) % p : 0) : (w) => w && y.repeat(p - F(w) % p) + w
      ),
      a,
      r,
      i,
      g
    );
  };
  d["<"] = (c, o, a) => x(o, "<>", a, !0), t.forEach(([c, o]) => {
    const a = c == o;
    d[c] = (r, i, g) => (a && k(i, o, g) || x(i, c + o, g)) && f(), a || (d[o] = (r, i, g) => k(i, o, g) && f());
  }), d[">"] = (c, o, a) => {
    var i, g;
    const r = (g = (i = e[ae(s)]) == null ? void 0 : i.autoCloseTags) == null ? void 0 : g.call(i, o, a, s);
    r && (B(s, ">" + r, null, null, o[0] + 1), X(c));
  }, h.Tab = (c, [o, a], r) => {
    if (pe || m.readOnly || ne(c) & 6)
      return;
    const [i, g] = b(m), y = c.shiftKey, [p, w, v] = K(r, o, a);
    return o < a || y ? C(y, p, w, v, o, a, i, g) : B(s, i.repeat(g - (o - w) % g)), f();
  }, h.Enter = (c, o, a) => {
    var i, g, y;
    const r = ne(c) & 7;
    if (!r || r == Y) {
      r && (o[0] = o[1] = K(a, o[1])[2]);
      const [p, w] = b(), [v, j] = o, L = (i = e[ae(s)]) == null ? void 0 : i.autoIndent, S = Math.floor(F(V(a, v)) / w) * w, E = (g = L == null ? void 0 : L[0]) != null && g.call(L, o, a, s) ? w : 0, D = (y = L == null ? void 0 : L[1]) == null ? void 0 : y.call(L, o, a, s), H = `
` + p.repeat(S + E) + (D ? `
` + p.repeat(S) : "");
      if (H[1] || a[j])
        return B(s, H, v, j, v + S + E + 1), f();
    }
  }, h.Backspace = (c, [o, a], r) => {
    if (o == a) {
      const i = V(r, o), g = m.tabSize || 2, y = t.includes(r.slice(o - 1, o + 1)), p = /[^ ]/.test(i) ? 0 : (i.length - 1) % g + 1;
      if (y || p > 1)
        return B(s, "", o - (y ? 1 : p), o + y), f();
    }
  };
  for (let c = 0; c < 2; c++)
    h[c ? "ArrowDown" : "ArrowUp"] = (o, [a, r], i) => {
      const g = ne(o);
      if ((g & 7) == 1) {
        if (g == 1) {
          const y = c ? a : ce(i, a) - 1, p = c ? i.indexOf(`
`, r) + 1 : r;
          if (y > -1 && p > 0) {
            const [w, v, j] = K(i, y, p), L = w[c ? "pop" : "shift"](), S = (L.length + 1) * (c ? 1 : -1);
            w[c ? "unshift" : "push"](L), B(s, w.join(`
`), v, j, a + S, r + S);
          }
        } else {
          const [y, p, w] = K(i, a, r), v = y.join(`
`), j = c ? v.length + 1 : 0;
          B(s, v + `
` + v, p, w, a + j, r + j);
        }
        return f();
      }
    };
  J(s, "keydown", (c) => {
    var y;
    const o = ne(c), a = c.keyCode, [r, i, g] = T();
    if (o == Y && (a == 221 || a == 219))
      return C(
        a == 219,
        ...K(s.value, r, i),
        r,
        i,
        ...b()
      ), f();
    if (o == (fe ? 10 : 2) && a == 77)
      Je(!pe), X(c);
    else if (a == 191 && o == Y || a == 65 && o == 9) {
      const p = s.value, w = o == 9, v = w ? r : ce(p, r), j = e[ae(s, v)] || {}, { line: L, block: S } = ((y = j.getComments) == null ? void 0 : y.call(j, s, v, p)) || j.comments || {}, [E, D, H] = K(p, r, i), G = E.length - 1;
      if (w) {
        if (S) {
          const [P, W] = S, Q = p.slice(r, i), N = p.slice(0, r).search(Z(P) + " ?$"), O = RegExp("^ ?" + Z(W)).test(p.slice(i));
          N + 1 && O ? B(
            s,
            Q,
            N,
            i + +(p[i] == " ") + W.length,
            N,
            N + i - r
          ) : B(
            s,
            `${P} ${Q} ${W}`,
            r,
            i,
            r + P.length + 1,
            i + P.length + 1
          ), f();
        }
      } else if (L) {
        const P = Z(L), W = RegExp(`^\\s*(${P} ?|$)`), Q = RegExp(P + " ?"), N = !/\S/.test(p.slice(D, H)), O = E.map(
          E.every((z) => W.test(z)) && !N ? (z) => z.replace(Q, "") : (z) => N || /\S/.test(z) ? z.replace(/^\s*/, `$&${L} `) : z
        );
        $(E, O, D, H, r, i), f();
      } else if (S) {
        const [P, W] = S, Q = F(E[0]), N = E[0].startsWith(P, Q) && E[G].endsWith(W), O = E.slice();
        O[0] = E[0].replace(
          N ? RegExp(Z(P) + " ?") : /(?=\S)|$/,
          N ? "" : P + " "
        );
        let z = O[0].length - E[0].length;
        O[G] = N ? O[G].replace(RegExp(`( ?${Z(W)})?$`), "") : O[G] + " " + W;
        let be = O.join(`
`), se = Q + D, ke = se > r ? r : Math.max(r + z, se), Ie = se > i - (r != i) ? i : Math.min(Math.max(se, i + z), D + be.length);
        B(s, be, D, H, ke, Math.max(ke, Ie)), f();
      }
    } else if (o == 8 + Y && a == 75) {
      const p = s.value, [w, v, j] = K(p, r, i), L = g == "forward" ? i - j + w.pop().length : r - v, S = K(p, j + 1)[0][0].length;
      return B(
        s,
        "",
        v - !!v,
        j + !v,
        v + Math.min(L, S)
      ), f();
    }
  }), ["copy", "cut", "paste"].forEach(
    (c) => J(s, c, (o) => {
      const [a, r] = T();
      if (a == r && xe) {
        const [[i], g, y] = K(s.value, a, r);
        c == "paste" ? o.clipboardData.getData("text/plain") == u && (B(s, u + `
`, g, g, a + u.length + 1), f(), X(o)) : (xe.writeText(u = i), c == "cut" && (B(s, "", g, y + 1), f()), X(o));
      }
    })
  );
}, Ge = (t = 999) => {
  let l = 0, s, m, u = !1, h, d, T, b, f;
  const x = [], k = (c) => {
    c >= t && (c--, x.shift()), x.splice(l = c, t, [s.value, f(), f()]);
  }, $ = (c) => {
    var o;
    x[c] && (b.value = x[c][0], b.setSelectionRange(...x[c][c < l ? 2 : 1]), s.update(), (o = s.extensions.cursor) == null || o.scrollIntoView(), l = c, m = !1);
  }, C = (c, o) => {
    c.extensions.history = C, s = c, f = c.getSelection, b || k(0), b = c.textarea, c.addListener("selectionChange", () => {
      m = u, u = !1;
    }), J(c, "beforeinput", (a) => {
      let r = a.data, i = a.inputType;
      /history/.test(i) ? ($(l + (i[7] == "U" ? -1 : 1)), X(a)) : (T = m && h == i && a.isTrusted && !(r != null && r.includes(`
`)) && (r != " " || d == r)) || (x[l][2] = ee || f()), u = !0, d = r, h = i;
    }), J(c, "input", () => k(l + !T)), J(c, "keydown", (a) => {
      if (!o.readOnly) {
        const r = ne(a), i = a.keyCode, g = r == Y && i == 90, y = r == Y + 8 && i == 90 || !fe && r == Y && i == 89;
        g ? ($(l - 1), X(a)) : y && ($(l + 1), X(a));
      }
    });
  };
  return C.clear = () => {
    k(0), m = !1;
  }, C.has = (c) => l + c in x, C.go = (c) => $(l + c), C;
}, Qe = te(
  '<div style="color:#0000;contain:strict;padding:0 var(--_pse) 0 var(--padding-left)" aria-hidden=true>'
), Fe = te("<span> "), ve = (t, l, s = /[_\p{N}\p{L}]{2}/u) => l ? s.test(
  t.slice(
    l - (t.codePointAt(l - 2) > 65535 ? 2 : 1),
    l + (t.codePointAt(l) > 65535 ? 2 : 1)
  )
) : !1, Xe = (t) => {
  const l = [new Text()], s = [], m = Qe(), u = [], h = () => {
    u[0] && (u.length = 0, m.remove());
  };
  let d, T = 0;
  return {
    search(b, f, x, k, $, C, c) {
      if (!b)
        return h();
      k || (b = Z(b));
      const o = t.value, a = $ ? o.slice(...$) : o, r = $ ? $[0] : 0;
      let i, g, y, p = 0;
      try {
        for (d = RegExp(b, `gum${f ? "" : "i"}`); i = d.exec(a); )
          g = i[0].length, y = i.index + r, g || (d.lastIndex += o.codePointAt(y) > 65535 ? 2 : 1), !(x && (ve(o, y, c) || ve(o, y + g, c))) && (!C || C(y, y + g)) && (u[p++] = [y, y + g]);
      } catch (w) {
        return h(), w.message;
      }
      if (p) {
        for (u.length = p, g = Math.min(p * 2, 2e4), p = l.length; p <= g; )
          l[p++] = Fe(), l[p++] = new Text();
        for (p = T - 1; p > g; )
          l[p--].remove();
        T <= g && m.append(...l.slice(T, g + 1));
        let w = 0;
        for (p = 0; p < g; ++p) {
          const [v, j] = u[p / 2], L = o.slice(w, v), S = o.slice(v, w = j);
          L != s[p] && (l[p].data = s[p] = L), S != s[++p] && (l[p].firstChild.data = s[p] = S);
        }
        l[g].data = s[g] = o.slice(w), m.parentNode || t.overlays.append(m), T = g + 1;
      } else
        h();
    },
    container: m,
    get regex() {
      return d;
    },
    matches: u,
    stopSearch: h
  };
}, Ye = (t, l = 1, s = 200) => {
  const m = (u) => {
    const h = m.api = Xe(u), d = h.container;
    d.style.zIndex = -1, d.className = "selection-matches", u.addListener("selectionChange", ([T, b], f) => {
      f = u.focused ? f.slice(T, b) : "", T += f.search(/\S/), f = f.trim();
      let x = f.length;
      h.search(
        l > x || x > s ? "" : f,
        t,
        !1,
        !1,
        void 0,
        (k, $) => k > T || $ <= T
      );
    });
  };
  return m;
}, en = (t = Ge()) => [
  Ue(),
  Ve(),
  ze(),
  De(),
  He(),
  Ye(),
  t,
  {
    update(l) {
      l.value != l.textarea.value && t.clear();
    }
  }
];
export {
  en as common
};
