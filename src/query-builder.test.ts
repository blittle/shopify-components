import { suite, test, expect } from "vitest";
import { buildQuery, buildQueryAst, renderNode } from "./query-builder";
import { children } from "happy-dom/lib/PropertySymbol.js";

/**
 * @vitest-environment happy-dom
 */
function createElementFromHtml(html: string): Element {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.children[0];
}

suite("buildQueryAst", () => {
  test("noops", () => {
    expect(buildQueryAst("product", {}, null)).toStrictEqual({
      field: "product",
      variables: {},
      children: [],
    });
    expect(buildQueryAst("product", {})).toStrictEqual({
      field: "product",
      variables: {},
      children: [],
    });
  });

  test("returns an empty ast for an empty node", () => {
    const element = createElementFromHtml(`<div></div>`);
    expect(buildQueryAst("product", {}, element)).toStrictEqual({
      field: "product",
      variables: {},
      children: [],
    });
  });

  test("builds a query for children", () => {
    const element = createElementFromHtml(`<div>{{product.title}}</div>`);
    expect(buildQueryAst("product", {}, element)).toMatchInlineSnapshot(`
    {
      "children": [
        {
          "children": [],
          "field": "title",
        },
      ],
      "field": "product",
      "variables": {},
    }
  `);

    const elementWithWhitespace = createElementFromHtml(
      `<div>{{ product.title }}</div>`
    );
    expect(buildQueryAst("product", {}, elementWithWhitespace))
      .toMatchInlineSnapshot(`
    {
      "children": [
        {
          "children": [],
          "field": "title",
        },
      ],
      "field": "product",
      "variables": {},
    }
  `);
  });

  test("builds a query for children", () => {
    const element = createElementFromHtml(`<div>{{collection.title}}</div>`);
    expect(buildQueryAst("collection", {}, element)).toMatchInlineSnapshot(`
    {
      "children": [
        {
          "children": [],
          "field": "title",
        },
      ],
      "field": "collection",
      "variables": {},
    }
  `);
  });

  test("builds a query for nested children", () => {
    const element = createElementFromHtml(
      `<div><div>{{product.title}}</div></div>`
    );
    expect(buildQueryAst("product", {}, element)).toMatchInlineSnapshot(`
    {
      "children": [
        {
          "children": [],
          "field": "title",
        },
      ],
      "field": "product",
      "variables": {},
    }
  `);
  });

  test("builds a query for children", () => {
    const element = createElementFromHtml(
      `<div alt={{product.title}}>Hello world</div>`
    );
    expect(buildQueryAst("product", {}, element)).toMatchInlineSnapshot(`
    {
      "children": [
        {
          "children": [],
          "field": "title",
        },
      ],
      "field": "product",
      "variables": {},
    }
  `);
  });

  test("merges a query from different dom elements", () => {
    const element = createElementFromHtml(
      `<div>
      <div alt={{product.title}}><div>
      <div>{{product.description}}</div>
    </div>`
    );
    expect(buildQueryAst("product", {}, element)).toMatchInlineSnapshot(`
    {
      "children": [
        {
          "children": [],
          "field": "title",
        },
        {
          "children": [],
          "field": "description",
        },
      ],
      "field": "product",
      "variables": {},
    }
  `);
  });

  test("merges a query text nodes mixed with elements", () => {
    const element = createElementFromHtml(
      `<div><div>{{product.description}}</div>{{product.title}}</div>`
    );
    expect(buildQueryAst("product", {}, element)).toMatchInlineSnapshot(`
    {
      "children": [
        {
          "children": [],
          "field": "description",
        },
        {
          "children": [],
          "field": "title",
        },
      ],
      "field": "product",
      "variables": {},
    }
  `);
  });

  test("parses a query with a collection", () => {
    const element = createElementFromHtml(
      `<div>
      <shopify-repeat type="collection.products" first="100">
        <template><div>{{product.title}}</div></template>
      </shopify-repeat>
     </div>`
    );
    expect(buildQueryAst("collection", {}, element)).toMatchInlineSnapshot(`
    {
      "children": [
        {
          "children": [
            {
              "children": [
                {
                  "children": [],
                  "field": "title",
                },
              ],
              "field": "product",
            },
          ],
          "collection": true,
          "field": "products",
          "variables": {
            "first": 100,
          },
        },
      ],
      "field": "collection",
      "variables": {},
    }
  `);
  });

  test("parses a query with a collection and fields outside the collection", () => {
    const element = createElementFromHtml(
      `<div>
       <span>{{collection.title}}</span>
       <shopify-repeat type="collection.products" first="100">
         <template><div>{{product.title}}</div></template>
       </shopify-collection-title>
    </div>`
    );
    expect(buildQueryAst("collection", {}, element)).toMatchInlineSnapshot(`
    {
      "children": [
        {
          "children": [],
          "field": "title",
        },
        {
          "children": [
            {
              "children": [
                {
                  "children": [],
                  "field": "title",
                },
              ],
              "field": "product",
            },
          ],
          "collection": true,
          "field": "products",
          "variables": {
            "first": 100,
          },
        },
      ],
      "field": "collection",
      "variables": {},
    }
  `);
  });

  test("parses a query with a collection in a collection", () => {
    const element = createElementFromHtml(
      `
    <div>
        <h1>{{collection.title}}</h1>
        <shopify-repeat type="collection.products" first="10">
          <template>
            <div>
              <b>{{product.title}}</b>
              <shopify-repeat type="product.variants" first="1">
                <template>
                  <div>
                    {{variant.selectedOptions.name}}
                  </div>
                </template>
              <shopify-repeat>
            </div>
          </template>
        </shopify-repeat>
    </div>
`
    );
    expect(buildQueryAst("collection", {}, element)).toMatchInlineSnapshot(`
    {
      "children": [
        {
          "children": [],
          "field": "title",
        },
        {
          "children": [
            {
              "children": [
                {
                  "children": [],
                  "field": "title",
                },
                {
                  "children": [
                    {
                      "children": [
                        {
                          "children": [
                            {
                              "children": [],
                              "field": "name",
                            },
                          ],
                          "field": "selectedOptions",
                        },
                      ],
                      "field": "variant",
                    },
                  ],
                  "collection": true,
                  "field": "variants",
                  "variables": {
                    "first": 1,
                  },
                },
              ],
              "field": "product",
            },
          ],
          "collection": true,
          "field": "products",
          "variables": {
            "first": 10,
          },
        },
      ],
      "field": "collection",
      "variables": {},
    }
  `);
  });
});

suite("buildQuery", () => {
  test("builds an empty query", () => {
    expect(
      buildQuery({
        field: "product",
        variables: {},
        children: [],
      })
    ).toMatchInlineSnapshot(`"{ product {  } }"`);
  });

  test("adds variables to query", () => {
    expect(
      buildQuery({
        field: "product",
        variables: { id: "1234" },
        children: [],
      })
    ).toMatchInlineSnapshot(`"{ product(id: "1234") {  } }"`);
  });

  test("adds nested fields to query", () => {
    expect(
      buildQuery({
        children: [
          {
            children: [],
            field: "title",
          },
        ],
        field: "product",
        variables: {},
      })
    ).toMatchInlineSnapshot(`"{ product { title } }"`);
  });

  test("add deep fields to a query", () => {
    expect(
      buildQuery({
        children: [
          {
            children: [
              {
                children: [],
                field: "c",
              },
            ],
            field: "b",
          },
        ],
        field: "a",
        variables: {},
      })
    ).toMatchInlineSnapshot(`"{ a { b { c } } }"`);
  });

  test("adds multiple sibling properties to a query", () => {
    expect(
      buildQuery({
        children: [
          {
            children: [],
            field: "title",
          },
          {
            children: [],
            field: "description",
          },
        ],
        field: "product",
        variables: {},
      })
    ).toMatchInlineSnapshot(`"{ product { title description } }"`);
  });

  test("adds nested collections to query", () => {
    expect(
      buildQuery({
        children: [
          {
            children: [
              {
                children: [
                  {
                    children: [
                      {
                        field: "variant",
                        children: [
                          {
                            field: "selectedOptions",
                            children: [
                              {
                                field: "name",
                                children: [],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                    field: "variants",
                    collection: true,
                    variables: { first: 10 },
                  },
                ],
                field: "product",
              },
            ],
            collection: true,
            field: "products",
            variables: {
              first: 100,
            },
          },
        ],
        field: "collection",
        variables: { id: "gid://shopify/Collection/429512622102" },
      })
    ).toMatchInlineSnapshot(
      `"{ collection(id: "gid://shopify/Collection/429512622102") { products(first: 100) { nodes { variants(first: 10) { nodes { selectedOptions { name } } } } } } }"`
    );
  });
});

suite("renderNode", () => {
  test("renders a text node", () => {
    const node = createElementFromHtml("<div>{{collection.title}}</div>");
    renderNode(node, { collection: { title: "Hello world" } });

    expect(node).toMatchInlineSnapshot(`
      <div>
        Hello world
      </div>
    `);
  });

  test("renders attributes", () => {
    const node = createElementFromHtml(
      `<div alt="{{collection.title}}">Something</div>`
    );
    renderNode(node, { collection: { title: "Hello world" } });

    expect(node).toMatchInlineSnapshot(`
      <div
        alt="Hello world"
      >
        Something
      </div>
    `);
  });

  test("renders deep elements", () => {
    const node = createElementFromHtml(
      `<div>
        <div alt="{{collection.title}}">Something</div>
        <div>
          <div>{{collection.description}}</div>
        </div>
       </div>`
    );
    renderNode(node, {
      collection: { title: "Hello world", description: "It's here" },
    });

    expect(node).toMatchInlineSnapshot(`
      <div>
        
              
        <div
          alt="Hello world"
        >
          Something
        </div>
        
              
        <div>
          
                
          <div>
            It's here
          </div>
          
              
        </div>
        
             
      </div>
    `);
  });

  test("renders collections", () => {
    const node = createElementFromHtml(
      `<div>
          <shopify-repeat type="collection.products" first="2">
            <template>
              <div>
                <h3>{{ product.title }}</h3>
              </div>
            </template>
          </shopify-repeat>
        </div>`
    );
    renderNode(node, {
      collection: {
        products: {
          nodes: [
            {
              title: "The Hydrogen Snowboard",
            },
            {
              title: "The Full Stack Snowboard",
            },
          ],
        },
      },
    });

    expect(node).toMatchInlineSnapshot(`
      <div>
        
                
        <shopify-repeat
          first="2"
          type="collection.products"
        >
          
                  
          <template />
          
                
          <div>
            
                      
            <h3>
              The Hydrogen Snowboard
            </h3>
            
                    
          </div>
          <div>
            
                      
            <h3>
              The Full Stack Snowboard
            </h3>
            
                    
          </div>
        </shopify-repeat>
        
              
      </div>
    `);
  });

  test("renders nested collections", () => {
    const node = createElementFromHtml(
      `
        <div>
          <h1>{{ collection.title }}</h1>
          <shopify-repeat type="collection.products" first="2">
            <template>
              <div>
                <h3>{{ product.title }}</h3>
                <shopify-repeat type="product.variants" first="10">
                  <template>
                    <div>
                      <h3>{{ variant.title }}</h3>
                    </div>
                  </template>
                </shopify-repeat>
              </div>
            </template>
          </shopify-repeat>
        </div>
        `
    );
    renderNode(node, {
      collection: {
        title: "Freestyle Collection",
        products: {
          nodes: [
            {
              title: "The Hydrogen Snowboard",
              variants: {
                nodes: [
                  {
                    title: "154cm / Nested / Carbon-fiber",
                  },
                  {
                    title: "154cm / Nested / Polycarbonate",
                  },
                ],
              },
            },
            {
              title: "The Full Stack Snowboard",
              variants: {
                nodes: [
                  {
                    title: "154cm / Syntax",
                  },
                  {
                    title: "158cm / Syntax",
                  },
                ],
              },
            },
          ],
        },
      },
    });

    expect(node).toMatchInlineSnapshot(`
      <div>
        
                
        <h1>
          Freestyle Collection
        </h1>
        
                
        <shopify-repeat
          first="2"
          type="collection.products"
        >
          
                  
          <template />
          
                
          <div>
            
                      
            <h3>
              The Hydrogen Snowboard
            </h3>
            
                      
            <shopify-repeat
              first="10"
              type="product.variants"
            >
              
                        
              <template />
              
                      
              <div>
                
                            
                <h3>
                  154cm / Nested / Carbon-fiber
                </h3>
                
                          
              </div>
              <div>
                
                            
                <h3>
                  154cm / Nested / Polycarbonate
                </h3>
                
                          
              </div>
            </shopify-repeat>
            
                    
          </div>
          <div>
            
                      
            <h3>
              The Full Stack Snowboard
            </h3>
            
                      
            <shopify-repeat
              first="10"
              type="product.variants"
            >
              
                        
              <template />
              
                      
              <div>
                
                            
                <h3>
                  154cm / Syntax
                </h3>
                
                          
              </div>
              <div>
                
                            
                <h3>
                  158cm / Syntax
                </h3>
                
                          
              </div>
            </shopify-repeat>
            
                    
          </div>
        </shopify-repeat>
        
              
      </div>
    `);
  });
});
