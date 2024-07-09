const storefront = "https://hydrogen-preview.myshopify.com";
const apiVersion = "2024-04";
const accessToken = "33ad0f277e864013b8e3c21d19432501";

type UserErrors = {
  field?: string;
  message?: string;
};

type GraphqlResponse<T> = {
  data: T;
  userErrors?: UserErrors;
};

const requestCache = new Map<string, unknown>();

export async function graphqlRequest<ReturnType>({
  query,
  variables = {},
  options = {},
}: {
  query: string;
  variables?: Record<string, unknown>;
  options: { ignoreCache?: boolean };
}): Promise<ReturnType | void> {
  if (!options.ignoreCache && requestCache.has(query)) {
    return requestCache.get(query) as ReturnType;
  }

  try {
    const payload = { query, variables };

    // launch a request to the storefront GQL api.
    const request = await fetch(
      `${storefront}/api/${apiVersion}/graphql.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token": accessToken,
        },
        body: JSON.stringify(payload),
      }
    );

    if (!request.ok) {
      throw new Error(`Error fetching cart: ${await request.text()}`);
    }

    const response =
      (await request.json()) as unknown as GraphqlResponse<ReturnType>;

    const data = response.data;
    requestCache.set(query, data);
    return data;
  } catch (err) {
    console.error(err);
  }
}
