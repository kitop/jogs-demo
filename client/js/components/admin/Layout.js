import React from "react";
import AdminNavbar from "./Navbar";

class AdminLayout extends React.Component {
  render() {
    return (
      <div>
        <AdminNavbar />
        <div className="container">
          { this.props.children }
        </div>
      </div>
    )
  }
}

export default AdminLayout;
