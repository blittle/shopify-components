import { cartClient } from "../cart-client";
import { createCustomAttribute, CustomAttribute } from "../custom-attribute";

class AddLineItem extends CustomAttribute {
  addLine: () => Promise<void>;

  constructor(el: Element) {
    super(el);
    const variant = el.getAttribute("shopify-add-line-item");
    if (!variant) throw new Error("Must define a variant ID");

    this.addLine = async () => {
      el.setAttribute("disabled", "true");

      await cartClient.addCartLines([{ merchandiseId: variant, quantity: 1 }]);

      el.removeAttribute("disabled");
    };
  }

  connectedCallback(): void {
    this.el.addEventListener("click", this.addLine);
  }

  disconnectedCallback(el: Element): void {
    this.el.removeEventListener("click", this.addLine);
  }
}

createCustomAttribute("add-line-item", AddLineItem);
