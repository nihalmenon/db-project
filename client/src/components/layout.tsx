import React from "react";
import { Outlet } from "react-router-dom";
import { useTheme, useColorMode } from "@chakra-ui/react";
import toast, { Toaster } from "react-hot-toast";

export const Layout = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const theme = useTheme();
  return (
    <div
      className="layout"
      style={{ backgroundColor: theme.colors.background[colorMode], minHeight: "100vh" }}
    >
      <Outlet />
      <Toaster />
    </div>
  );
};

export default Layout;
