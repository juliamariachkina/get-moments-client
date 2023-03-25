import { ApolloClient, InMemoryCache, createHttpLink, ApolloLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { relayStylePagination } from "@apollo/client/utilities";
import { auth } from "./firebase-config";

const httpLink = createHttpLink({
  uri: "https://api.getmoments.com/v1.0/",
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          featuredEvents: relayStylePagination(),
        },
      },
    },
  }),
});

export const getNewLink = (token: string): ApolloLink => {
  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: token,
      },
    };
  });
  return authLink.concat(httpLink);
}
