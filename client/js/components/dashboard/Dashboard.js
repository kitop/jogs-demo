import React from "react";
import { connect } from "react-redux";
import DashboardLayout from "./DashboardLayout";
import JogsContainer from "../jogs/JogsContainer";

const Dashboard = (props) => (
  <DashboardLayout>
    <JogsContainer
      targetUserId={ props.targetUserId }
    />
  </DashboardLayout>
)

const mapStateToProps = (state) => ({
  targetUserId: state.user.id
});

export default connect(
  mapStateToProps,
  null
)(Dashboard);
