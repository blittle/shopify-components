"use strict";var j={},K=Symbol(),_=Symbol(),oe=e=>typeof e=="string"?w[e]:e,w={plain:j,plaintext:j,text:j,txt:j},de=(e,t)=>(t[_]||Te)(e,t),Te=(e,t)=>{for(var i=[e],s,a=[],c=0;s=oe(t[K]);)delete t[K],Object.assign(t,s);for(pe(e,t,i,0);a[c++]=i[0],i=i[1];);return a},ie="</span>",F="",R="",ce=e=>{for(var t="",i=e.length,s=0;s<i;)t+=ue(e[s++]);return t},ue=e=>{if(e instanceof B){var{type:t,alias:i,content:s}=e,a=F,c=R,u=`<span class="token ${t+(i?" "+i:"")+(t=="keyword"&&typeof s=="string"?" keyword-"+s:"")}">`;R+=ie,F+=u;var o=ue(s);return F=a,R=c,u+o+ie}return typeof e!="string"?ce(e):(e=e.replace(/&/g,"&amp;").replace(/</g,"&lt;"),R&&e.includes(`
`)?e.replace(/\n/g,R+`
`+F):e)},pe=(e,t,i,s,a)=>{for(var c in t)if(t[c])for(var u=0,o=t[c],I=Array.isArray(o)?o:[o];u<I.length;++u){if(a&&a[0]==c&&a[1]==u)return;for(var E=I[u],P=E.pattern||E,x=oe(E.inside),M=E.lookbehind,A=E.greedy&&P.global,z=E.alias,d=i,f=s;d&&(!a||f<a[2]);f+=d[0].length,d=d[1]){var h=d[0],k=0,l,v;if(!(h instanceof B)){if(P.lastIndex=A?f:0,l=P.exec(A?e:h),l&&M&&l[1]&&(v=l[1].length,l.index+=v,l[0]=l[0].slice(v)),A){if(!l)break;if(l[0]){for(var m=l.index,W=m+l[0].length,S;m>=f+(S=d[0].length);d=d[1],f+=S);if(d[0]instanceof B)continue;for(var G=d,o=f;(o+=G[0].length)<W;G=G[1],k++);h=e.slice(f,o),l.index-=f}}if(l&&l[0]){for(var m=l.index,q=l[0],C=h.slice(m+q.length),b=f+h.length,D=new B(c,x?de(q,x):q,q,z),g=d,Y=0,O;g=g[1],Y++<k;);C&&(!g||g[0]instanceof B?g=[C,g]:g[0]=C+g[0]),f+=m,d[0]=m?h.slice(0,m):D,m?d=d[1]=[D,g]:d[1]=g,k&&(pe(e,t,d,f,O=[c,u,b]),b=O[2]),a&&b>a[2]&&(a[2]=b)}}}}};function B(e,t,i,s){this.type=e,this.content=t,this.alias=s,this.length=i.length}const Ee=(e,t,...i)=>{var te;let s,a,c=[],u,o="",I,E=!1,P=!1,x=!0,M=[],A,z=0;const d=$e(),f=d.firstChild,h=f.children,k=h[0],l=k.firstChild,v={language:"text",value:o},W=new Set(i),S={},G=r=>{if(Object.assign(v,r),o=r.value??o,s=v.language,!w[s])throw Error(`Language '${s}' has no grammar.`);A=!!v.readOnly,d.style.tabSize=v.tabSize||2,l.inputMode=A?"none":"",l.setAttribute("aria-readonly",A),C(),q(),(a!=(a=w[s])||o!=l.value)&&(Y(),l.value=o,l.selectionEnd=0,m())},m=()=>{M=de(o=l.value,a),O("tokenize",M,s,o);let r=ce(M).split(`
`),n=0,p=z,T=z=r.length;for(;r[n]==c[n]&&n<T;)++n;for(;T&&r[--T]==c[--p];);if(n==T&&n==p)h[n+1].innerHTML=r[n]+`
`;else{let H=p<n?p:n-1,$=H,X="";for(;$<T;)X+=`<div class=pce-line aria-hidden=true>${r[++$]}
</div>`;for($=T<n?T:n-1;$<p;$++)h[n+1].remove();for(X&&h[H+1].insertAdjacentHTML("afterend",X),$=H+1;$<z;)h[++$].setAttribute("data-line",$);d.style.setProperty("--number-width",Math.ceil(Math.log10(z+1))+".001ch")}O("update",o),Q(!0),x&&setTimeout(setTimeout,0,()=>x=!0),c=r,x=!1},q=r=>{(r||W).forEach(n=>{typeof n=="object"?(n.update(y,v),r&&W.add(n)):(n(y,v),r||W.delete(n))})},C=([r,n]=b())=>{d.className=`prism-code-editor language-${s}${v.lineNumbers==!1?"":" show-line-numbers"} pce-${v.wordWrap?"":"no"}wrap${v.rtl?" pce-rtl":""} pce-${r<n?"has":"no"}-selection${P?" pce-focus":""}${A?" pce-readonly":""}`},b=()=>[l.selectionStart,l.selectionEnd,l.selectionDirection],D={Escape(){l.blur()}},g={},Y=()=>me&&!P&&L(y,"focus",r=>{let n=r.relatedTarget;n?n.focus():l.blur()},{once:!0}),O=(r,...n)=>{var p,T;(p=S[r])==null||p.forEach(H=>H.apply(y,n)),(T=v["on"+r[0].toUpperCase()+r.slice(1)])==null||T.apply(y,n)},Q=r=>{if(r||x){const n=b(),p=h[I=ye(o,0,n[n[2]<"f"?0:1])];p!=u&&(u==null||u.classList.remove("active-line"),p.classList.add("active-line"),u=p),C(n),O("selectionChange",n,o)}},y={scrollContainer:d,wrapper:f,overlays:k,textarea:l,get activeLine(){return u},get activeLineNumber(){return I},get value(){return o},options:v,get focused(){return P},get removed(){return E},get tokens(){return M},inputCommandMap:g,keyCommandMap:D,extensions:{},setOptions:G,update:m,getSelection:b,setSelection(r,n=r,p){Y(),l.setSelectionRange(r,n,p),Q(!0)},addExtensions(...r){q(r)},addListener(r,n){(S[r]||(S[r]=new Set)).add(n)},removeListener(r,n){var p;(p=S[r])==null||p.delete(n)},remove(){d.remove(),E=!0}};return L(y,"keydown",r=>{var n;(n=D[r.key])!=null&&n.call(D,r,b(),o)&&J(r)}),L(y,"beforeinput",r=>{var n;(A||r.inputType=="insertText"&&((n=g[r.data])!=null&&n.call(g,r,b(),o)))&&J(r)}),L(y,"input",m),L(y,"blur",()=>{U=null,P=!1,C()}),L(y,"focus",()=>{U=Q,P=!0,C()}),L(y,"selectionchange",r=>{Q(),J(r)}),(te=ge(e))==null||te.append(d),y},re=document.createElement("div"),ve=e=>{re.innerHTML=e;const t=re.firstChild;return()=>t.cloneNode(!0)},L=(e,t,i,s)=>e.textarea.addEventListener(t,i,s),ge=e=>typeof e=="string"?document.querySelector(e):e,fe=navigator.userAgent,Pe=/Mac|iPhone|iPod|iPad/i.test(navigator.platform),he=/Chrome\//.test(fe),me=!he&&/AppleWebKit\//.test(fe),ye=(e,t=0,i=1/0)=>{let s=1;for(;(t=e.indexOf(`
`,t)+1)&&t<=i;s++);return s},Ae={},$e=ve("<div><div class=pce-wrapper><div class=pce-overlays><textarea spellcheck=false autocapitalize=off autocomplete=off>"),J=e=>{e.preventDefault(),e.stopImmediatePropagation()};let U;document.addEventListener("selectionchange",()=>U==null?void 0:U());const Z=Object.assign({"./atom-one-dark.css":()=>Promise.resolve().then(()=>require("./atom-one-dark-BNeHnmGQ.js")),"./dracula.css":()=>Promise.resolve().then(()=>require("./dracula-BHL8x416.js")),"./github-dark-dimmed.css":()=>Promise.resolve().then(()=>require("./github-dark-dimmed-OUbNLqrT.js")),"./github-dark.css":()=>Promise.resolve().then(()=>require("./github-dark-wpzJKil2.js")),"./github-light.css":()=>Promise.resolve().then(()=>require("./github-light-T0fVyPD_.js")),"./night-owl.css":()=>Promise.resolve().then(()=>require("./night-owl-BhZtkTQc.js")),"./prism-okaidia.css":()=>Promise.resolve().then(()=>require("./prism-okaidia-jy5xjkb1.js")),"./prism-solarized-light.css":()=>Promise.resolve().then(()=>require("./prism-solarized-light-BA42bG2L.js")),"./prism-tomorrow.css":()=>Promise.resolve().then(()=>require("./prism-tomorrow-Bo9u09S3.js")),"./prism-twilight.css":()=>Promise.resolve().then(()=>require("./prism-twilight-DFaUkrLP.js")),"./prism.css":()=>Promise.resolve().then(()=>require("./prism-6F6wFRi--D_nWgdyt.js")),"./vs-code-dark.css":()=>Promise.resolve().then(()=>require("./vs-code-dark-Ck-wRyqI-CiXf5stv.js")),"./vs-code-light.css":()=>Promise.resolve().then(()=>require("./vs-code-light-BVpjIkx5.js"))}),Ce=async e=>{var t,i;return(i=await((t=Z[`./${e}.css`])==null?void 0:t.call(Z)))==null?void 0:i.default},ne=(e,t,i)=>{const s=document.createElement("style");s.textContent=t,i&&(s.id=i),e.append(s)},Le=(e,t,i)=>{const s=ge(e),a=s.shadowRoot||s.attachShadow({mode:"open"}),c=Ee();return Promise.all([Promise.resolve().then(()=>require("./styles-BkdUywD_-V1e5iUz0.js")),Ce(t.theme)]).then(([u,o])=>{c.removed||(ne(a,u.default),ne(a,o||"","theme"),a.append(c.scrollContainer),c.setOptions(t),i&&i())}),c},xe=(e,t,i)=>{Promise.resolve().then(()=>require("./common-DCv-f2YW-CvwqV5YT.js")).then(a=>{s.addExtensions(...a.common())});const s=Le(e,t,i);return s};var V=(e,t)=>{if(t.has(e))return t.get(e);var i=e,s=De.call(e).slice(8,-1);if(s=="Object"){t.set(e,i={});for(var a in e)i[a]=V(e[a],t);e[K]&&(i[K]=V(e[K],t)),e[_]&&(i[_]=e[_])}else if(s=="Array"){t.set(e,i=[]);for(var c=0,u=e.length;c<u;c++)i[c]=V(e[c],t)}return i},Se=e=>V(e,new Map),qe=(e,t,i)=>{var s={};for(var a in e)s[a]=e[a],delete e[a];for(var a in s)a==t&&Object.assign(e,i),i.hasOwnProperty(a)||(e[a]=s[a])},De={}.toString,we=[{pattern:/&[a-z\d]{1,8};/i,alias:"named-entity"},/&#x?[a-f\d]{1,8};/i],Me={pattern:/<\/?(?!\d)[^\s/=>$<%]+(?:\s(?:\s*[^\s/=>]+(?:\s*=\s*(?!\s)(?:"[^"]*"|'[^']*'|[^\s"'=>]+(?=[\s>]))?|(?=[\s/>])))+)?\s*\/?>/g,greedy:!0,inside:{punctuation:/^<\/?|\/?>$/,tag:{pattern:/^\S+/,inside:{namespace:/^[^:]+:/}},"attr-value":[{pattern:/(=\s*)(?:"[^"]*"|'[^']*'|[^\s"'=>]+)/g,lookbehind:!0,greedy:!0,inside:{punctuation:/^["']|["']$/,entity:we}}],"attr-equals":/=/,"attr-name":{pattern:/\S+/,inside:{namespace:/^[^:]+:/}}}};w.rss=w.atom=w.ssml=w.xml={comment:{pattern:/<!--(?:(?!<!--)[^])*?-->/g,greedy:!0},prolog:{pattern:/<\?[^]+?\?>/g,greedy:!0},doctype:{pattern:/<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/gi,greedy:!0,inside:{"internal-subset":{pattern:/(\[)[^]+(?=\]\s*>$)/,lookbehind:!0,inside:"xml"},string:/"[^"]*"|'[^']*'/,punctuation:/^<!|[>[\]]/,"doctype-tag":/^DOCTYPE/i,name:/\S+/}},cdata:{pattern:/<!\[CDATA\[[^]*?\]\]>/gi,greedy:!0},tag:Me,entity:we,"markup-bracket":{pattern:/[()[\]{}]/,alias:"punctuation"}};var N=(e,t)=>(e["language-"+t]={pattern:/[^]+/,inside:t},e),se=(e,t)=>({pattern:RegExp(`(<${e}[^>]*>)(?!</${e}>)(?:<!\\[CDATA\\[(?:[^\\]]|\\](?!\\]>))*\\]\\]>|(?!<!\\[CDATA\\[)[^])+?(?=</${e}>)`,"gi"),lookbehind:!0,greedy:!0,inside:N({"included-cdata":{pattern:/<!\[CDATA\[[^]*?\]\]>/i,inside:N({cdata:/^<!\[CDATA\[|\]\]>$/i},t)}},t)}),ae=(e,t)=>({pattern:RegExp(`((?:^|["'\\s])(?:${e})\\s*=\\s*)(?:"[^"]*"|'[^']*'|[^\\s"'=>]+)`,"gi"),lookbehind:!0,greedy:!0,inside:N({punctuation:/^["']|["']$/},t)}),be=w.svg=w.mathml=w.html=w.markup=Se(w.xml);be.tag.inside["attr-value"].unshift(ae("style","css"),ae("on[a-z]+","javascript"));qe(be,"cdata",{style:se("style","css"),script:se("script","javascript")});const ze=`
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
    `.trim(),ke=xe("#code-editor",{language:"html",theme:"github-dark",value:ze,onUpdate:e=>{ee(e)}},()=>console.log("ready"));let le;ke.getModel().onDidChangeContent(ee);ee();function ee(e){clearTimeout(le),le=setTimeout(()=>{const t=`
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

    `,i=document.createElement("iframe");i.style.width="100%",i.style.height="100%",i.setAttribute("frameborder","0"),document.getElementById("preview").replaceChild(i,document.getElementById("preview").firstChild),i.contentWindow.document.open(),i.contentWindow.document.write(t),i.contentWindow.document.close()},500)}exports.addTextareaListener=L;exports.createTemplate=ve;exports.isChrome=he;exports.isMac=Pe;exports.isWebKit=me;exports.languageMap=Ae;exports.numLines=ye;exports.preventDefault=J;
