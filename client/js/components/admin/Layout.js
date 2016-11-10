import React from "react";
import Navbar from "../dashboard/Navbar";

class AdminLayout extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className="container">
          { this.props.children }
        </div>
      </div>
    )
  }
}

export default AdminLayout;
