import { html } from "htm/preact";
import { graphqlRequest } from "./graphql";

/**
 * Process a dom element replacing all {{line}} with the values from the item.
 * Does not replace values inside nested <template> tags.
 *
 * @param A dom element
 * @param item an item to look up values from
 */
export function processTemplate(html: string, item: unknown) {
  const templates: string[] = [];

  return html
    .replace(/<template>([\s\S]*?)<\/template>/g, (_, template: string) => {
      templates.push(template);
      return "__TEMPLATE__";
    })
    .replace(/{{(?<!<template>[\s\S]*)(?!<\/template>)(.*?)}}/g, (_, key) => {
      let output = item;
      const tokens = key?.split(".");
      tokens?.forEach((k: string) => {
        output = output?.[k];
      });
      return output as unknown as string;
    })
    .replace(
      /__TEMPLATE__/g,
      () => `<template>${templates.shift() || ""}</template>`
    );
}

export function getDataProperties(html: string) {
  const properties: string[] = [];

  const matches = html
    .replace(/<template>([\s\S]*?)<\/template>/g, "__TEMPLATE__")
    .matchAll(/{{(.*?)}}/g);
  if (!matches) return properties;

  for (let match of matches) {
    if (match[1]) properties.push(match[1]);
  }

  return properties;
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

export function renderTemplate(template: string, item: unknown) {
  const templateMarkup = fixSelfClosingTags(template);

  return html([
    processTemplate(templateMarkup, item),
  ] as unknown as TemplateStringsArray);
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

const properties = [
  "chckoutUrl",
  "totalQuantity",
  "cost.subtotalAmount.amount",
  "lines.merchandise.image.url",
  "lines.merchandise.title",
  "lines.cost.totalAmount.amount",
];

const KEYS_WITH_NODES = ["lines"];

function buildTree(properties: string[]) {
  const tree = {};

  properties.forEach((property) => {
    const tokens = property.split(".");

    let current = tree;
    tokens.forEach((token) => {
      if (!current[token]) {
        current[token] = {};
      }
      current = current[token];
    });
  });

  return tree;
}

type QueryVariables = Record<
  string,
  { first?: number; id?: string; handle?: string }
>;

type QueryOptions = {
  fragmentExtends?: Record<string, string>;
  ignoreCache?: boolean;
  callback?: (data: any) => void;
};

function buildQuery({
  properties,
  variables,
  options,
}: {
  properties: string[];
  variables: QueryVariables;
  options: QueryOptions;
}) {
  const tree = buildTree(properties);

  function buildFragmentFromTree(
    tree: {},
    variables: QueryVariables,
    options: QueryOptions,
    level = 2
  ) {
    let fragment = "";
    const spacing = Array(level).join(" ");

    for (const key in tree) {
      const extendsFragment = options.fragmentExtends?.[key];
      const hasNodes = KEYS_WITH_NODES.includes(key);

      fragment += Object.keys(tree[key]).length
        ? `${spacing}${key}${insertVariables(key, variables)} {
${extendsFragment ? `${spacing} ${extendsFragment} {\n` : ""}
${hasNodes ? `${spacing}nodes {` : ""}
${spacing}${buildFragmentFromTree(tree[key], variables, options, level + 1)}
${hasNodes ? `${spacing}}` : ""}
${extendsFragment ? `${spacing}}` : ""}
${spacing}}\n`
        : `${spacing}${key}\n`;
    }
    return fragment;
  }

  return buildFragmentFromTree(tree, variables, options);
}

function insertVariables(type: string, variables: QueryVariables) {
  if (variables[type]) {
    let variablesString = "(";
    for (const key in variables[type]) {
      const value = variables[type][key];
      variablesString += `${key}: ${
        typeof value === "number" ? value : `"${value}"`
      }, `;
    }
    return variablesString + ")";
  }
  return "";
}

const dataQueue: Array<{
  dataProperties: string[];
  variables: QueryVariables;
  queryOptions: QueryOptions;
}> = [];

let timeout: number | undefined;

export function queueData(
  dataProperties: string[],
  variables: QueryVariables,
  queryOptions: QueryOptions = {}
) {
  dataQueue.push({ dataProperties, variables, queryOptions });
  clearTimeout(timeout);
  timeout = setTimeout(processQueue);
}

function processQueue() {
  let dataProperties = new Set<string>();
  let variables: QueryVariables = {};
  let options = {};

  for (let element of dataQueue) {
    for (let prop of element.dataProperties) {
      dataProperties.add(prop);
    }

    for (let key in element.variables) {
      variables[key] = Object.assign(
        variables[key] || {},
        element.variables[key]
      );
    }

    for (let key in element.queryOptions) {
      options[key] = Object.assign(
        options[key] || {},
        element.queryOptions[key]
      );
    }
  }

  const query = buildQuery({
    properties: Array.from(dataProperties),
    variables,
    options,
  });

  graphqlRequest({ query: `{\n${query}\n}`, variables, options })
    .then((data) => {
      dataQueue.forEach((element) => {
        element.queryOptions.callback?.({ data });
      });
    })
    .catch((error) => {
      dataQueue.forEach((element) => {
        element.queryOptions.callback?.({ error });
      });
    });
}

// queueData(
//   ["cart.checkoutUrl", "cart.totalQuantity", "cart.cost.subtotalAmount.amount"],
//   { lines: { first: 100 } }
// );
// queueData(
//   [
//     "cart.lines.merchandise.image.url",
//     "cart.lines.merchandise.title",
//     "cart.lines.cost.totalAmount.amount",
//   ],
//   {
//     lines: { first: 10 },
//     cart: {
//       id: "gid://shopify/Cart/Z2NwLXVzLWNlbnRyYWwxOjAxSjFXRFlDUjRBRjI5RjZDSlE1UlpHOEZQ?key=4a8d9b3e86909435b691b4398a0221e5",
//     },
//   },
//   {
//     fragmentExtends: {
//       merchandise: "... on ProductVariant",
//     },
//   }
// );

// queueData(
//   [
//     "product.id",
//     "product.title",
//     "product.description",
//     "product.featuredImage.id",
//     "product.featuredImage.url",
//   ],
//   {
//     product: {
//       id: "gid://shopify/Product/7982905098262",
//     },
//   }
// );
