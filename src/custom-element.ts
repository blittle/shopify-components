import { render, h } from "htm/preact";
import { cartEmitter } from "./event-emitter";

export class PreactElement extends HTMLElement {
  _render;
  _rerender;

  constructor() {
    super();
    this._render = this.render.bind(this);
    this._rerender = this.rerender.bind(this);

    cartEmitter.on("cart:initialized", this._rerender);
    cartEmitter.on("cart:updated", this._rerender);
  }
  disconnectedCallback() {
    cartEmitter.off("cart:initialized", this._rerender);
    cartEmitter.off("cart:updated", this._rerender);
  }
  connectedCallback() {
    this.rerender();
  }
  rerender() {
    const props = {};
    for (const { name, value } of this.attributes) props[name] = value;
    render(h(this._render, props), this);
  }
  render() {}
}

export function createCustomElement(
  name: string,
  impl: CustomElementConstructor,
  opts: ElementDefinitionOptions = {}
) {
  customElements.define(`shopify-${name}`, impl, opts);
}
