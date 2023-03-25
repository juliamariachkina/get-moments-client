import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { EventsPage } from "./pages/Events";
import { EventDetailPage } from "./pages/EventDetail";
import { HomePage } from "./pages/Home";
import { RootLayout } from "./pages/RootLayout";
import { ErrorPage } from "./pages/Error";

import { ApolloProvider } from "@apollo/client";
import { getApolloClient} from "./utils/apollo-client";
import { LoginPage } from "./pages/Login";
import { FC, useContext } from "react";

import { signOut } from "firebase/auth";
import { auth } from "./utils/firebase-config";
import { UserContext } from "./store/user";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "logout", element: <HomePage />, loader: () => {
        signOut(auth);
        return null;
      } },
      { path: "events", element: <EventsPage /> },
      { path: "events/:slug", element: <EventDetailPage /> },
    ],
  },
]);

export const App: FC = () => {
  const userCtx = useContext(UserContext);
  const apolloClient = getApolloClient(userCtx.token);
  return (
    <ApolloProvider client={apolloClient}>
      <RouterProvider router={router} />
    </ApolloProvider>
  );
};
