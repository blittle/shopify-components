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
  },
});
