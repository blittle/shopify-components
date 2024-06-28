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
              width: 128px;
              height: 128px;
              object-fit: contain;
            }
          </style>

          <${Image} ...${img} width=${128} height=${128} />
        `
      );
    }
  }
);

function Image(img) {
  const scale = 128 / Math.max(img.width, img.height);
  const width = scale * img.width;
  const height = scale * img.height;
  return html`<img src=${img.url} width=${width} height=${height} />`;
}
