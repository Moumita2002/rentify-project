import React from "react";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <>
      <div className="header">
        <Header />
      </div>
      <div className="lay row g-0">
        <div className="child col-md-9">{children}</div>
      </div>
    </>
  );
};

export default Layout;
