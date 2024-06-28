import { createCustomElement, PreactElement } from "../custom-element";
import { getCartLine } from "./cart-line";

createCustomElement(
  "cart-line-title",
  class extends PreactElement {
    constructor() {
      super();
    }

    render() {
      const line = getCartLine(this);
      return line?.merchandise?.product?.title;
    }
  }
);
