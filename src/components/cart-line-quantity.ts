import { createCustomElement, PreactElement } from "../custom-element";
import { getCartLine } from "./cart-line";

createCustomElement(
  "cart-line-quantity",
  class extends PreactElement {
    constructor() {
      super();
    }

    render() {
      const line = getCartLine(this);
      return line?.quantity;
    }
  }
);
