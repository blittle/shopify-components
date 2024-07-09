import { createCustomElement, PreactElement } from "../custom-element";
import { getCart } from "./cart";
import { CartLine } from "@shopify/hydrogen/storefront-api-types";
import { flattenConnection } from "@shopify/hydrogen";
import { getDataProperties, renderTemplateFromItems } from "../utils";

interface CartLineElement extends HTMLElement {
  _item: CartLine;
}

createCustomElement(
  "cart-line",
  class extends PreactElement {
    _children: CartLineElement[] = [];
    items: CartLine[] = [];

    constructor() {
      super();
    }

    render() {
      const template = this.getTemplate();
      const properties = getDataProperties(template);

      console.log(properties);

      const { data: cart } = getCart(this);
      let items = (
        cart?.lines ? flattenConnection(cart.lines) : []
      ) as CartLine[];

      this.items = items;

      return renderTemplateFromItems(
        template,
        items,
        "id",
        "data-cart-line-id"
      );
    }
  }
);

export function getCartLine(el: Element) {
  const lineElement = el.closest("[data-cart-line-id]") as CartLineElement;
  if (!lineElement) throw new Error("Unable to find cart line element");
  const lineId = lineElement.getAttribute("data-cart-line-id");
  return el
    ?.closest("shopify-cart-line")
    ?.items?.find((item) => item.id === lineId);
}
