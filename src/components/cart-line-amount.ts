import { createCustomElement, PreactElement } from "../custom-element";
import { getCartLine } from "./cart-line";

createCustomElement(
  "cart-line-amount",
  class extends PreactElement {
    constructor() {
      super();
    }

    render() {
      const line = getCartLine(this);
      return line?.cost?.totalAmount?.amount;
    }
  }
);
