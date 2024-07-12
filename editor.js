import * as monaco from "monaco-editor";

import "monaco-editor/esm/vs/basic-languages/css/css.contribution";
import "monaco-editor/esm/vs/basic-languages/xml/xml.contribution";
import "monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution";

import EditorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import TsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";
import JsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import CssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import HtmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === "typescript" || label === "javascript") return new TsWorker();
    if (label === "json") return new JsonWorker();
    if (label === "css") return new CssWorker();
    if (label === "html") return new HtmlWorker();
    return new EditorWorker();
  },
};

const editor = monaco.editor.create(document.getElementById("code-editor"), {
  value: `
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
    `.trim(),
  language: "html",
});

let timeout;

editor.getModel().onDidChangeContent(updatePreivew);

updatePreivew();

function updatePreivew() {
  clearTimeout(timeout);

  timeout = setTimeout(() => {
    const value = editor.getModel().getValue();

    const html = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script type="module" src="./dist/shopify-components.es.js"></script>
  </head>
  <body style="position: relative">
    ${value}
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

    `;
    const iframe = document.createElement("iframe");
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.setAttribute("frameborder", "0");
    document
      .getElementById("preview")
      .replaceChild(iframe, document.getElementById("preview").firstChild);
    iframe.contentWindow.document.open();
    iframe.contentWindow.document.write(html);
    iframe.contentWindow.document.close();
  }, 500);
}
