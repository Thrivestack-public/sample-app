import React, { Fragment, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import WorkflowDataDrawer from "./WorkflowDataDrawer";
import WorkflowStatusCard from "./WorkflowStatusCard";
import Cookies from "js-cookie";
import StepStatusCard from "../StepStatusCard/StepStatusCard";

function Dashboard(props) {
  const [userData, setUserData] = useState({});

  const [userOnboardingData, setUserOnboardingData] = useState({});

  const onDrawerOpen = () => {
    getUserData();
  };

  const getUserData = async () => {
    let data = localStorage.getItem("onboardingData");
    data = JSON.parse(data);
    if (data) {
      setUserOnboardingData(data);
    }

    let cookieData = Cookies.get("User_Data");
    cookieData = cookieData ? JSON.parse(cookieData) : {};
    console.log("cookieData", cookieData);
    setUserData(cookieData);
  };

  return (
    <Fragment>
      <Box mb={4} textAlign={"center"}>
        <img src="/favicon-192x192.png" alt="icon" height={100} width={100} />
        <Typography fontSize={["20px", "28px", "36px"]} fontWeight={600} mb={2}>
          Welcome to SaaSBox Application Home
        </Typography>
        <Typography variant="p" fontSize={["12px", "14px", "16px"]}>
          This is the application home page of the SaaSBox - designed to
          illustrate the seamless integration of <br /> ThriveStack's workflows
          with your own application.
        </Typography>
        <Box mt={4} maxWidth={"600px"} marginX={"auto"}>
          <Typography variant="p" fontSize={["12px", "14px", "16px"]}>
            Once the end user arrives on this page, all the necessary steps will
            have been executed, and we will have gathered and stored the data
            throughout the entire process, allowing you to access and view it.
          </Typography>
        </Box>
        <Box mt={4} maxWidth={"400px"} marginX={"auto"}>
          <StepStatusCard
            onDrawerOpen={onDrawerOpen}
            label={"User Data"}
            status={""}
            isShowButtonVisible
            data={{ data: userData }}
            text={
              "All user data collected during signup will be displayed here."
            }
          />
        </Box>
      </Box>
    </Fragment>
  );
}

Dashboard.propTypes = {};

export default Dashboard;
