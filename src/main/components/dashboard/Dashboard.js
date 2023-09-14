import React, { Fragment } from "react";
import WorkflowStatusArea from "./WorkflowStatusArea";

function Dashboard(props) {
  return (
    <Fragment>
      <WorkflowStatusArea />
    </Fragment>
  );
}

Dashboard.propTypes = {};

export default Dashboard;
