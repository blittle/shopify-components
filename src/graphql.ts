const storefront = "https://hydrogen-preview.myshopify.com";
const accessToken = "33ad0f277e864013b8e3c21d19432501";
const apiVersion = "2024-04";

// User Error Type for GQL Response.
type UserErrors = {
  field?: string;
  message?: string;
};

// General type to wrap GQL responses in and extend with generalized user Errors.
type GraphqlResponse<T> = {
  data: T;
  errors?: UserErrors;
};

export async function gqlRequest<ReturnType>(
  query: string,
  variables: Record<string, unknown>
) {
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

    return response;
  } catch (err) {
    console.error(err);
  }
}
