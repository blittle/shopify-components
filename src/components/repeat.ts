import type { Cart as CartType } from "@shopify/hydrogen/storefront-api-types";
import { PartialDeep } from "type-fest";
import { cartClient, ShopifyCart } from "../cart-client";
import { createCustomElement, PreactElement } from "../custom-element";
import { queueData, renderTemplate } from "../utils";

class Repeat extends PreactElement {
  _fetchData: () => void;
  data: PartialDeep<CartType> | undefined;
  cart: ShopifyCart;
  error: Error | undefined;

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
    const prefix = this.getAttribute("data");

    if (!prefix) {
      throw new Error("data attribute is required");
    }

    queueData(
      this.properties.map(
        (prop) => prefix + "." + prop.substring(prop.indexOf(".") + 1)
      ),
      {
        cart: {
          id: cartClient.cartId,
        },
        [prefix.substring(prefix.lastIndexOf(".") + 1)]: {
          first: parseInt(this.getAttribute("first")!, 10),
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

createCustomElement("repeat", Repeat);
