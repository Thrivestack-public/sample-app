import React, { Fragment, useState } from "react";
import { Box, Typography } from "@mui/material";
import Cookies from "js-cookie";
import StepStatusCard from "../StepStatusCard/StepStatusCard";
import { textConstants } from "../../../textConstants";

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
          {textConstants.HOME_PAGE_TITLE}
        </Typography>
        <Typography variant="p" fontSize={["12px", "14px", "16px"]}>
          {textConstants.HOME_PAGE_DESC_ONE}
        </Typography>
        <Box mt={4} maxWidth={"600px"} marginX={"auto"}>
          <Typography variant="p" fontSize={["12px", "14px", "16px"]}>
            {textConstants.HOME_PAGE_DESC_TWO}
          </Typography>
        </Box>
        <Box mt={4} maxWidth={"400px"} marginX={"auto"}>
          <StepStatusCard
            onDrawerOpen={onDrawerOpen}
            label={textConstants.HOME_PAGE_DATA_CARD_TITLE}
            status={""}
            isShowButtonVisible
            data={{ data: { ...userData, onboardingData: userOnboardingData } }}
            text={textConstants.HOME_PAGE_DATA_CARD_TEXT}
          />
        </Box>
      </Box>
    </Fragment>
  );
}

Dashboard.propTypes = {};

export default Dashboard;
