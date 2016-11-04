import React from "react";
import Navbar from "./Navbar";

const DashboardLayout = ({ children }) => (
  <div>
    <Navbar />
    <div className="container">
      {children}
    </div>
  </div>
)

export default DashboardLayout;
