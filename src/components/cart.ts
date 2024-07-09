import type { Cart as CartType } from "@shopify/hydrogen/storefront-api-types";
import { PartialDeep } from "type-fest";
import { ShopifyCart } from "../cart-client";
import { createCustomElement, PreactElement } from "../custom-element";
import { cartClient } from "../cart-client";
import { queueData, renderTemplate } from "../utils";

interface CartUpdateEvent extends Event {
  detail?: PartialDeep<CartType>;
}

class Cart extends PreactElement {
  data: PartialDeep<CartType> | undefined;
  cart: ShopifyCart;
  error: Error | undefined;
  _fetchData: () => void;

  constructor() {
    super();
    this._fetchData = this.fetchData.bind(this);
  }

  connectedCallback(): void {
    super.connectedCallback();

    cartClient.addCartUpdateListener(this._fetchData);
    cartClient.initialized.then(this._fetchData);
  }

  disconnectedCallback() {
    cartClient.removeCartUpdateListener(this._fetchData);
  }

  fetchData() {
    queueData(
      this.properties,
      {
        cart: {
          id: cartClient.cartId,
        },
      },
      {
        fragmentExtends: {
          merchandise: "... on ProductVariant",
        },
        callback: ({ data, error }) => {
          if (error) {
            this.activeTemplate = "error";
            this.error = error;
          } else if (!data?.cart) {
            this.activeTemplate = "empty";
          } else {
            this.activeTemplate = "default";
            this.data = data;
          }
          this._rerender();
        },
        ignoreCache: true,
      }
    );
  }

  render() {
    const template = this.getTemplate(this.activeTemplate);
    return renderTemplate(template ?? "", this.data);
  }
}

createCustomElement("cart", Cart);
