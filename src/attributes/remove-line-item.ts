import { type Cart } from "@shopify/hydrogen/storefront-api-types";
import { getCart } from "../components/cart";
import { getCartLine } from "../components/cart-line";
import { createCustomAttribute, CustomAttribute } from "../custom-attribute";
import { cartEmitter } from "../event-emitter";

class RemoveLineItem extends CustomAttribute {
  removeLine: () => Promise<void>;

  constructor(el: Element) {
    super(el);
    const variant = el.getAttribute("shopify-remove-line-item");

    this.removeLine = async () => {
      el.setAttribute("disabled", "true");
      const { cart } = getCart(el);
      const line = getCartLine(el);

      let cartResponse: Cart | void;

      if (variant) cartResponse = await cart.removeCartLines([variant]);
      else if (line.id) cartResponse = await cart.removeCartLines([line.id]);
      else throw new Error("Must define a variant ID or cart line ID");

      cartEmitter.emit("cart:updated", cartResponse);
      el.removeAttribute("disabled");
    };
  }

  connectedCallback(): void {
    this.el.addEventListener("click", this.removeLine);
  }

  disconnectedCallback(el: Element): void {
    this.el.removeEventListener("click", this.removeLine);
  }
}

createCustomAttribute("remove-line-item", RemoveLineItem);
