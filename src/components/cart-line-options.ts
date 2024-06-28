import { html } from "htm/preact";

import { createCustomElement, PreactElement } from "../custom-element";
import { type SelectedOption } from "@shopify/hydrogen/storefront-api-types";
import { getCartLine } from "./cart-line";
import { PartialDeep } from "type-fest";

interface CartLineOptionElement extends HTMLElement {
  _item: SelectedOption;
}

createCustomElement(
  "cart-line-options",
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
      const line = getCartLine(this);
      let items = (line?.merchandise?.selectedOptions ??
        []) as SelectedOption[];

      if (items && this.template) {
        if (!Array.isArray(items)) items = [items];
        let prev = this._children;
        this._children = items.map((item) => {
          let match = prev.find(
            (p) => (p as CartLineOptionElement)._item === item
          );
          if (match) return match;
          const n = this.template.cloneNode(true) as CartLineOptionElement;
          n._item = item;
          n.setAttribute("data-cart-option", "true");
          n.style.setProperty("--shopify-cart-line-option-name", item.name);
          n.style.setProperty("--shopify-cart-line-option-value", item.value);
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

export function getCartLineOption(el: Element) {
  const lineElement = el.closest("[data-cart-option]") as CartLineOptionElement;
  if (!lineElement) throw new Error("Unable to find cart line element");
  return lineElement._item as PartialDeep<SelectedOption>;
}
