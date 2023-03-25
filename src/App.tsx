import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { EventsPage } from "./pages/Events";
import { EventDetailPage } from "./pages/EventDetail";
import { HomePage } from "./pages/Home";
import { RootLayout } from "./pages/RootLayout";
import { ErrorPage } from "./pages/Error";

import {
  ApolloProvider,
} from "@apollo/client";
import { FC } from "react";

import React from 'react';
import logo from './logo.svg';
import './App.css';

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
