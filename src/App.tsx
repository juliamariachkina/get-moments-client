import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { EventsPage } from "./pages/Events";
import { EventDetailPage, loadEvent } from "./pages/EventDetail";
import { HomePage } from "./pages/Home";
import { RootLayout } from "./pages/RootLayout";
import { ErrorPage } from "./pages/Error";

import { ApolloProvider, useApolloClient } from "@apollo/client";
import { client, getNewLink } from "./utils/apollo-client";
import { LoginPage } from "./pages/Login";
import { FC, useContext } from "react";

import { signOut } from "firebase/auth";
import { auth } from "./utils/firebase-config";
import { UserContext, UserProvider } from "./store/user";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      {
        path: "logout",
        element: <HomePage />,
        loader: () => {
          signOut(auth);
          return null;
        },
      },
      { path: "events", element: <EventsPage /> },
      { path: "events/:slug", element: <EventDetailPage />, loader: ({params}) => loadEvent(params.slug ?? "") },
    ],
  },
]);

export const App: FC = () => {
  return (
    <ApolloProvider client={client}>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </ApolloProvider>
  );
};
