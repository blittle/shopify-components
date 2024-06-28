import { html } from "htm/preact";

import { createCustomElement, PreactElement } from "../custom-element";
import { getCart } from "./cart";
import { CartLine } from "@shopify/hydrogen/storefront-api-types";
import { flattenConnection } from "@shopify/hydrogen";
import { PartialDeep } from "type-fest";

interface CartLineElement extends HTMLElement {
  _item: CartLine;
}

createCustomElement(
  "cart-line",
  class extends PreactElement {
    _children: Node[] = [];
    _template: HTMLTemplateElement;
    template: HTMLElement;

    constructor() {
      super();
      this._getTpl();
    }

    _getTpl() {
      if (this._template) return;
      const tpl = [].find.call(
        this.children || [],
        (n) =>
          n.name === "template" ||
          (n.localName === "template" && !n.hasAttribute("shadowrootmode"))
      );
      if (!tpl) return;
      this._template = tpl;
      this.template =
        tpl.content?.firstElementChild ??
        tpl.children.find((n) => n.type === "tag");
    }

    render() {
      const { data: cart } = getCart(this);
      let items = (
        cart?.lines ? flattenConnection(cart.lines) : []
      ) as CartLine[];

      if (items && this.template) {
        if (!Array.isArray(items)) items = [items];
        let prev = this._children;
        this._children = items.map((item) => {
          let match = prev.find((p) => (p as CartLineElement)._item === item);
          if (match) return match;
          const n = this.template.cloneNode(true) as CartLineElement;
          n._item = item;
          n.setAttribute("data-cart-line", "true");
          return n;
        });
        this.replaceChildren(this._template, ...this._children);
      }
      return html`<style>
          :host {
            display: contents;
          }</style
        ><slot />`;
    }
  }
);

export function getCartLine(el: Element) {
  const lineElement = el.closest("[data-cart-line]") as CartLineElement;
  if (!lineElement) throw new Error("Unable to find cart line element");
  return lineElement._item as PartialDeep<CartLine>;
}
