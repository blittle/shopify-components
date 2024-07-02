const P = (
  /* GraphQL */
  `
  fragment CartFragment on Cart {
    id
    checkoutUrl
    totalQuantity
    buyerIdentity {
      countryCode
      customer {
        id
        email
        firstName
        lastName
        displayName
      }
      email
      phone
    }
    lines(first: 100) {
      edges {
        node {
          id
          quantity
          attributes {
            key
            value
          }
          cost {
            totalAmount {
              amount
              currencyCode
            }
            compareAtAmountPerQuantity {
              amount
              currencyCode
            }
          }
          merchandise {
            ... on ProductVariant {
              id
              availableForSale
              compareAtPrice {
                ...MoneyFragment
              }
              price {
                ...MoneyFragment
              }
              requiresShipping
              title
              image {
                ...ImageFragment
              }
              product {
                handle
                title
                id
              }
              selectedOptions {
                name
                value
              }
            }
          }
        }
      }
    }
    cost {
      subtotalAmount {
        ...MoneyFragment
      }
      totalAmount {
        ...MoneyFragment
      }
      totalDutyAmount {
        ...MoneyFragment
      }
      totalTaxAmount {
        ...MoneyFragment
      }
    }
    note
    attributes {
      key
      value
    }
    discountCodes {
      code
      applicable
    }
  }

  fragment MoneyFragment on MoneyV2 {
    currencyCode
    amount
  }
  fragment ImageFragment on Image {
    id
    url
    altText
    width
    height
  }
`
);
class bt {
  constructor({
    storefront: t,
    accessToken: r,
    apiVersion: n,
    storage: i = "session"
  }) {
    this.storefront = t, this.accessToken = r, this.apiVersion = n, this.cartId = void 0, this.storage = i, this._initialize = this.initialize();
  }
  // Wrapper method for graphQL storefront API requests, takes a GQL Query string & an object of variables.
  async graphqlRequest({
    query: t,
    variables: r = {}
  }) {
    try {
      const n = { query: t, variables: r }, i = await fetch(
        `${this.storefront}/api/${this.apiVersion}/graphql.json`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Shopify-Storefront-Access-Token": this.accessToken
          },
          body: JSON.stringify(n)
        }
      );
      if (!i.ok)
        throw new Error(`Error fetching cart: ${await i.text()}`);
      return (await i.json()).data;
    } catch (n) {
      console.error(n);
    }
  }
  // TODO: Clean up a little bit (probably better error handling lol)?
  // Public async method to create a cart & return the cart id for storage in local or session storage.
  async makeCart() {
    try {
      const r = await this.graphqlRequest({
        query: `
        mutation cartCreate {
          cartCreate {
            cart {
              id
            }
            userErrors {
              field
              message
            }
          }
        }
      `
      });
      return r ? r.cartCreate.cart.id : void 0;
    } catch (t) {
      console.error(`Error making Cart @: ${t}`);
    }
  }
  async getCart(t) {
    await this._initialize;
    try {
      const r = await this.graphqlRequest({
        query: `{
          cart(id: "${t || this.cartId}") {
            ...CartFragment
          }
        }
       ${P}`
      });
      return r ? r.cart : void 0;
    } catch (r) {
      console.error(r);
    }
  }
  async addCartLines(t) {
    try {
      const r = await this.graphqlRequest({
        query: `
          mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
            cartLinesAdd(cartId: $cartId, lines: $lines) {
              cart {
                ...CartFragment
              }
              userErrors {
                field
                message
              }
            }
          }
          ${P}
        `,
        variables: {
          cartId: this.cartId,
          lines: t
        }
      });
      return r === void 0 ? void 0 : r.cartLinesAdd.cart;
    } catch (r) {
      console.error(r);
    }
  }
  async removeCartLines(t) {
    try {
      const r = await this.graphqlRequest({
        query: `
          mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
            cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
              cart {
                ...CartFragment
              }
              userErrors {
                field
                message
              }
            }
          }
          ${P}
        `,
        variables: {
          cartId: this.cartId,
          lineIds: t
        }
      });
      return r === void 0 ? void 0 : r.cartLinesRemove.cart;
    } catch (r) {
      console.error(r);
    }
  }
  async updateCartLines(t) {
    try {
      const r = await this.graphqlRequest({
        query: `
          mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
            cartLinesUpdate(cartId: $cartId, lines: $lines) {
              cart {
                ...CartFragment
              }
              userErrors {
                field
                message
              }
            }
          }
        ${P}
        `,
        variables: {
          cartId: this.cartId,
          lines: t
        }
      });
      return r === void 0 ? void 0 : r.cartLinesUpdate.cart;
    } catch (r) {
      console.error(r);
    }
  }
  async initialize() {
    if (!window)
      throw new Error("Window not found");
    const t = this.storage === "session" ? window.sessionStorage : window.localStorage, r = t.getItem("shopify-cart");
    let n;
    if (!r || r === "") {
      const i = await this.makeCart();
      if (!i)
        return;
      n = i, t.setItem("shopify-cart", n), this.cartId = n;
    } else
      n = r, this.cartId = n;
    return n;
  }
}
var O, f, lt, L, nt, _t, V, X, B, Q, M = {}, ut = [], wt = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i, G = Array.isArray;
function $(e, t) {
  for (var r in t) e[r] = t[r];
  return e;
}
function dt(e) {
  var t = e.parentNode;
  t && t.removeChild(e);
}
function Y(e, t, r) {
  var n, i, o, a = {};
  for (o in t) o == "key" ? n = t[o] : o == "ref" ? i = t[o] : a[o] = t[o];
  if (arguments.length > 2 && (a.children = arguments.length > 3 ? O.call(arguments, 2) : r), typeof e == "function" && e.defaultProps != null) for (o in e.defaultProps) a[o] === void 0 && (a[o] = e.defaultProps[o]);
  return D(e, a, n, i, null);
}
function D(e, t, r, n, i) {
  var o = { type: e, props: t, key: r, ref: n, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, constructor: void 0, __v: i ?? ++lt, __i: -1, __u: 0 };
  return i == null && f.vnode != null && f.vnode(o), o;
}
function W(e) {
  return e.children;
}
function R(e, t) {
  this.props = e, this.context = t;
}
function E(e, t) {
  if (t == null) return e.__ ? E(e.__, e.__i + 1) : null;
  for (var r; t < e.__k.length; t++) if ((r = e.__k[t]) != null && r.__e != null) return r.__e;
  return typeof e.type == "function" ? E(e) : null;
}
function ht(e) {
  var t, r;
  if ((e = e.__) != null && e.__c != null) {
    for (e.__e = e.__c.base = null, t = 0; t < e.__k.length; t++) if ((r = e.__k[t]) != null && r.__e != null) {
      e.__e = e.__c.base = r.__e;
      break;
    }
    return ht(e);
  }
}
function ot(e) {
  (!e.__d && (e.__d = !0) && L.push(e) && !N.__r++ || nt !== f.debounceRendering) && ((nt = f.debounceRendering) || _t)(N);
}
function N() {
  var e, t, r, n, i, o, a, _;
  for (L.sort(V); e = L.shift(); ) e.__d && (t = L.length, n = void 0, o = (i = (r = e).__v).__e, a = [], _ = [], r.__P && ((n = $({}, i)).__v = i.__v + 1, f.vnode && f.vnode(n), Z(r.__P, n, i, r.__n, r.__P.namespaceURI, 32 & i.__u ? [o] : null, a, o ?? E(i), !!(32 & i.__u), _), n.__v = i.__v, n.__.__k[n.__i] = n, mt(a, n, _), n.__e != o && ht(n)), L.length > t && L.sort(V));
  N.__r = 0;
}
function pt(e, t, r, n, i, o, a, _, l, c, d) {
  var s, h, u, m, b, g = n && n.__k || ut, p = t.length;
  for (r.__d = l, kt(r, t, g), l = r.__d, s = 0; s < p; s++) (u = r.__k[s]) != null && typeof u != "boolean" && typeof u != "function" && (h = u.__i === -1 ? M : g[u.__i] || M, u.__i = s, Z(e, u, h, i, o, a, _, l, c, d), m = u.__e, u.ref && h.ref != u.ref && (h.ref && K(h.ref, null, u), d.push(u.ref, u.__c || m, u)), b == null && m != null && (b = m), 65536 & u.__u || h.__k === u.__k ? (l && !l.isConnected && (l = E(h)), l = ft(u, l, e)) : typeof u.type == "function" && u.__d !== void 0 ? l = u.__d : m && (l = m.nextSibling), u.__d = void 0, u.__u &= -196609);
  r.__d = l, r.__e = b;
}
function kt(e, t, r) {
  var n, i, o, a, _, l = t.length, c = r.length, d = c, s = 0;
  for (e.__k = [], n = 0; n < l; n++) a = n + s, (i = e.__k[n] = (i = t[n]) == null || typeof i == "boolean" || typeof i == "function" ? null : typeof i == "string" || typeof i == "number" || typeof i == "bigint" || i.constructor == String ? D(null, i, null, null, null) : G(i) ? D(W, { children: i }, null, null, null) : i.constructor === void 0 && i.__b > 0 ? D(i.type, i.props, i.key, i.ref ? i.ref : null, i.__v) : i) != null ? (i.__ = e, i.__b = e.__b + 1, _ = Ct(i, r, a, d), i.__i = _, o = null, _ !== -1 && (d--, (o = r[_]) && (o.__u |= 131072)), o == null || o.__v === null ? (_ == -1 && s--, typeof i.type != "function" && (i.__u |= 65536)) : _ !== a && (_ === a + 1 ? s++ : _ > a ? d > l - a ? s += _ - a : s-- : _ < a ? _ == a - 1 && (s = _ - a) : s = 0, _ !== n + s && (i.__u |= 65536))) : (o = r[a]) && o.key == null && o.__e && !(131072 & o.__u) && (o.__e == e.__d && (e.__d = E(o)), J(o, o, !1), r[a] = null, d--);
  if (d) for (n = 0; n < c; n++) (o = r[n]) != null && !(131072 & o.__u) && (o.__e == e.__d && (e.__d = E(o)), J(o, o));
}
function ft(e, t, r) {
  var n, i;
  if (typeof e.type == "function") {
    for (n = e.__k, i = 0; n && i < n.length; i++) n[i] && (n[i].__ = e, t = ft(n[i], t, r));
    return t;
  }
  e.__e != t && (r.insertBefore(e.__e, t || null), t = e.__e);
  do
    t = t && t.nextSibling;
  while (t != null && t.nodeType === 8);
  return t;
}
function Ct(e, t, r, n) {
  var i = e.key, o = e.type, a = r - 1, _ = r + 1, l = t[r];
  if (l === null || l && i == l.key && o === l.type && !(131072 & l.__u)) return r;
  if (n > (l != null && !(131072 & l.__u) ? 1 : 0)) for (; a >= 0 || _ < t.length; ) {
    if (a >= 0) {
      if ((l = t[a]) && !(131072 & l.__u) && i == l.key && o === l.type) return a;
      a--;
    }
    if (_ < t.length) {
      if ((l = t[_]) && !(131072 & l.__u) && i == l.key && o === l.type) return _;
      _++;
    }
  }
  return -1;
}
function it(e, t, r) {
  t[0] === "-" ? e.setProperty(t, r ?? "") : e[t] = r == null ? "" : typeof r != "number" || wt.test(t) ? r : r + "px";
}
function U(e, t, r, n, i) {
  var o;
  t: if (t === "style") if (typeof r == "string") e.style.cssText = r;
  else {
    if (typeof n == "string" && (e.style.cssText = n = ""), n) for (t in n) r && t in r || it(e.style, t, "");
    if (r) for (t in r) n && r[t] === n[t] || it(e.style, t, r[t]);
  }
  else if (t[0] === "o" && t[1] === "n") o = t !== (t = t.replace(/(PointerCapture)$|Capture$/i, "$1")), t = t.toLowerCase() in e || t === "onFocusOut" || t === "onFocusIn" ? t.toLowerCase().slice(2) : t.slice(2), e.l || (e.l = {}), e.l[t + o] = r, r ? n ? r.u = n.u : (r.u = X, e.addEventListener(t, o ? Q : B, o)) : e.removeEventListener(t, o ? Q : B, o);
  else {
    if (i == "http://www.w3.org/2000/svg") t = t.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
    else if (t != "width" && t != "height" && t != "href" && t != "list" && t != "form" && t != "tabIndex" && t != "download" && t != "rowSpan" && t != "colSpan" && t != "role" && t in e) try {
      e[t] = r ?? "";
      break t;
    } catch {
    }
    typeof r == "function" || (r == null || r === !1 && t[4] !== "-" ? e.removeAttribute(t) : e.setAttribute(t, r));
  }
}
function st(e) {
  return function(t) {
    if (this.l) {
      var r = this.l[t.type + e];
      if (t.t == null) t.t = X++;
      else if (t.t < r.u) return;
      return r(f.event ? f.event(t) : t);
    }
  };
}
function Z(e, t, r, n, i, o, a, _, l, c) {
  var d, s, h, u, m, b, g, p, y, I, q, A, rt, T, j, v = t.type;
  if (t.constructor !== void 0) return null;
  128 & r.__u && (l = !!(32 & r.__u), o = [_ = t.__e = r.__e]), (d = f.__b) && d(t);
  t: if (typeof v == "function") try {
    if (p = t.props, y = (d = v.contextType) && n[d.__c], I = d ? y ? y.props.value : d.__ : n, r.__c ? g = (s = t.__c = r.__c).__ = s.__E : ("prototype" in v && v.prototype.render ? t.__c = s = new v(p, I) : (t.__c = s = new R(p, I), s.constructor = v, s.render = $t), y && y.sub(s), s.props = p, s.state || (s.state = {}), s.context = I, s.__n = n, h = s.__d = !0, s.__h = [], s._sb = []), s.__s == null && (s.__s = s.state), v.getDerivedStateFromProps != null && (s.__s == s.state && (s.__s = $({}, s.__s)), $(s.__s, v.getDerivedStateFromProps(p, s.__s))), u = s.props, m = s.state, s.__v = t, h) v.getDerivedStateFromProps == null && s.componentWillMount != null && s.componentWillMount(), s.componentDidMount != null && s.__h.push(s.componentDidMount);
    else {
      if (v.getDerivedStateFromProps == null && p !== u && s.componentWillReceiveProps != null && s.componentWillReceiveProps(p, I), !s.__e && (s.shouldComponentUpdate != null && s.shouldComponentUpdate(p, s.__s, I) === !1 || t.__v === r.__v)) {
        for (t.__v !== r.__v && (s.props = p, s.state = s.__s, s.__d = !1), t.__e = r.__e, t.__k = r.__k, t.__k.forEach(function(F) {
          F && (F.__ = t);
        }), q = 0; q < s._sb.length; q++) s.__h.push(s._sb[q]);
        s._sb = [], s.__h.length && a.push(s);
        break t;
      }
      s.componentWillUpdate != null && s.componentWillUpdate(p, s.__s, I), s.componentDidUpdate != null && s.__h.push(function() {
        s.componentDidUpdate(u, m, b);
      });
    }
    if (s.context = I, s.props = p, s.__P = e, s.__e = !1, A = f.__r, rt = 0, "prototype" in v && v.prototype.render) {
      for (s.state = s.__s, s.__d = !1, A && A(t), d = s.render(s.props, s.state, s.context), T = 0; T < s._sb.length; T++) s.__h.push(s._sb[T]);
      s._sb = [];
    } else do
      s.__d = !1, A && A(t), d = s.render(s.props, s.state, s.context), s.state = s.__s;
    while (s.__d && ++rt < 25);
    s.state = s.__s, s.getChildContext != null && (n = $($({}, n), s.getChildContext())), h || s.getSnapshotBeforeUpdate == null || (b = s.getSnapshotBeforeUpdate(u, m)), pt(e, G(j = d != null && d.type === W && d.key == null ? d.props.children : d) ? j : [j], t, r, n, i, o, a, _, l, c), s.base = t.__e, t.__u &= -161, s.__h.length && a.push(s), g && (s.__E = s.__ = null);
  } catch (F) {
    t.__v = null, l || o != null ? (t.__e = _, t.__u |= l ? 160 : 32, o[o.indexOf(_)] = null) : (t.__e = r.__e, t.__k = r.__k), f.__e(F, t, r);
  }
  else o == null && t.__v === r.__v ? (t.__k = r.__k, t.__e = r.__e) : t.__e = It(r.__e, t, r, n, i, o, a, l, c);
  (d = f.diffed) && d(t);
}
function mt(e, t, r) {
  t.__d = void 0;
  for (var n = 0; n < r.length; n++) K(r[n], r[++n], r[++n]);
  f.__c && f.__c(t, e), e.some(function(i) {
    try {
      e = i.__h, i.__h = [], e.some(function(o) {
        o.call(i);
      });
    } catch (o) {
      f.__e(o, i.__v);
    }
  });
}
function It(e, t, r, n, i, o, a, _, l) {
  var c, d, s, h, u, m, b, g = r.props, p = t.props, y = t.type;
  if (y === "svg" ? i = "http://www.w3.org/2000/svg" : y === "math" ? i = "http://www.w3.org/1998/Math/MathML" : i || (i = "http://www.w3.org/1999/xhtml"), o != null) {
    for (c = 0; c < o.length; c++) if ((u = o[c]) && "setAttribute" in u == !!y && (y ? u.localName === y : u.nodeType === 3)) {
      e = u, o[c] = null;
      break;
    }
  }
  if (e == null) {
    if (y === null) return document.createTextNode(p);
    e = document.createElementNS(i, y, p.is && p), o = null, _ = !1;
  }
  if (y === null) g === p || _ && e.data === p || (e.data = p);
  else {
    if (o = o && O.call(e.childNodes), g = r.props || M, !_ && o != null) for (g = {}, c = 0; c < e.attributes.length; c++) g[(u = e.attributes[c]).name] = u.value;
    for (c in g) if (u = g[c], c != "children") {
      if (c == "dangerouslySetInnerHTML") s = u;
      else if (c !== "key" && !(c in p)) {
        if (c == "value" && "defaultValue" in p || c == "checked" && "defaultChecked" in p) continue;
        U(e, c, null, u, i);
      }
    }
    for (c in p) u = p[c], c == "children" ? h = u : c == "dangerouslySetInnerHTML" ? d = u : c == "value" ? m = u : c == "checked" ? b = u : c === "key" || _ && typeof u != "function" || g[c] === u || U(e, c, u, g[c], i);
    if (d) _ || s && (d.__html === s.__html || d.__html === e.innerHTML) || (e.innerHTML = d.__html), t.__k = [];
    else if (s && (e.innerHTML = ""), pt(e, G(h) ? h : [h], t, r, n, y === "foreignObject" ? "http://www.w3.org/1999/xhtml" : i, o, a, o ? o[0] : r.__k && E(r, 0), _, l), o != null) for (c = o.length; c--; ) o[c] != null && dt(o[c]);
    _ || (c = "value", m !== void 0 && (m !== e[c] || y === "progress" && !m || y === "option" && m !== g[c]) && U(e, c, m, g[c], i), c = "checked", b !== void 0 && b !== e[c] && U(e, c, b, g[c], i));
  }
  return e;
}
function K(e, t, r) {
  try {
    typeof e == "function" ? e(t) : e.current = t;
  } catch (n) {
    f.__e(n, r);
  }
}
function J(e, t, r) {
  var n, i;
  if (f.unmount && f.unmount(e), (n = e.ref) && (n.current && n.current !== e.__e || K(n, null, t)), (n = e.__c) != null) {
    if (n.componentWillUnmount) try {
      n.componentWillUnmount();
    } catch (o) {
      f.__e(o, t);
    }
    n.base = n.__P = null;
  }
  if (n = e.__k) for (i = 0; i < n.length; i++) n[i] && J(n[i], t, r || typeof e.type != "function");
  r || e.__e == null || dt(e.__e), e.__c = e.__ = e.__e = e.__d = void 0;
}
function $t(e, t, r) {
  return this.constructor(e, r);
}
function Lt(e, t, r) {
  var n, i, o, a;
  f.__ && f.__(e, t), i = (n = typeof r == "function") ? null : t.__k, o = [], a = [], Z(t, e = (!n && r || t).__k = Y(W, null, [e]), i || M, M, t.namespaceURI, !n && r ? [r] : i ? null : t.firstChild ? O.call(t.childNodes) : null, o, !n && r ? r : i ? i.__e : t.firstChild, n, a), mt(o, e, a);
}
O = ut.slice, f = { __e: function(e, t, r, n) {
  for (var i, o, a; t = t.__; ) if ((i = t.__c) && !i.__) try {
    if ((o = i.constructor) && o.getDerivedStateFromError != null && (i.setState(o.getDerivedStateFromError(e)), a = i.__d), i.componentDidCatch != null && (i.componentDidCatch(e, n || {}), a = i.__d), a) return i.__E = i;
  } catch (_) {
    e = _;
  }
  throw e;
} }, lt = 0, R.prototype.setState = function(e, t) {
  var r;
  r = this.__s != null && this.__s !== this.state ? this.__s : this.__s = $({}, this.state), typeof e == "function" && (e = e($({}, r), this.props)), e && $(r, e), e != null && this.__v && (t && this._sb.push(t), ot(this));
}, R.prototype.forceUpdate = function(e) {
  this.__v && (this.__e = !0, e && this.__h.push(e), ot(this));
}, R.prototype.render = W, L = [], _t = typeof Promise == "function" ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, V = function(e, t) {
  return e.__v.__b - t.__v.__b;
}, N.__r = 0, X = 0, B = st(!1), Q = st(!0);
var gt = function(e, t, r, n) {
  var i;
  t[0] = 0;
  for (var o = 1; o < t.length; o++) {
    var a = t[o++], _ = t[o] ? (t[0] |= a ? 1 : 2, r[t[o++]]) : t[++o];
    a === 3 ? n[0] = _ : a === 4 ? n[1] = Object.assign(n[1] || {}, _) : a === 5 ? (n[1] = n[1] || {})[t[++o]] = _ : a === 6 ? n[1][t[++o]] += _ + "" : a ? (i = e.apply(_, gt(e, _, r, ["", null])), n.push(i), _[0] ? t[0] |= 2 : (t[o - 2] = 0, t[o] = i)) : n.push(_);
  }
  return n;
}, at = /* @__PURE__ */ new Map();
function Et(e) {
  var t = at.get(this);
  return t || (t = /* @__PURE__ */ new Map(), at.set(this, t)), (t = gt(this, t.get(e) || (t.set(e, t = function(r) {
    for (var n, i, o = 1, a = "", _ = "", l = [0], c = function(h) {
      o === 1 && (h || (a = a.replace(/^\s*\n\s*|\s*\n\s*$/g, ""))) ? l.push(0, h, a) : o === 3 && (h || a) ? (l.push(3, h, a), o = 2) : o === 2 && a === "..." && h ? l.push(4, h, 0) : o === 2 && a && !h ? l.push(5, 0, !0, a) : o >= 5 && ((a || !h && o === 5) && (l.push(o, 0, a, i), o = 6), h && (l.push(o, h, 0, i), o = 6)), a = "";
    }, d = 0; d < r.length; d++) {
      d && (o === 1 && c(), c(d));
      for (var s = 0; s < r[d].length; s++) n = r[d][s], o === 1 ? n === "<" ? (c(), l = [l], o = 3) : a += n : o === 4 ? a === "--" && n === ">" ? (o = 1, a = "") : a = n + a[0] : _ ? n === _ ? _ = "" : a += n : n === '"' || n === "'" ? _ = n : n === ">" ? (c(), o = 1) : o && (n === "=" ? (o = 5, i = a, a = "") : n === "/" && (o < 5 || r[d][s + 1] === ">") ? (c(), o === 3 && (l = l[0]), o = l, (l = l[0]).push(2, 0, o), o = 0) : n === " " || n === "	" || n === `
` || n === "\r" ? (c(), o = 2) : a += n), o === 3 && a === "!--" && (o = 4, l = l[0]);
    }
    return c(), l;
  }(e)), t), arguments, [])).length > 1 ? t : t[0];
}
var z = Et.bind(Y);
class xt {
  constructor() {
    this.target = new EventTarget();
  }
  on(t, r) {
    return this.target.addEventListener(t, r);
  }
  once(t, r) {
    return this.target.addEventListener(t, r, { once: !0 });
  }
  off(t, r) {
    return this.target.removeEventListener(t, r);
  }
  emit(t, r) {
    return this.target.dispatchEvent(
      new CustomEvent(t, { detail: r, cancelable: !0 })
    );
  }
}
const C = new xt();
class w extends HTMLElement {
  constructor() {
    super(), this._render = this.render.bind(this), this._rerender = this.rerender.bind(this), C.on("cart:initialized", this._rerender), C.on("cart:updated", this._rerender);
  }
  disconnectedCallback() {
    C.off("cart:initialized", this._rerender), C.off("cart:updated", this._rerender);
  }
  connectedCallback() {
    this.rerender();
  }
  rerender() {
    const t = {};
    for (const { name: r, value: n } of this.attributes) t[r] = n;
    Lt(Y(this._render, t), this);
  }
  render() {
  }
  getTemplate() {
    var r;
    if (this.originalTemplate) return;
    const t = [].find.call(
      this.children || [],
      (n) => n.name === "template" || n.localName === "template" && !n.hasAttribute("shadowrootmode")
    );
    t && (this.originalTemplate = t, this.template = ((r = t.content) == null ? void 0 : r.firstElementChild) ?? t.children[0]);
  }
}
function k(e, t, r = {}) {
  customElements.define(`shopify-${e}`, t, r);
}
class At extends w {
  constructor() {
    super(), this.cart = new bt({
      storefront: "https://hydrogen-preview.myshopify.com",
      accessToken: "33ad0f277e864013b8e3c21d19432501",
      apiVersion: "2024-04",
      storage: "session"
    }), this.cart.getCart().then((t) => {
      t && (this.data = t, C.emit("cart:initialized", t));
    }), C.on("cart:updated", (t) => {
      this.data = t == null ? void 0 : t.detail;
    });
  }
}
k("cart", At);
function S(e) {
  const t = e.closest("shopify-cart");
  if (!t)
    throw new Error(
      "Could not find cart element. Make sure your have a <cart> element in your template that wraps all other cart components."
    );
  return { cart: t.cart, data: t.data };
}
k(
  "cart-total-amount",
  class extends w {
    constructor() {
      super();
    }
    render() {
      var t, r, n;
      const e = S(this);
      return (n = (r = (t = e == null ? void 0 : e.data) == null ? void 0 : t.cost) == null ? void 0 : r.totalAmount) == null ? void 0 : n.amount;
    }
  }
);
k(
  "cart-subtotal-amount",
  class extends w {
    constructor() {
      super();
    }
    render() {
      var t, r, n;
      const e = S(this);
      return (n = (r = (t = e == null ? void 0 : e.data) == null ? void 0 : t.cost) == null ? void 0 : r.subtotalAmount) == null ? void 0 : n.amount;
    }
  }
);
function Mt(e) {
  if (!e) {
    const t = `flattenConnection(): needs a 'connection' to flatten, but received '${e ?? ""}' instead.`;
    return console.error(t + " Returning an empty array"), [];
  }
  return "nodes" in e ? e.nodes : "edges" in e && Array.isArray(e.edges) ? e.edges.map((t) => {
    if (!(t != null && t.node))
      throw new Error(
        "flattenConnection(): Connection edges must contain nodes"
      );
    return t.node;
  }) : [];
}
function St(e, t) {
  return e.replace(
    new RegExp("{{(?<!<template>[\\s\\S]*)(?!<\\/template>)(.*?)}}", "g"),
    (r, n) => {
      var a;
      let i = t;
      const o = n == null ? void 0 : n.split(".");
      return (a = o == null ? void 0 : o.slice(1, o.length)) == null || a.forEach((_) => {
        i = i == null ? void 0 : i[_];
      }), i;
    }
  );
}
function qt(e) {
  return e.replace(
    /<(area|base|br|col|command|embed|hr|img|input|keygen|link|meta|param|source|track|wbr)([^<>]*?)([^\/])>/gi,
    "<$1$2$3/>"
  );
}
function yt(e, t, r, n) {
  if (t && e) {
    const i = qt(e);
    return t.map((o) => {
      var l;
      return z`<${() => {
        const c = z([
          St(i, o)
        ]);
        return c.props[n] = o[r], c.key = o[r], c;
      }}
        key=${encodeURIComponent(o[r])}
        ${n}=${(l = o[r]) == null ? void 0 : l.trim()}
      />`;
    });
  }
  return null;
}
k(
  "cart-line",
  class extends w {
    constructor() {
      super(), this._children = [], this.items = [];
    }
    render() {
      var r;
      this.getTemplate();
      const { data: e } = S(this);
      let t = e != null && e.lines ? Mt(e.lines) : [];
      return this.items = t, yt(
        (r = this.template) == null ? void 0 : r.outerHTML,
        t,
        "id",
        "data-cart-line-id"
      );
    }
  }
);
function x(e) {
  var n, i;
  const t = e.closest("[data-cart-line-id]");
  if (!t) throw new Error("Unable to find cart line element");
  const r = t.getAttribute("data-cart-line-id");
  return (i = (n = e == null ? void 0 : e.closest("shopify-cart-line")) == null ? void 0 : n.items) == null ? void 0 : i.find((o) => o.id === r);
}
k(
  "cart-line-title",
  class extends w {
    constructor() {
      super();
    }
    render() {
      var t, r;
      const e = x(this);
      return (r = (t = e == null ? void 0 : e.merchandise) == null ? void 0 : t.product) == null ? void 0 : r.title;
    }
  }
);
k(
  "cart-line-amount",
  class extends w {
    constructor() {
      super();
    }
    render() {
      var t, r;
      const e = x(this);
      return (r = (t = e == null ? void 0 : e.cost) == null ? void 0 : t.totalAmount) == null ? void 0 : r.amount;
    }
  }
);
k(
  "cart-line-image",
  class extends w {
    constructor() {
      super();
    }
    render() {
      var i;
      const e = this.getAttribute("width") || 128, t = this.getAttribute("height") || 128, r = x(this), n = (i = r == null ? void 0 : r.merchandise) == null ? void 0 : i.image;
      return n && z`
          <style>
            :host {
              display: flex;
            }
            img {
              width: ${e + "".trim()}px;
              height: ${t + "".trim()}px;
              object-fit: contain;
            }
          </style>

          <${Tt} ...${n} width=${e} height=${t} />
        `;
    }
  }
);
function Tt(e) {
  const t = 128 / Math.max(e.width, e.height), r = t * e.width, n = t * e.height;
  return z`<img
    src=${e.url + "&width=" + e.width * 1.5 + "&height=" + e.height * 1.5}
    width=${r}
    height=${n}
  />`;
}
k(
  "cart-line-quantity",
  class extends w {
    constructor() {
      super();
    }
    render() {
      const e = x(this);
      return e == null ? void 0 : e.quantity;
    }
  }
);
k(
  "cart-line-options",
  class extends w {
    constructor() {
      super(), this.items = [];
    }
    render() {
      var r, n;
      this.getTemplate();
      const e = x(this);
      let t = ((r = e == null ? void 0 : e.merchandise) == null ? void 0 : r.selectedOptions) ?? [];
      return this.items = t, yt(
        (n = this.template) == null ? void 0 : n.outerHTML,
        t,
        "name",
        "data-cart-line-id"
      );
    }
  }
);
function vt(e) {
  const t = e.closest("[data-cart-option]");
  if (!t) throw new Error("Unable to find cart line element");
  return t._item;
}
k(
  "cart-line-option-name",
  class extends w {
    constructor() {
      super();
    }
    render() {
      return vt(this).name;
    }
  }
);
k(
  "cart-line-option-value",
  class extends w {
    constructor() {
      super();
    }
    render() {
      return vt(this).value;
    }
  }
);
const H = /* @__PURE__ */ new Map();
class tt {
  constructor(t) {
    this.el = t;
  }
  connectedCallback(t) {
  }
  disconnectedCallback(t) {
  }
}
function et(e, t) {
  const r = ct.bind(null, t);
  document.querySelectorAll(`[shopify-${e}]`).forEach((i) => r(i)), new MutationObserver(function() {
    document.querySelectorAll(`[shopify-${e}]`).forEach(ct.bind(null, t));
    for (const i of H.keys())
      document.body.contains(i) || (H.get(i).disconnectedCallback(i), H.delete(i));
  }).observe(document.body, {
    attributes: !0,
    childList: !0,
    subtree: !0
  });
}
function ct(e, t) {
  if (t.customAttributeSetup) return;
  t.customAttributeSetup = !0;
  const r = new e(t);
  r.connectedCallback(), H.set(t, r);
}
class Ft extends tt {
  constructor(t) {
    super(t);
    const r = t.getAttribute("shopify-add-line-item");
    if (!r) throw new Error("Must define a variant ID");
    this.addLine = async () => {
      t.setAttribute("disabled", "true");
      const { cart: n } = S(t), i = await n.addCartLines([
        { merchandiseId: r, quantity: 1 }
      ]);
      C.emit("cart:updated", i), t.removeAttribute("disabled");
    };
  }
  connectedCallback() {
    this.el.addEventListener("click", this.addLine);
  }
  disconnectedCallback(t) {
    this.el.removeEventListener("click", this.addLine);
  }
}
et("add-line-item", Ft);
class Pt extends tt {
  constructor(t) {
    super(t);
    const r = t.getAttribute("shopify-remove-line-item");
    this.removeLine = async () => {
      t.setAttribute("disabled", "true");
      const { cart: n } = S(t), i = x(t);
      let o;
      if (r) o = await n.removeCartLines([r]);
      else if (i.id) o = await n.removeCartLines([i.id]);
      else throw new Error("Must define a variant ID or cart line ID");
      C.emit("cart:updated", o), t.removeAttribute("disabled");
    };
  }
  connectedCallback() {
    this.el.addEventListener("click", this.removeLine);
  }
  disconnectedCallback(t) {
    this.el.removeEventListener("click", this.removeLine);
  }
}
et("remove-line-item", Pt);
class Ut extends tt {
  constructor(t) {
    super(t), this.setHref = (r) => {
      var i;
      const n = (i = r == null ? void 0 : r.detail) == null ? void 0 : i.checkoutUrl;
      n && t.setAttribute("href", n);
    };
  }
  connectedCallback() {
    C.on("cart:initialized", this.setHref);
  }
  disconnectedCallback() {
    C.off("cart:initialized", this.setHref);
  }
}
et("checkout", Ut);
