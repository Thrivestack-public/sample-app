import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
// import CancelIcon from "@mui/icons-material/Cancel";
import useMediaQuery from "@mui/material/useMediaQuery";
import { withTheme } from "@mui/styles";
import useWidth from "../../../shared/functions/useWidth";
import WorkflowStatusCard from "./WorkflowStatusCard";
import calculateSpacing from "./calculateSpacing";
import { onboardingApiUrl, thriveDataApiUrl } from "../../../constants";

function WorkflowStatusArea(props) {
  const { theme } = props;
  const width = useWidth();
  const isWidthUpMd = useMediaQuery(theme.breakpoints.up("md"));
  const [userData, setUserData] = useState({});
  const [userOnboardingData, setUserOnboardingData] = useState({});
  const userMetaDataStr = localStorage.getItem("userMetaData");
  const userMetaData = userMetaDataStr ? JSON.parse(userMetaDataStr) : {};

  const getUserData = async () => {
    const res = await fetch(
      `${thriveDataApiUrl}?userId=${userMetaData.userId}&workflowId=${userMetaData.workflowId}`,
      {
        headers: {
          authorization: localStorage.getItem("system_token"),
        },
      }
    )
      .then((res) => res.json())
      .catch((error) => {
        console.log("something went wrong");
      });
    const isOnboardingDataReceived = res.data && res.data.onboardingData;
    if (!isOnboardingDataReceived) {
      const onboardingRes = await fetch(
        `${onboardingApiUrl}/getdata?userId=${userMetaData.userId}&workflowId=${userMetaData.workflowId}`,
        {
          headers: {
            authorization: localStorage.getItem("system_token"),
          },
        }
      )
        .then((res) => res.json())
        .catch((error) => {
          console.log("something went wrong");
        });
      setUserOnboardingData(onboardingRes.data);
    }
    console.log("response res", res);
    setUserData(res.data);
  };
  useEffect(() => {
    if (userMetaData.userId && userMetaData.workflowId) {
      console.log("getUserData");
      getUserData();
    }
  }, []);

  const data = [
    {
      step: "Onboarding",
      status: userData.onboardingData ? "done" : "not done",
      text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et.",
      data: userData.onboardingData || userOnboardingData || {},
    },
    {
      step: "User Enrichment",
      status: userData.userEnrichmentData ? "done" : "not done",
      text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et.",
      data: userData.userEnrichmentData || {},
    },
    {
      step: "Associate App Role",
      status: userData.appRoleData ? "done" : "not done",
      text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et.",
      data: userData.appRoleData || {},
    },
    {
      step: "Associate App Pricing",
      status: userData.appPricingData ? "done" : "not done",
      text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et.",
      data: userData.appPricingData || {},
    },
  ];

  return (
    <div>
      <div className="container-fluid">
        <Typography variant="h4" align="center" className="lg-mg-bottom">
          User Details
        </Typography>
        <div className="container-fluid">
          <Grid container spacing={calculateSpacing(width, theme)}>
            {data.map((element) => (
              <Grid
                item
                xs={6}
                md={4}
                data-aos="zoom-in-up"
                data-aos-delay={
                  (isWidthUpMd ? element.mdDelay : element.smDelay) || "0"
                }
                key={element.headline}
              >
                <WorkflowStatusCard
                  Icon={element.icon}
                  color={element.color}
                  headline={element.step}
                  text={element.text}
                  status={element.status}
                  data={element.data}
                />
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </div>
  );
}

WorkflowStatusArea.propTypes = {};

export default withTheme(WorkflowStatusArea);
