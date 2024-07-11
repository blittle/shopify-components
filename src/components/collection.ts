import type { Collection as CollectionType } from "@shopify/hydrogen/storefront-api-types";
import { PartialDeep } from "type-fest";
import { html } from "htm/preact";
import { createCustomElement, PreactElement } from "../custom-element";
import {
  buildQuery,
  fixSelfClosingTags,
  buildQueryAst,
  QueryAst,
  renderNode,
} from "../query-builder";
import { gqlRequest } from "../graphql";

type CollectionData = PartialDeep<CollectionType> | undefined;

class Collection extends PreactElement {
  data: CollectionData;
  originalTemplate: HTMLTemplateElement;
  template: HTMLElement;
  queryAst: QueryAst;

  constructor() {
    super();
  }

  connectedCallback(): void {
    super.connectedCallback();

    const variables = {};

    for (const attr of this.attributes) {
      variables[attr.name] = attr.value;
    }

    this.queryAst = buildQueryAst(
      "collection",
      variables,
      this.templates.default
    );
    const query = buildQuery(this.queryAst);
    document.getElementById("query")!.innerText = query;
    console.log(query);

    gqlRequest<{ collection: CollectionData | null }>(query, {}).then(
      (resp) => {
        if (resp?.errors) {
          this.data = resp?.errors[0];
          this.setTemplate("error");
          return;
        } else if (!resp?.data?.collection) {
          this.setTemplate("empty");
          return;
        }
        this.data = resp.data;
        this.setTemplate("default");
      }
    );
  }

  render() {
    const template = this.getTemplate(this.activeTemplate);

    const renderedTemplate =
      this.activeTemplate === "default" || this.activeTemplate === "error"
        ? renderTemplate(template, this.queryAst, this.data)
        : template;

    return html([
      fixSelfClosingTags(renderedTemplate.innerHTML),
    ] as unknown as TemplateStringsArray);
  }
}

function renderTemplate(
  template: Element,
  ast: QueryAst,
  data: CollectionData
) {
  const node = template.cloneNode(true);

  renderNode(node, data);

  return node;
}

createCustomElement("collection", Collection);
