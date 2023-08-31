import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import WorkflowStatusArea from "./WorkflowStatusArea";

function Dashboard(props) {
  const {
    selectDashboard
  } = props;

  useEffect(selectDashboard, [selectDashboard]);

  return (
    <Fragment>
      <WorkflowStatusArea />
    </Fragment>
  );
}

Dashboard.propTypes = {
  selectDashboard: PropTypes.func.isRequired,
};

export default Dashboard;
