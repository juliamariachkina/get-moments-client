import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { relayStylePagination } from "@apollo/client/utilities";
import { auth } from "./firebase-config";
import { EventObjectTypeEdge } from "../types/event-object-type-edge";

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
          // featuredEvents: {
          //   keyArgs: false,
          //   merge(existing = {}, incoming) {
          //     const { edges = [], pageInfo } = existing;
          //     const { edges: incomingEdges = [], pageInfo: incomingPageInfo } =
          //       incoming;

          //     return {
          //       edges: [...edges, ...incomingEdges],
          //       pageInfo: incomingPageInfo,
          //     };
          //   },
          //   read(existing, options) {
          //     // console.log("Existing", existing);
          //     // console.log("args.after", args);
          //     // if (!existing) {
          //     //   return undefined;
          //     // }
          //     // if (!args?.after) {
          //     //   return existing;
          //     // }
          //     // const index = existing.edges.findIndex(
          //     //   (edge: EventObjectTypeEdge) => edge.cursor === args?.after
          //     // );
          //     // if (index) {
          //     //   return existing && existing.edges.slice(index, args?.first);
          //     // } else {
          //     //   return undefined;
          //     // }
          //   },
      //     },
        },
      },
    },
  }),
});

export const getNewLink = (token?: string): ApolloLink => {
  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: token ?? "",
      },
    };
  });
  return authLink.concat(httpLink);
};
