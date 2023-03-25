import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { EventsPage } from "./pages/Events";
import { EventDetailPage } from "./pages/EventDetail";
import { HomePage } from "./pages/Home";
import { RootLayout } from "./pages/RootLayout";
import { ErrorPage } from "./pages/Error";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import Login from "./pages/Login";
import { relayStylePagination } from "@apollo/client/utilities";
import { FC } from "react";

const httpLink = createHttpLink({
  uri: "https://api.getmoments.com/v1.0/",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  console.log(token);
  return {
    headers: {
      ...headers,
      authorization: token ?? "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
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

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <Login /> },
      { path: "events", element: <EventsPage /> },
      { path: "events/:slug", element: <EventDetailPage /> },
    ],
  },
]);

export const App: FC = () => {
  return (
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  );
}
