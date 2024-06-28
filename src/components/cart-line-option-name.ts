import { createCustomElement, PreactElement } from "../custom-element";
import { getCartLineOption } from "./cart-line-options";

createCustomElement(
  "cart-line-option-name",
  class extends PreactElement {
    constructor() {
      super();
    }

    render() {
      const option = getCartLineOption(this);
      return option.name;
    }
  }
);
