import React from "react";
import { darkBlack, shadeBlack } from "../styles/globalStyle";

const Layout = ({ children }) => {
  return <div className={`w-screen h-screen ${darkBlack}  `}>{children}</div>;
};

export default Layout;
