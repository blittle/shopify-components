export type QueryAst = {
  field: string;
  variables?: Record<string, string | number | null>;
  collection?: boolean;
  children: QueryAst[];
};

/**
 * Build a GraphQL AST from an HTML template
 */
export function buildQueryAst(
  field: string,
  variables: {},
  node?: Element | null
): QueryAst {
  const ast = { children: [], field, variables };
  if (!node) return ast;

  parseNode(ast, node);

  return ast;
}

/**
 * Parse a node for GraphQL field references: {{ field }}
 */
function parseNode(ast: QueryAst, node: Node) {
  if (node instanceof Element && node.localName === "shopify-repeat") {
    const [parent, type] = node.getAttribute("type")?.split(".") || [];

    // @todo: add support for other variables
    const first = node.getAttribute("first");

    // If the parent field is not found, create it.
    // This happens on nested collections.
    if (ast.field !== parent) {
      const parentAst = ast.children.find((child) => child.field === parent);

      if (!parentAst)
        ast.children.push({
          field: parent,
          children: [],
        });

      ast = parentAst || ast.children[0];
    }

    const child = ast?.children?.find((child) => child.field === type);

    if (!child) {
      ast.children.push({
        field: type,
        collection: true,
        variables: { first: first ? parseInt(first, 10) : undefined },
        children: [],
      });
    }

    const template = [].find.call(
      node.childNodes || [],
      (child) => child.localName === "template"
    );

    if (!template)
      throw new Error("must have a template within shopify-repeat");

    // Reassigning these variables allows us to recursively parse the template
    // because references in the template are unaware of the parent fields.
    // If all references were absolutely paths, this wouldn't be necessary.
    ast = ast.children.find((child) => child.field === type)!;
    node = template.content.firstElementChild;
  }

  if (node instanceof Text) {
    buildAstFromFields(ast, node.textContent);
  } else if (node instanceof Element) {
    if (node.attributes.length) {
      for (const attr of node.attributes) {
        buildAstFromFields(ast, attr.value);
      }
    }

    for (const child of node.childNodes) {
      parseNode(ast, child);
    }
  }
}

/**
 *  Given a string of text, find all field references and
 *  mutate the AST to include them.
 */
function buildAstFromFields(ast: any, text: string | null) {
  // multi-line fields are not supported
  const matches = text?.matchAll(/{{(.*?)}}/g);

  if (matches) {
    for (const match of matches) {
      const [_, field] = match;
      const parts = field.trim().split(".");
      let current = ast;
      for (let i = 0; i < parts.length; i++) {
        const part = parts[i];

        const child = current.children.find(
          (child: any) => child.field === part
        );

        if (current.field === part) {
          continue;
        }

        if (!child) {
          current.children.push({ field: part, children: [] });
          current = current.children[current.children.length - 1];
        } else {
          current = child;
        }
      }
    }
  }
}

/**
 * Given an AST, build a GraphQL query string
 */
export function buildQuery(ast: QueryAst): string {
  const query = buildNode(ast);
  return `{ ${query} }`;
}

function buildNode(ast: QueryAst): string {
  if (ast.children.length === 0 && !ast.variables) return ast.field;

  const isCollection = ast.collection;

  // @todo: All fields within the collection have a superfluous top field,
  // which is skipped at the moment. This should be fixed. For example:
  // <shopify-repeat type="collection.products"><template><div>{{ thisDoesNotMatter.title }}</div></template></shopify-repeat>
  const children = isCollection ? ast.children[0].children : ast.children;

  // At the moment it assumes all collections have a `nodes` field. This
  // should probably be configurable. Because for example, product options
  // iterate, but don't have edges/nodes.
  return `${ast.field}${getQueryVariables(ast.variables)} {${
    isCollection ? " nodes {" : ""
  } ${children.map(buildNode).join(" ")} ${isCollection ? "} " : ""}}`;
}

function getQueryVariables(variables: QueryAst["variables"]) {
  if (!variables || !Object.keys(variables).length) return "";
  return (
    "(" +
    Object.entries(variables)
      .map(
        ([key, value]) =>
          `${key}: ${typeof value === "string" ? `"${value}"` : value}`
      )
      .join(", ") +
    ")"
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

/**
 * Render an HTML node with data, replacing all field references with data.
 * Example -> <div>{{ collection.title }}</div> -> <div>My Collection</div>
 */
export function renderNode(node: Node, data: unknown, inCollection = false) {
  if (node instanceof Element && node.localName === "shopify-repeat") {
    const [parent, type] = node.getAttribute("type")?.split(".") || [];

    const template = [].find.call(
      node.childNodes || [],
      (child) => child.localName === "template"
    );

    if (!template)
      throw new Error("must have a template within shopify-repeat");

    // @todo fix this
    // Fields within collections have a superfulous top field, which should be skipped.
    // This is awkward and should be fixed. For example:
    // <shopify-repeat type="collection.products"><template><div>{{ thisDoesNotMatter.title }}</div></template></shopify-repeat>
    data = data?.[parent]?.[type]?.nodes || data?.[type]?.nodes;

    if (!data || !data?.length) {
      throw new Error(
        "<shopify-repeat> must reference a collection with nodes"
      );
    }

    const templateContent = template.content.firstElementChild;

    // loop through each item in the collection and generate a new node
    // @todo new nodes are generated each time. This needs to be updated either
    // remove previous nodes, or merge them.
    for (const item of data) {
      const element = templateContent.cloneNode(true);
      renderNode(element, item, (inCollection = true));
      node.appendChild(element);
    }
    return;
  }

  if (node instanceof Text) {
    node.textContent = renderField(node.textContent || "", data, inCollection);
  } else if (node instanceof Element) {
    if (node.attributes.length) {
      for (const attr of node.attributes) {
        node.setAttribute(
          attr.name,
          renderField(attr.value, data, inCollection)
        );
      }
    }

    for (const child of node.childNodes) {
      renderNode(child, data, inCollection);
    }
  }
}

/*
 * Replace all field references with data
 */
function renderField(field: string, data: unknown, inCollection = false) {
  return field.replace(/{{(.*?)}}/g, (_, field: string) => {
    const parts = field.trim().split(".");
    // @todo: All fields within the collection have a superfluous top field,
    // Similar to the above, this is awkward and should be fixed.
    if (inCollection) parts.shift();

    let current = data;
    for (const part of parts) {
      if (!current) throw new Error("Field not found: " + field);
      current = current[part];
    }
    return current;
  });
}
