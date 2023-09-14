import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
// import CancelIcon from "@mui/icons-material/Cancel";
import useMediaQuery from "@mui/material/useMediaQuery";
import { withTheme } from "@mui/styles";
import useWidth from "../../../shared/functions/useWidth";
import WorkflowStatusCard from "./WorkflowStatusCard";
import calculateSpacing from "./calculateSpacing";
import { onboardingApiUrl, thriveDataApiUrl } from "../../../constants";
import StepStatusCard from "../StepStatusCard/StepStatusCard";

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
      // `${thriveDataApiUrl}?userId=${userMetaData.userId}&workflowId=${userMetaData.workflowId}`,
      `https://4cx31huce2.execute-api.ap-south-1.amazonaws.com/?userId=hackhathon&workflowId=648b79b3-2d7b-4baf-81b6-c52215f52349`
      // {
      //   headers: {
      //     authorization: localStorage.getItem("system_token"),
      //   },
      // }
    )
      // .then((res) => res.json())
      .catch((error) => {
        console.log("something went wrong");
      });
    console.log("data", res);
    // const res = {};
    const isOnboardingDataReceived = res && res.data && res.data.onboardingData;
    // if (!isOnboardingDataReceived) {
    //   const onboardingRes = await fetch(
    //     `${onboardingApiUrl}/getdata?userId=${userMetaData?.userId}&workflowId=${userMetaData?.workflowId}`,
    //     {
    //       headers: {
    //         authorization: localStorage.getItem("system_token"),
    //       },
    //     }
    //   )
    //     .then((res) => res.json())
    //     .catch((error) => {
    //       console.log("something went wrong");
    //     });
    //   setUserOnboardingData(onboardingRes.data);
    // }
    console.log("response res", res);
    // setUserData(res?.data);
  };
  useEffect(() => {
    // if (userMetaData.userId && userMetaData.workflowId) {
    console.log("getUserData");
    getUserData();
    // }
  }, []);

  const data = [
    {
      step: "Authentication",
      status: "done",
      text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et.",
      data: {
        name: "rushikesh",
        data: {
          data2: "hello",
          data4: {
            city: "pune",
          },
        },
      },
    },
    {
      step: "User Surge Check",
      status: "done",
      text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et.",
      data: {},
    },
    {
      step: "Onboarding",
      status: "done",
      text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et.",
      data: userData.onboardingData || userOnboardingData || {},
    },
    {
      step: "User Enrichment",
      status: "done",
      text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et.",
      data: userData.userEnrichmentData || {},
    },
    {
      step: "Associate App Role",
      status: "done",
      text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et.",
      data: userData.appRoleData || {},
    },
    {
      step: "Associate App Pricing",
      status: "done",
      text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et.",
      data: userData.appPricingData || {},
    },
    {
      step: "Tenant Surge Check",
      status: "done",
      text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et.",
      data: {},
    },
    {
      step: "Tenant Creation",
      status: "done",
      text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et.",
      data: {},
    },
    {
      step: "Notify End User",
      status: "done",
      text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et.",
      data: {},
    },
    {
      step: "Redirect End User",
      status: "done",
      text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et.",
      data: {},
    },
  ];

  return (
    <div>
      <div className="container-fluid">
        <Box mb={4} textAlign={"center"}>
          <img src="/favicon-192x192.png" alt="icon" height={100} width={100} />
          <Typography
            fontSize={["20px", "28px", "36px"]}
            fontWeight={600}
            mb={2}
          >
            Welcome to SaaSBox Application
          </Typography>
          <Typography variant="p" fontSize={["12px", "14px", "16px"]}>
            This is the application dashboard page of the SaaSBox - designed to
            illustrate the seamless integration of <br /> ThriveStack's
            workflows with your own application.
          </Typography>
          <Box mt={4} maxWidth={"600px"} marginX={"auto"}>
            <Typography variant="p" fontSize={["12px", "14px", "16px"]}>
              Once the end user arrives on this page, all the necessary steps
              will have been executed, and we will have gathered and stored the
              data throughout the entire process, allowing you to access and
              view it.
            </Typography>
          </Box>

          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            flexDirection={"column"}
            mt={2}
          >
            <Grid container spacing={calculateSpacing(width, theme)}>
              {data.map((element) => (
                <Grid
                  item
                  xs={12}
                  md={6}
                  xl={4}
                  data-aos="zoom-in-up"
                  data-aos-delay={
                    (isWidthUpMd ? element.mdDelay : element.smDelay) || "0"
                  }
                  key={element.headline}
                  alignContent={"center"}
                  justifyItems={"center"}
                >
                  <StepStatusCard
                    label={element.step}
                    status={element.status}
                    isShowButtonVisible
                    data={element.data}
                    text={element.text}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
        <Box className="container-fluid" display={"none"}>
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
        </Box>
      </div>
    </div>
  );
}

WorkflowStatusArea.propTypes = {};

export default withTheme(WorkflowStatusArea);
