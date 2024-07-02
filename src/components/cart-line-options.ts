import { html } from "htm/preact";

import { createCustomElement, PreactElement } from "../custom-element";
import { type SelectedOption } from "@shopify/hydrogen/storefront-api-types";
import { getCartLine } from "./cart-line";
import { PartialDeep } from "type-fest";
import { renderTemplateFromItems } from "../parser";

interface CartLineOptionElement extends HTMLElement {
  _item: SelectedOption;
}

createCustomElement(
  "cart-line-options",
  class extends PreactElement {
    items: SelectedOption[] = [];

    constructor() {
      super();
    }

    render() {
      this.getTemplate();
      const line = getCartLine(this);
      let items = (line?.merchandise?.selectedOptions ??
        []) as SelectedOption[];
      this.items = items;

      return renderTemplateFromItems(
        this.template?.outerHTML,
        items,
        "name",
        "data-cart-line-id"
      );
    }
  }
);

export function getCartLineOption(el: Element) {
  const lineElement = el.closest("[data-cart-option]") as CartLineOptionElement;
  if (!lineElement) throw new Error("Unable to find cart line element");
  return lineElement._item as PartialDeep<SelectedOption>;
}
