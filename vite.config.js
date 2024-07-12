const path = require("path");
const { defineConfig } = require("vite");

const prefix = `monaco-editor/esm/vs`;

module.exports = defineConfig({
  build: {
    lib: {
      entry: {
        "shopify-components": path.resolve(__dirname, "src/main.ts"),
        editor: path.resolve(__dirname, "./editor.js"),
      },
      fileName: (format, name) => `${name}.${format}.js`,
    },
    rollupOptions: {
      output: {
        manualChunks: {
          jsonWorker: [`${prefix}/language/json/json.worker`],
          cssWorker: [`${prefix}/language/css/css.worker`],
          htmlWorker: [`${prefix}/language/html/html.worker`],
          tsWorker: [`${prefix}/language/typescript/ts.worker`],
          editorWorker: [`${prefix}/editor/editor.worker`],
        },
      },
    },
  },
});
