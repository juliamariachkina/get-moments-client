import { gql, useQuery } from "@apollo/client";
import { relayStylePagination } from "@apollo/client/utilities";

const FEATURED_EVENTS = gql`
  query featuredEvents($cursor: String) {
    featuredEvents(first: 1, after: $cursor) {
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
      edges {
        node {
          name
          slug
          image
          startTime
          city
        }
        cursor
      }
    }
  }
`;

export const useFeaturedEventsQuery = () => {
  return useQuery(FEATURED_EVENTS);
};
