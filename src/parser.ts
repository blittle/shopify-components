import { html } from "htm/preact";

/**
 * Process a dom element replacing all {{line}} with the values from the item.
 * Does not replace values inside nested <template> tags.
 *
 * @param A dom element
 * @param item an item to look up values from
 */
export function processTemplate(html: string, item: unknown) {
  return html.replace(
    /{{(?<!<template>[\s\S]*)(?!<\/template>)(.*?)}}/g,
    (_, key) => {
      let output = item;
      const tokens = key?.split(".");
      tokens?.slice(1, tokens.length)?.forEach((k: string) => {
        output = output?.[k];
      });
      return output as unknown as string;
    }
  );
}

/**
 *  The HTML parser in Preact requires self closing tags, but the browser does not, so the HTML
 *  needs to add them back.
 */
export function fixSelfClosingTags(html: string) {
  return html.replace(
    /<(area|base|br|col|command|embed|hr|img|input|keygen|link|meta|param|source|track|wbr)([^<>]*?)([^\/])>/gi,
    "<$1$2$3/>"
  );
}

export function renderTemplateFromItems(
  template: string,
  items: Array<{}>,
  iterationKey: string,
  attributeKey: string
) {
  if (items && template) {
    const templateMarkup = fixSelfClosingTags(template);

    return items.map((item) => {
      let Wrapper = () => {
        const result = html([
          processTemplate(templateMarkup, item),
        ] as unknown as TemplateStringsArray);
        result.props[attributeKey] = item[iterationKey];
        result.key = item[iterationKey];
        return result;
      };

      const result = html`<${Wrapper}
        key=${encodeURIComponent(item[iterationKey])}
        ${attributeKey}=${item[iterationKey]?.trim()}
      />`;
      return result;
    });
  }

  return null;
}
