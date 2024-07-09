import { render, h } from "htm/preact";
import { getDataProperties } from "./utils";

export type TEMPLATE_TYPE = "loading" | "error" | "empty" | "default";

export class PreactElement extends HTMLElement {
  _render;
  _rerender;
  properties: string[];

  activeTemplate: TEMPLATE_TYPE = "loading";

  originalTemplates: {
    default?: HTMLTemplateElement;
    loading?: HTMLTemplateElement;
    error?: HTMLTemplateElement;
    empty?: HTMLTemplateElement;
  };

  templates: {
    default?: string;
    loading?: string;
    error?: string;
    empty?: string;
  } = {};

  constructor() {
    super();
    this._render = this.render.bind(this);
    this._rerender = this.rerender.bind(this);
    this.originalTemplates = {};
    this.templates = {};
  }
  connectedCallback() {
    this.getTemplates();
    this.properties = getDataProperties(this.getTemplate("default"));
    this.activeTemplate = "loading";
    this.rerender();
  }
  rerender() {
    const props = {};
    for (const { name, value } of this.attributes) props[name] = value;
    render(h(this._render, props), this);
  }
  setTemplate(name: TEMPLATE_TYPE) {
    this.activeTemplate = name;
    this.rerender();
  }
  render() {}

  getTemplate(name: TEMPLATE_TYPE): string {
    return this.templates[name]!;
  }

  getTemplates(): void {
    for (const child of this.children) {
      if (child.localName === "template") {
        const name = child.getAttribute("name") || "default";
        this.originalTemplates[name] = child;

        const templateContent =
          child.content?.firstElementChild ?? child.children[0];

        if (!templateContent)
          throw new Error("The template must have a single root element");

        this.templates[name] = templateContent.outerHTML;
      }
    }

    if (!this.templates.default)
      throw new Error("Must have at least a default template");

    if (!this.templates.loading)
      this.templates.loading = this.templates.default;
  }
}

export function createCustomElement(
  name: string,
  impl: CustomElementConstructor,
  opts: ElementDefinitionOptions = {}
) {
  customElements.define(`shopify-${name}`, impl, opts);
}
