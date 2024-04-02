import client from "../api/grapgql_api";
import { GET_AUTHORIZATION_TOKEN } from "../grapgql/grapgql_query/auth_query";

const get_authorization_token = async () => {
  try {
    const { data: { generateAuthorizationToken: { token } } } = await client.query({
      query: GET_AUTHORIZATION_TOKEN,
    });
    if (token) {
      localStorage.setItem("authorization_token", token);
    }
  } catch (error) {
    console.error("Error fetching authorization token:", error);
    // Optionally, you can throw the error again to propagate it to the caller
    // window.location.replace('/auth/error');
  }
};

export { get_authorization_token };
