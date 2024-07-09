import React from "react";
import { Outlet } from "react-router-dom";
import { useTheme } from "@chakra-ui/react";
import toast, { Toaster } from "react-hot-toast";

export const Layout = () => {
  const theme = useTheme();
  return (
    <div
      className="layout"
      style={{ backgroundColor: theme.colors.background }}
    >
      <Outlet />
      <Toaster />
    </div>
  );
};

export default Layout;
