import { Outlet } from "react-router-dom";
import { MainNavigation } from "../components/layout/MainNavigation";

import { FC } from "react";

export const RootLayout: FC = () => {
  return (
    <>
      <MainNavigation />
      <Outlet />
    </>
  );
};
