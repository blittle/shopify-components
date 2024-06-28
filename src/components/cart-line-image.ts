import { html } from "htm/preact";
import { createCustomElement, PreactElement } from "../custom-element";
import { getCartLine } from "./cart-line";

createCustomElement(
  "cart-line-image",
  class extends PreactElement {
    constructor() {
      super();
    }

    render() {
      const width = this.getAttribute("width") || 128;
      const height = this.getAttribute("height") || 128;

      const line = getCartLine(this);
      const img = line?.merchandise?.image;
      return (
        img &&
        html`
          <style>
            :host {
              display: flex;
            }
            img {
              width: ${width + "".trim()}px;
              height: ${height + "".trim()}px;
              object-fit: contain;
            }
          </style>

          <${Image} ...${img} width=${width} height=${height} />
        `
      );
    }
  }
);

function Image(img) {
  const scale = 128 / Math.max(img.width, img.height);
  const width = scale * img.width;
  const height = scale * img.height;
  return html`<img
    src=${img.url + "&width=" + img.width * 1.5 + "&height=" + img.height * 1.5}
    width=${width}
    height=${height}
  />`;
}
