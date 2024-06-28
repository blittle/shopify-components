import { createCustomElement, PreactElement } from "../custom-element";
import { getCart } from "./cart";

createCustomElement(
  "cart-subtotal-amount",
  class extends PreactElement {
    constructor() {
      super();
    }

    render() {
      const cart = getCart(this);
      return cart?.data?.cost?.subtotalAmount?.amount;
    }
  }
);
