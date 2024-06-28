import type { Cart as CartType } from "@shopify/hydrogen/storefront-api-types";
import { PartialDeep } from "type-fest";
import { ShopifyCart } from "../cart-client";
import { createCustomElement, PreactElement } from "../custom-element";
import { cartEmitter } from "../event-emitter";

interface CartUpdateEvent extends Event {
  detail?: PartialDeep<CartType>;
}

class Cart extends PreactElement {
  data: PartialDeep<CartType> | undefined;
  cart: ShopifyCart;

  constructor() {
    super();

    this.cart = new ShopifyCart({
      storefront: "https://hydrogen-preview.myshopify.com",
      accessToken: "33ad0f277e864013b8e3c21d19432501",
      apiVersion: "2024-04",
      storage: "session",
    });

    this.cart.getCart().then((data) => {
      if (data) {
        this.data = data;
        cartEmitter.emit("cart:initialized", data);
      }
    });

    cartEmitter.on("cart:updated", (event: CartUpdateEvent) => {
      this.data = event?.detail;
    });
  }
}

createCustomElement("cart", Cart);

export function getCart(el) {
  const cartElement = el.closest("shopify-cart") as Cart;
  if (!cartElement) {
    throw new Error(
      "Could not find cart element. Make sure your have a <cart> element in your template that wraps all other cart components."
    );
  }

  return { cart: cartElement.cart, data: cartElement.data };
}
