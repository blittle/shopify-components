import type {
  Cart,
  CartLineInput,
  CartLineUpdateInput,
} from "@shopify/hydrogen/storefront-api-types";

const cartFragment = /* GraphQL */ `
  fragment CartFragment on Cart {
    id
    checkoutUrl
    totalQuantity
    buyerIdentity {
      countryCode
      customer {
        id
        email
        firstName
        lastName
        displayName
      }
      email
      phone
    }
    lines(first: 100) {
      edges {
        node {
          id
          quantity
          attributes {
            key
            value
          }
          cost {
            totalAmount {
              amount
              currencyCode
            }
            compareAtAmountPerQuantity {
              amount
              currencyCode
            }
          }
          merchandise {
            ... on ProductVariant {
              id
              availableForSale
              compareAtPrice {
                ...MoneyFragment
              }
              price {
                ...MoneyFragment
              }
              requiresShipping
              title
              image {
                ...ImageFragment
              }
              product {
                handle
                title
                id
              }
              selectedOptions {
                name
                value
              }
            }
          }
        }
      }
    }
    cost {
      subtotalAmount {
        ...MoneyFragment
      }
      totalAmount {
        ...MoneyFragment
      }
      totalDutyAmount {
        ...MoneyFragment
      }
      totalTaxAmount {
        ...MoneyFragment
      }
    }
    note
    attributes {
      key
      value
    }
    discountCodes {
      code
      applicable
    }
  }

  fragment MoneyFragment on MoneyV2 {
    currencyCode
    amount
  }
  fragment ImageFragment on Image {
    id
    url
    altText
    width
    height
  }
`;

// USer Error Type for GQL Response.
type UserErrors = {
  field?: string;
  message?: string;
};

// General type to wrap GQL responses in and extend with generalized user Errors.
type GraphqlResponse<T> = {
  data: T;
  userErrors?: UserErrors;
};

/**
 * Main Cart class - exposes public methods for adding, removing and updating line items.
 * Initializes on construction new ShopifyCart();
 */
export class ShopifyCart {
  private storefront: string;
  private accessToken: string;
  private apiVersion: string;
  private storage: "session" | "local";
  private listeners: Array<Function> = [];
  public initialized: Promise<string | void>;
  public cartId: string | undefined;

  constructor({
    storefront,
    accessToken,
    apiVersion,
    storage = "session",
  }: {
    storefront: string;
    accessToken: string;
    apiVersion: string;
    storage?: "session" | "local";
  }) {
    this.storefront = storefront;
    this.accessToken = accessToken;
    this.apiVersion = apiVersion;
    this.cartId = undefined;
    this.storage = storage;

    this.initialized = this.initialize();
  }

  // Wrapper method for graphQL storefront API requests, takes a GQL Query string & an object of variables.
  private async graphqlRequest<ReturnType>({
    query,
    variables = {},
  }: {
    query: string;
    variables?: Record<string, unknown>;
  }): Promise<ReturnType | void> {
    try {
      const payload = { query, variables };

      // launch a request to the storefront GQL api.
      const request = await fetch(
        `${this.storefront}/api/${this.apiVersion}/graphql.json`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Shopify-Storefront-Access-Token": this.accessToken,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!request.ok) {
        throw new Error(`Error fetching cart: ${await request.text()}`);
      }

      const response =
        (await request.json()) as unknown as GraphqlResponse<ReturnType>;

      return response.data;
    } catch (err) {
      console.error(err);
    }
  }

  // TODO: Clean up a little bit (probably better error handling lol)?
  // Public async method to create a cart & return the cart id for storage in local or session storage.
  public async makeCart(): Promise<string | void> {
    try {
      const query = `
        mutation cartCreate {
          cartCreate {
            cart {
              id
            }
            userErrors {
              field
              message
            }
          }
        }
      `;

      const request = await this.graphqlRequest<{
        cartCreate: {
          cart: { id: string };
        };
      }>({
        query: query,
      });

      // we would have errored in the GQL Request method, so we can return void..
      if (!request) {
        return;
      }

      return request.cartCreate.cart.id;
    } catch (err) {
      console.error(`Error making Cart @: ${err}`);
    }
  }

  public async getCart(id?: string): Promise<Cart | void> {
    await this.initialized;

    try {
      const request = await this.graphqlRequest<{ cart: Cart }>({
        query: `{
          cart(id: "${id || this.cartId}") {
            ...CartFragment
          }
        }
       ${cartFragment}`,
      });

      if (!request) {
        return;
      }

      return request.cart;
    } catch (err) {
      console.error(err);
    }
  }

  public async addCartLines(lines: CartLineInput[]): Promise<Cart | void> {
    try {
      const request = await this.graphqlRequest<{
        cartLinesAdd: {
          cart: Cart;
        };
      }>({
        query: `
          mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
            cartLinesAdd(cartId: $cartId, lines: $lines) {
              cart {
                ...CartFragment
              }
              userErrors {
                field
                message
              }
            }
          }
          ${cartFragment}
        `,
        variables: {
          cartId: this.cartId,
          lines,
        },
      });
    } catch (err) {
      console.error(err);
    }

    this.notifyListeners();
  }

  public async removeCartLines(lineIds: string[]): Promise<Cart | void> {
    try {
      const request = await this.graphqlRequest<{
        cartLinesRemove: {
          cart: Cart;
        };
      }>({
        query: `
          mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
            cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
              cart {
                ...CartFragment
              }
              userErrors {
                field
                message
              }
            }
          }
          ${cartFragment}
        `,
        variables: {
          cartId: this.cartId,
          lineIds,
        },
      });
    } catch (err) {
      console.error(err);
    }

    this.notifyListeners();
  }

  public async updateCartLines(
    lines: CartLineUpdateInput[]
  ): Promise<Cart | void> {
    try {
      const request = await this.graphqlRequest<{
        cartLinesUpdate: {
          cart: Cart;
        };
      }>({
        query: `
          mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
            cartLinesUpdate(cartId: $cartId, lines: $lines) {
              cart {
                ...CartFragment
              }
              userErrors {
                field
                message
              }
            }
          }
        ${cartFragment}
        `,
        variables: {
          cartId: this.cartId,
          lines,
        },
      });
    } catch (err) {
      console.error(err);
    }

    this.notifyListeners();
  }

  public addCartUpdateListener(callback: Function): void {
    this.listeners.push(callback);
  }

  public removeCartUpdateListener(callback: Function): void {
    this.listeners = this.listeners.filter((listener) => listener !== callback);
  }

  private async notifyListeners() {
    this.listeners.forEach((listener) => listener());
  }

  private async initialize(): Promise<string | void> {
    // Probably should never reach here, because it won't ever be launched in the context of a server but....'
    if (!window) {
      throw new Error("Window not found");
    }

    const storage =
      this.storage === "session" ? window.sessionStorage : window.localStorage;
    const cartExists = storage.getItem("shopify-cart");
    let cart: string;

    if (!cartExists || cartExists === "") {
      const createdCart = await this.makeCart();

      if (!createdCart) {
        return;
      }

      cart = createdCart;

      storage.setItem("shopify-cart", cart);
      this.cartId = cart;
    } else {
      cart = cartExists;
      this.cartId = cart;
    }

    return cart;
  }
}

export const cartClient = new ShopifyCart({
  storefront: "https://hydrogen-preview.myshopify.com",
  accessToken: "33ad0f277e864013b8e3c21d19432501",
  apiVersion: "2024-04",
});
