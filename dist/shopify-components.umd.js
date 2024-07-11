(function(T){typeof define=="function"&&define.amd?define(T):T()})(function(){"use strict";var T,d,z,C,J,X,q,D,j,I,x={},G=[],ae=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,H=Array.isArray;function w(t,e){for(var n in e)t[n]=e[n];return t}function K(t){var e=t.parentNode;e&&e.removeChild(t)}function O(t,e,n){var r,i,o,l={};for(o in e)o=="key"?r=e[o]:o=="ref"?i=e[o]:l[o]=e[o];if(arguments.length>2&&(l.children=arguments.length>3?T.call(arguments,2):n),typeof t=="function"&&t.defaultProps!=null)for(o in t.defaultProps)l[o]===void 0&&(l[o]=t.defaultProps[o]);return S(t,l,r,i,null)}function S(t,e,n,r,i){var o={type:t,props:e,key:n,ref:r,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,constructor:void 0,__v:i??++z,__i:-1,__u:0};return i==null&&d.vnode!=null&&d.vnode(o),o}function N(t){return t.children}function P(t,e){this.props=t,this.context=e}function E(t,e){if(e==null)return t.__?E(t.__,t.__i+1):null;for(var n;e<t.__k.length;e++)if((n=t.__k[e])!=null&&n.__e!=null)return n.__e;return typeof t.type=="function"?E(t):null}function Y(t){var e,n;if((t=t.__)!=null&&t.__c!=null){for(t.__e=t.__c.base=null,e=0;e<t.__k.length;e++)if((n=t.__k[e])!=null&&n.__e!=null){t.__e=t.__c.base=n.__e;break}return Y(t)}}function Z(t){(!t.__d&&(t.__d=!0)&&C.push(t)&&!A.__r++||J!==d.debounceRendering)&&((J=d.debounceRendering)||X)(A)}function A(){var t,e,n,r,i,o,l,c;for(C.sort(q);t=C.shift();)t.__d&&(e=C.length,r=void 0,o=(i=(n=t).__v).__e,l=[],c=[],n.__P&&((r=w({},i)).__v=i.__v+1,d.vnode&&d.vnode(r),W(n.__P,r,i,n.__n,n.__P.namespaceURI,32&i.__u?[o]:null,l,o??E(i),!!(32&i.__u),c),r.__v=i.__v,r.__.__k[r.__i]=r,oe(l,r,c),r.__e!=o&&Y(r)),C.length>e&&C.sort(q));A.__r=0}function ee(t,e,n,r,i,o,l,c,f,s,a){var _,p,u,m,b,y=r&&r.__k||G,h=e.length;for(n.__d=f,pe(n,e,y),f=n.__d,_=0;_<h;_++)(u=n.__k[_])!=null&&typeof u!="boolean"&&typeof u!="function"&&(p=u.__i===-1?x:y[u.__i]||x,u.__i=_,W(t,u,p,i,o,l,c,f,s,a),m=u.__e,u.ref&&p.ref!=u.ref&&(p.ref&&R(p.ref,null,u),a.push(u.ref,u.__c||m,u)),b==null&&m!=null&&(b=m),65536&u.__u||p.__k===u.__k?(f&&!f.isConnected&&(f=E(p)),f=te(u,f,t)):typeof u.type=="function"&&u.__d!==void 0?f=u.__d:m&&(f=m.nextSibling),u.__d=void 0,u.__u&=-196609);n.__d=f,n.__e=b}function pe(t,e,n){var r,i,o,l,c,f=e.length,s=n.length,a=s,_=0;for(t.__k=[],r=0;r<f;r++)l=r+_,(i=t.__k[r]=(i=e[r])==null||typeof i=="boolean"||typeof i=="function"?null:typeof i=="string"||typeof i=="number"||typeof i=="bigint"||i.constructor==String?S(null,i,null,null,null):H(i)?S(N,{children:i},null,null,null):i.constructor===void 0&&i.__b>0?S(i.type,i.props,i.key,i.ref?i.ref:null,i.__v):i)!=null?(i.__=t,i.__b=t.__b+1,c=he(i,n,l,a),i.__i=c,o=null,c!==-1&&(a--,(o=n[c])&&(o.__u|=131072)),o==null||o.__v===null?(c==-1&&_--,typeof i.type!="function"&&(i.__u|=65536)):c!==l&&(c===l+1?_++:c>l?a>f-l?_+=c-l:_--:c<l?c==l-1&&(_=c-l):_=0,c!==r+_&&(i.__u|=65536))):(o=n[l])&&o.key==null&&o.__e&&!(131072&o.__u)&&(o.__e==t.__d&&(t.__d=E(o)),B(o,o,!1),n[l]=null,a--);if(a)for(r=0;r<s;r++)(o=n[r])!=null&&!(131072&o.__u)&&(o.__e==t.__d&&(t.__d=E(o)),B(o,o))}function te(t,e,n){var r,i;if(typeof t.type=="function"){for(r=t.__k,i=0;r&&i<r.length;i++)r[i]&&(r[i].__=t,e=te(r[i],e,n));return e}t.__e!=e&&(n.insertBefore(t.__e,e||null),e=t.__e);do e=e&&e.nextSibling;while(e!=null&&e.nodeType===8);return e}function he(t,e,n,r){var i=t.key,o=t.type,l=n-1,c=n+1,f=e[n];if(f===null||f&&i==f.key&&o===f.type&&!(131072&f.__u))return n;if(r>(f!=null&&!(131072&f.__u)?1:0))for(;l>=0||c<e.length;){if(l>=0){if((f=e[l])&&!(131072&f.__u)&&i==f.key&&o===f.type)return l;l--}if(c<e.length){if((f=e[c])&&!(131072&f.__u)&&i==f.key&&o===f.type)return c;c++}}return-1}function ne(t,e,n){e[0]==="-"?t.setProperty(e,n??""):t[e]=n==null?"":typeof n!="number"||ae.test(e)?n:n+"px"}function M(t,e,n,r,i){var o;e:if(e==="style")if(typeof n=="string")t.style.cssText=n;else{if(typeof r=="string"&&(t.style.cssText=r=""),r)for(e in r)n&&e in n||ne(t.style,e,"");if(n)for(e in n)r&&n[e]===r[e]||ne(t.style,e,n[e])}else if(e[0]==="o"&&e[1]==="n")o=e!==(e=e.replace(/(PointerCapture)$|Capture$/i,"$1")),e=e.toLowerCase()in t||e==="onFocusOut"||e==="onFocusIn"?e.toLowerCase().slice(2):e.slice(2),t.l||(t.l={}),t.l[e+o]=n,n?r?n.u=r.u:(n.u=D,t.addEventListener(e,o?I:j,o)):t.removeEventListener(e,o?I:j,o);else{if(i=="http://www.w3.org/2000/svg")e=e.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if(e!="width"&&e!="height"&&e!="href"&&e!="list"&&e!="form"&&e!="tabIndex"&&e!="download"&&e!="rowSpan"&&e!="colSpan"&&e!="role"&&e in t)try{t[e]=n??"";break e}catch{}typeof n=="function"||(n==null||n===!1&&e[4]!=="-"?t.removeAttribute(e):t.setAttribute(e,n))}}function re(t){return function(e){if(this.l){var n=this.l[e.type+t];if(e.t==null)e.t=D++;else if(e.t<n.u)return;return n(d.event?d.event(e):e)}}}function W(t,e,n,r,i,o,l,c,f,s){var a,_,p,u,m,b,y,h,v,k,L,$,ue,F,Q,g=e.type;if(e.constructor!==void 0)return null;128&n.__u&&(f=!!(32&n.__u),o=[c=e.__e=n.__e]),(a=d.__b)&&a(e);e:if(typeof g=="function")try{if(h=e.props,v=(a=g.contextType)&&r[a.__c],k=a?v?v.props.value:a.__:r,n.__c?y=(_=e.__c=n.__c).__=_.__E:("prototype"in g&&g.prototype.render?e.__c=_=new g(h,k):(e.__c=_=new P(h,k),_.constructor=g,_.render=me),v&&v.sub(_),_.props=h,_.state||(_.state={}),_.context=k,_.__n=r,p=_.__d=!0,_.__h=[],_._sb=[]),_.__s==null&&(_.__s=_.state),g.getDerivedStateFromProps!=null&&(_.__s==_.state&&(_.__s=w({},_.__s)),w(_.__s,g.getDerivedStateFromProps(h,_.__s))),u=_.props,m=_.state,_.__v=e,p)g.getDerivedStateFromProps==null&&_.componentWillMount!=null&&_.componentWillMount(),_.componentDidMount!=null&&_.__h.push(_.componentDidMount);else{if(g.getDerivedStateFromProps==null&&h!==u&&_.componentWillReceiveProps!=null&&_.componentWillReceiveProps(h,k),!_.__e&&(_.shouldComponentUpdate!=null&&_.shouldComponentUpdate(h,_.__s,k)===!1||e.__v===n.__v)){for(e.__v!==n.__v&&(_.props=h,_.state=_.__s,_.__d=!1),e.__e=n.__e,e.__k=n.__k,e.__k.forEach(function(U){U&&(U.__=e)}),L=0;L<_._sb.length;L++)_.__h.push(_._sb[L]);_._sb=[],_.__h.length&&l.push(_);break e}_.componentWillUpdate!=null&&_.componentWillUpdate(h,_.__s,k),_.componentDidUpdate!=null&&_.__h.push(function(){_.componentDidUpdate(u,m,b)})}if(_.context=k,_.props=h,_.__P=t,_.__e=!1,$=d.__r,ue=0,"prototype"in g&&g.prototype.render){for(_.state=_.__s,_.__d=!1,$&&$(e),a=_.render(_.props,_.state,_.context),F=0;F<_._sb.length;F++)_.__h.push(_._sb[F]);_._sb=[]}else do _.__d=!1,$&&$(e),a=_.render(_.props,_.state,_.context),_.state=_.__s;while(_.__d&&++ue<25);_.state=_.__s,_.getChildContext!=null&&(r=w(w({},r),_.getChildContext())),p||_.getSnapshotBeforeUpdate==null||(b=_.getSnapshotBeforeUpdate(u,m)),ee(t,H(Q=a!=null&&a.type===N&&a.key==null?a.props.children:a)?Q:[Q],e,n,r,i,o,l,c,f,s),_.base=e.__e,e.__u&=-161,_.__h.length&&l.push(_),y&&(_.__E=_.__=null)}catch(U){e.__v=null,f||o!=null?(e.__e=c,e.__u|=f?160:32,o[o.indexOf(c)]=null):(e.__e=n.__e,e.__k=n.__k),d.__e(U,e,n)}else o==null&&e.__v===n.__v?(e.__k=n.__k,e.__e=n.__e):e.__e=de(n.__e,e,n,r,i,o,l,f,s);(a=d.diffed)&&a(e)}function oe(t,e,n){e.__d=void 0;for(var r=0;r<n.length;r++)R(n[r],n[++r],n[++r]);d.__c&&d.__c(e,t),t.some(function(i){try{t=i.__h,i.__h=[],t.some(function(o){o.call(i)})}catch(o){d.__e(o,i.__v)}})}function de(t,e,n,r,i,o,l,c,f){var s,a,_,p,u,m,b,y=n.props,h=e.props,v=e.type;if(v==="svg"?i="http://www.w3.org/2000/svg":v==="math"?i="http://www.w3.org/1998/Math/MathML":i||(i="http://www.w3.org/1999/xhtml"),o!=null){for(s=0;s<o.length;s++)if((u=o[s])&&"setAttribute"in u==!!v&&(v?u.localName===v:u.nodeType===3)){t=u,o[s]=null;break}}if(t==null){if(v===null)return document.createTextNode(h);t=document.createElementNS(i,v,h.is&&h),o=null,c=!1}if(v===null)y===h||c&&t.data===h||(t.data=h);else{if(o=o&&T.call(t.childNodes),y=n.props||x,!c&&o!=null)for(y={},s=0;s<t.attributes.length;s++)y[(u=t.attributes[s]).name]=u.value;for(s in y)if(u=y[s],s!="children"){if(s=="dangerouslySetInnerHTML")_=u;else if(s!=="key"&&!(s in h)){if(s=="value"&&"defaultValue"in h||s=="checked"&&"defaultChecked"in h)continue;M(t,s,null,u,i)}}for(s in h)u=h[s],s=="children"?p=u:s=="dangerouslySetInnerHTML"?a=u:s=="value"?m=u:s=="checked"?b=u:s==="key"||c&&typeof u!="function"||y[s]===u||M(t,s,u,y[s],i);if(a)c||_&&(a.__html===_.__html||a.__html===t.innerHTML)||(t.innerHTML=a.__html),e.__k=[];else if(_&&(t.innerHTML=""),ee(t,H(p)?p:[p],e,n,r,v==="foreignObject"?"http://www.w3.org/1999/xhtml":i,o,l,o?o[0]:n.__k&&E(n,0),c,f),o!=null)for(s=o.length;s--;)o[s]!=null&&K(o[s]);c||(s="value",m!==void 0&&(m!==t[s]||v==="progress"&&!m||v==="option"&&m!==y[s])&&M(t,s,m,y[s],i),s="checked",b!==void 0&&b!==t[s]&&M(t,s,b,y[s],i))}return t}function R(t,e,n){try{typeof t=="function"?t(e):t.current=e}catch(r){d.__e(r,n)}}function B(t,e,n){var r,i;if(d.unmount&&d.unmount(t),(r=t.ref)&&(r.current&&r.current!==t.__e||R(r,null,e)),(r=t.__c)!=null){if(r.componentWillUnmount)try{r.componentWillUnmount()}catch(o){d.__e(o,e)}r.base=r.__P=null}if(r=t.__k)for(i=0;i<r.length;i++)r[i]&&B(r[i],e,n||typeof t.type!="function");n||t.__e==null||K(t.__e),t.__c=t.__=t.__e=t.__d=void 0}function me(t,e,n){return this.constructor(t,n)}function ye(t,e,n){var r,i,o,l;d.__&&d.__(t,e),i=(r=typeof n=="function")?null:e.__k,o=[],l=[],W(e,t=(!r&&n||e).__k=O(N,null,[t]),i||x,x,e.namespaceURI,!r&&n?[n]:i?null:e.firstChild?T.call(e.childNodes):null,o,!r&&n?n:i?i.__e:e.firstChild,r,l),oe(o,t,l)}T=G.slice,d={__e:function(t,e,n,r){for(var i,o,l;e=e.__;)if((i=e.__c)&&!i.__)try{if((o=i.constructor)&&o.getDerivedStateFromError!=null&&(i.setState(o.getDerivedStateFromError(t)),l=i.__d),i.componentDidCatch!=null&&(i.componentDidCatch(t,r||{}),l=i.__d),l)return i.__E=i}catch(c){t=c}throw t}},z=0,P.prototype.setState=function(t,e){var n;n=this.__s!=null&&this.__s!==this.state?this.__s:this.__s=w({},this.state),typeof t=="function"&&(t=t(w({},n),this.props)),t&&w(n,t),t!=null&&this.__v&&(e&&this._sb.push(e),Z(this))},P.prototype.forceUpdate=function(t){this.__v&&(this.__e=!0,t&&this.__h.push(t),Z(this))},P.prototype.render=N,C=[],X=typeof Promise=="function"?Promise.prototype.then.bind(Promise.resolve()):setTimeout,q=function(t,e){return t.__v.__b-e.__v.__b},A.__r=0,D=0,j=re(!1),I=re(!0);var ie=function(t,e,n,r){var i;e[0]=0;for(var o=1;o<e.length;o++){var l=e[o++],c=e[o]?(e[0]|=l?1:2,n[e[o++]]):e[++o];l===3?r[0]=c:l===4?r[1]=Object.assign(r[1]||{},c):l===5?(r[1]=r[1]||{})[e[++o]]=c:l===6?r[1][e[++o]]+=c+"":l?(i=t.apply(c,ie(t,c,n,["",null])),r.push(i),c[0]?e[0]|=2:(e[o-2]=0,e[o]=i)):r.push(c)}return r},_e=new Map;function ve(t){var e=_e.get(this);return e||(e=new Map,_e.set(this,e)),(e=ie(this,e.get(t)||(e.set(t,e=function(n){for(var r,i,o=1,l="",c="",f=[0],s=function(p){o===1&&(p||(l=l.replace(/^\s*\n\s*|\s*\n\s*$/g,"")))?f.push(0,p,l):o===3&&(p||l)?(f.push(3,p,l),o=2):o===2&&l==="..."&&p?f.push(4,p,0):o===2&&l&&!p?f.push(5,0,!0,l):o>=5&&((l||!p&&o===5)&&(f.push(o,0,l,i),o=6),p&&(f.push(o,p,0,i),o=6)),l=""},a=0;a<n.length;a++){a&&(o===1&&s(),s(a));for(var _=0;_<n[a].length;_++)r=n[a][_],o===1?r==="<"?(s(),f=[f],o=3):l+=r:o===4?l==="--"&&r===">"?(o=1,l=""):l=r+l[0]:c?r===c?c="":l+=r:r==='"'||r==="'"?c=r:r===">"?(s(),o=1):o&&(r==="="?(o=5,i=l,l=""):r==="/"&&(o<5||n[a][_+1]===">")?(s(),o===3&&(f=f[0]),o=f,(f=f[0]).push(2,0,o),o=0):r===" "||r==="	"||r===`
`||r==="\r"?(s(),o=2):l+=r),o===3&&l==="!--"&&(o=4,f=f[0])}return s(),f}(t)),e),arguments,[])).length>1?e:e[0]}var ge=ve.bind(O);class be extends HTMLElement{constructor(){super(),this.activeTemplate="loading",this.originalTemplates={},this.templates={},this._render=this.render.bind(this),this._rerender=this.rerender.bind(this)}connectedCallback(){this.getTemplates(),this.rerender()}getTemplates(){var e;for(const n of this.children)if(n.localName==="template"){const r=n.getAttribute("name")||"default";this.originalTemplates[r]=n;const i=((e=n.content)==null?void 0:e.firstElementChild)??n.children[0];if(!i)throw new Error("The template must have a single root element");this.templates[r]=i}if(!this.templates.default)throw new Error("Must have at least a default template");this.templates.loading||(this.templates.loading=this.templates.default)}getTemplate(e){return this.templates[e]}setTemplate(e){this.activeTemplate=e,this.rerender()}rerender(){const e={};for(const{name:n,value:r}of this.attributes)e[n]=r;ye(O(this._render,e),this)}render(){}}function we(t,e,n={}){customElements.define(`shopify-${t}`,e,n)}function ke(t,e,n){const r={children:[],field:t,variables:e};return n&&le(r,n),r}function le(t,e){var n,r;if(e instanceof Element&&e.localName==="shopify-repeat"){const[i,o]=((n=e.getAttribute("type"))==null?void 0:n.split("."))||[],l=e.getAttribute("first");if(t.field!==i){const s=t.children.find(a=>a.field===i);s||t.children.push({field:i,children:[]}),t=s||t.children[0]}((r=t==null?void 0:t.children)==null?void 0:r.find(s=>s.field===o))||t.children.push({field:o,collection:!0,variables:{first:l?parseInt(l,10):void 0},children:[]});const f=[].find.call(e.childNodes||[],s=>s.localName==="template");if(!f)throw new Error("must have a template within shopify-repeat");t=t.children.find(s=>s.field===o),e=f.content.firstElementChild}if(e instanceof Text)se(t,e.textContent);else if(e instanceof Element){if(e.attributes.length)for(const i of e.attributes)se(t,i.value);for(const i of e.childNodes)le(t,i)}}function se(t,e){const n=e==null?void 0:e.matchAll(/{{(.*?)}}/g);if(n)for(const r of n){const[i,o]=r,l=o.trim().split(".");let c=t;for(let f=0;f<l.length;f++){const s=l[f],a=c.children.find(_=>_.field===s);c.field!==s&&(a?c=a:(c.children.push({field:s,children:[]}),c=c.children[c.children.length-1]))}}}function Te(t){return`{ ${ce(t)} }`}function ce(t){if(t.children.length===0&&!t.variables)return t.field;const e=t.collection,n=e?t.children[0].children:t.children;return`${t.field}${Ce(t.variables)} {${e?" nodes {":""} ${n.map(ce).join(" ")} ${e?"} ":""}}`}function Ce(t){return!t||!Object.keys(t).length?"":"("+Object.entries(t).map(([e,n])=>`${e}: ${typeof n=="string"?`"${n}"`:n}`).join(", ")+")"}function Ee(t){return t.replace(/<(area|base|br|col|command|embed|hr|img|input|keygen|link|meta|param|source|track|wbr)([^<>]*?)([^\/])>/gi,"<$1$2$3/>")}function V(t,e,n=!1){var r,i,o,l;if(t instanceof Element&&t.localName==="shopify-repeat"){const[c,f]=((r=t.getAttribute("type"))==null?void 0:r.split("."))||[],s=[].find.call(t.childNodes||[],_=>_.localName==="template");if(!s)throw new Error("must have a template within shopify-repeat");if(e=((o=(i=e==null?void 0:e[c])==null?void 0:i[f])==null?void 0:o.nodes)||((l=e==null?void 0:e[f])==null?void 0:l.nodes),!e||!(e!=null&&e.length))throw new Error("<shopify-repeat> must reference a collection with nodes");const a=s.content.firstElementChild;for(const _ of e){const p=a.cloneNode(!0);V(p,_,n=!0),t.appendChild(p)}return}if(t instanceof Text)t.textContent=fe(t.textContent||"",e,n);else if(t instanceof Element){if(t.attributes.length)for(const c of t.attributes)t.setAttribute(c.name,fe(c.value,e,n));for(const c of t.childNodes)V(c,e,n)}}function fe(t,e,n=!1){return t.replace(/{{(.*?)}}/g,(r,i)=>{const o=i.trim().split(".");n&&o.shift();let l=e;for(const c of o){if(!l)throw new Error("Field not found: "+i);l=l[c]}return l})}const xe="https://hydrogen-preview.myshopify.com",$e="33ad0f277e864013b8e3c21d19432501",Se="2024-04";async function Ne(t,e){try{const n={query:t,variables:e},r=await fetch(`${xe}/api/${Se}/graphql.json`,{method:"POST",headers:{"Content-Type":"application/json","X-Shopify-Storefront-Access-Token":$e},body:JSON.stringify(n)});if(!r.ok)throw new Error(`Error fetching cart: ${await r.text()}`);return await r.json()}catch(n){console.error(n)}}class Pe extends be{constructor(){super()}connectedCallback(){super.connectedCallback();const e={};for(const r of this.attributes)e[r.name]=r.value;this.queryAst=ke("collection",e,this.templates.default);const n=Te(this.queryAst);document.getElementById("query").innerText=n,console.log(n),Ne(n,{}).then(r=>{var i;if(r!=null&&r.errors){this.data=r==null?void 0:r.errors[0],this.setTemplate("error");return}else if(!((i=r==null?void 0:r.data)!=null&&i.collection)){this.setTemplate("empty");return}this.data=r.data,this.setTemplate("default")})}render(){const e=this.getTemplate(this.activeTemplate),n=this.activeTemplate==="default"||this.activeTemplate==="error"?Ae(e,this.queryAst,this.data):e;return ge([Ee(n.innerHTML)])}}function Ae(t,e,n){const r=t.cloneNode(!0);return V(r,n),r}we("collection",Pe)});
