import { render, h } from "htm/preact";

export type TEMPLATE_TYPE = "loading" | "error" | "empty" | "default";

export class PreactElement extends HTMLElement {
  _render;
  _rerender;

  activeTemplate: TEMPLATE_TYPE = "loading";

  originalTemplates: {
    default?: HTMLTemplateElement;
    loading?: HTMLTemplateElement;
    error?: HTMLTemplateElement;
    empty?: HTMLTemplateElement;
  } = {};

  templates: {
    default?: HTMLElement;
    loading?: HTMLElement;
    error?: HTMLElement;
    empty?: HTMLElement;
  } = {};

  constructor() {
    super();
    this._render = this.render.bind(this);
    this._rerender = this.rerender.bind(this);
  }
  connectedCallback() {
    this.getTemplates();

    this.rerender();
  }
  getTemplates(): void {
    for (const child of this.children) {
      if (child.localName === "template") {
        const name = child.getAttribute("name") || "default";
        this.originalTemplates[name] = child;

        const templateContent =
          (child as HTMLTemplateElement).content?.firstElementChild ??
          child.children[0];

        if (!templateContent)
          throw new Error("The template must have a single root element");

        this.templates[name] = templateContent;
      }
    }

    if (!this.templates.default)
      throw new Error("Must have at least a default template");

    if (!this.templates.loading)
      this.templates.loading = this.templates.default;
  }
  getTemplate(name: TEMPLATE_TYPE): Element {
    return this.templates[name]!;
  }
  setTemplate(name: TEMPLATE_TYPE) {
    this.activeTemplate = name;
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
